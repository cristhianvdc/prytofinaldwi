package com.athletix.sports.service;

import com.athletix.sports.dto.ProductRequest;
import com.athletix.sports.dto.ProductResponse;
import com.athletix.sports.dto.ProductVariantRequest;
import com.athletix.sports.exception.ApiException;
import com.athletix.sports.model.Product;
import com.athletix.sports.model.ProductVariant;
import com.athletix.sports.repository.ProductRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.text.Normalizer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final MapperService mapper;
    private final ObjectMapper objectMapper;

    @Value("${app.upload-dir}")
    private String uploadDir;

    public ProductService(ProductRepository productRepository, MapperService mapper, ObjectMapper objectMapper) {
        this.productRepository = productRepository;
        this.mapper = mapper;
        this.objectMapper = objectMapper;
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> publicProducts() {
        return productRepository.findByActiveTrueOrderByCreatedAtDesc().stream().map(mapper::toProduct).toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> adminProducts() {
        return productRepository.findAll().stream().map(mapper::toProduct).toList();
    }

    public Product findEntity(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
    }

    @Transactional(readOnly = true)
    public ProductResponse get(Long id) {
        Product product = findEntity(id);
        if (!product.isActive()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Producto no disponible");
        }
        return mapper.toProduct(product);
    }

    @Transactional(readOnly = true)
    public ProductResponse getBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseGet(() -> productRepository.findAll().stream()
                        .filter(item -> slugify(item.getName()).equals(slug))
                        .findFirst()
                        .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Producto no encontrado")));
        if (!product.isActive()) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Producto no disponible");
        }
        return mapper.toProduct(product);
    }

    @Transactional
    public ProductResponse create(ProductRequest request, MultipartFile image) {
        Product product = new Product();
        apply(product, request);
        product.setImageUrl(storeImage(image));
        return mapper.toProduct(productRepository.save(product));
    }

    @Transactional
    public ProductResponse update(Long id, ProductRequest request, MultipartFile image) {
        Product product = findEntity(id);
        apply(product, request);
        if (image != null && !image.isEmpty()) {
            product.setImageUrl(storeImage(image));
        }
        return mapper.toProduct(productRepository.save(product));
    }

    public void delete(Long id) {
        Product product = findEntity(id);
        product.setActive(false);
        productRepository.save(product);
    }

    private void apply(Product product, ProductRequest request) {
        product.setName(request.name());
        product.setSlug(slugify(request.name()));
        product.setDescription(request.description());
        product.setCategory(request.category());
        product.setBrand(request.brand());
        product.setPurchasePrice(request.purchasePrice());
        product.setSalePrice(request.salePrice());
        product.setStock(request.stock());
        product.setMinimumStock(request.minimumStock() == null ? 5 : request.minimumStock());
        product.setSize(request.size());
        product.setColor(request.color());
        product.setActive(request.active() == null || request.active());
        product.setFeatured(Boolean.TRUE.equals(request.featured()));
        applyVariants(product, request.variantsJson());
    }

    private void applyVariants(Product product, String variantsJson) {
        if (variantsJson == null || variantsJson.isBlank()) {
            product.getVariants().clear();
            return;
        }
        try {
            List<ProductVariantRequest> requests = objectMapper.readValue(variantsJson, new TypeReference<>() {});
            product.getVariants().clear();
            List<ProductVariant> variants = new ArrayList<>();
            for (ProductVariantRequest request : requests) {
                if (request.size() == null || request.size().isBlank()
                        || request.color() == null || request.color().isBlank()
                        || request.purchasePrice() == null || request.salePrice() == null
                        || request.stock() == null || request.stock() < 0) {
                    throw new ApiException(HttpStatus.BAD_REQUEST, "Completa correctamente las variantes del producto");
                }
                ProductVariant variant = new ProductVariant();
                variant.setProduct(product);
                variant.setSku(request.sku());
                variant.setSize(request.size());
                variant.setColor(request.color());
                variant.setPurchasePrice(request.purchasePrice());
                variant.setSalePrice(request.salePrice());
                variant.setStock(request.stock());
                variants.add(variant);
            }
            product.getVariants().addAll(variants);
        } catch (ApiException ex) {
            throw ex;
        } catch (IOException ex) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Las variantes enviadas no tienen un formato válido");
        }
    }

    private String storeImage(MultipartFile image) {
        if (image == null || image.isEmpty()) {
            return "/assets/product-placeholder.svg";
        }
        if (image.getContentType() == null || !image.getContentType().startsWith("image/")) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "El archivo debe ser una imagen");
        }
        try {
            Path folder = Path.of(uploadDir, "products").toAbsolutePath().normalize();
            Files.createDirectories(folder);
            String extension = image.getOriginalFilename() != null && image.getOriginalFilename().contains(".")
                    ? image.getOriginalFilename().substring(image.getOriginalFilename().lastIndexOf("."))
                    : ".jpg";
            String filename = UUID.randomUUID() + extension;
            Path destination = folder.resolve(filename);
            image.transferTo(destination);
            return "/uploads/products/" + filename;
        } catch (IOException ex) {
            throw new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, "No se pudo guardar la imagen");
        }
    }

    private String slugify(String value) {
        String normalized = Normalizer.normalize(value == null ? "" : value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
        return normalized.isBlank() ? UUID.randomUUID().toString() : normalized;
    }
}
