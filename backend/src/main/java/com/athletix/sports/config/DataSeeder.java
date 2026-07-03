package com.athletix.sports.config;

import com.athletix.sports.model.Product;
import com.athletix.sports.model.ProductVariant;
import com.athletix.sports.model.Role;
import com.athletix.sports.model.User;
import com.athletix.sports.repository.ProductRepository;
import com.athletix.sports.repository.UserRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seed(UserRepository userRepository, ProductRepository productRepository, PasswordEncoder encoder) {
        return args -> {
            if (!userRepository.existsByEmail("admin@athletix.com")) {
                User admin = new User();
                admin.setFullName("Admin Athletix");
                admin.setEmail("admin@athletix.com");
                admin.setPassword(encoder.encode("Admin12345"));
                admin.setRole(Role.ADMIN);
                admin.setCity("Lima");
                userRepository.save(admin);
            }

            if (!userRepository.existsByEmail("cliente@athletix.com")) {
                User client = new User();
                client.setFullName("Cliente Demo");
                client.setEmail("cliente@athletix.com");
                client.setPassword(encoder.encode("Cliente12345"));
                client.setRole(Role.CLIENT);
                client.setAddress("Av. Deportiva 123");
                client.setCity("Lima");
                client.setDistrict("Miraflores");
                userRepository.save(client);
            }

            if (productRepository.count() == 0) {
                productRepository.saveAll(List.of(
                        product("Conjunto Puma teamRISE", "Conjunto de fútbol que combina comodidad, durabilidad y estilo para entrenar con rendimiento.",
                                "Deportes", "Puma", "S, M, L, XL", "Blanco/Negro", 150, 229.90, 18,
                                "/assets/img/buzo puma.avif"),
                        product("Casaca Adidas Nations Pack", "Casaca de fútbol Adidas con diseño moderno para entrenamiento y uso urbano.",
                                "Ropa Urbana", "Adidas", "S, M, L", "Azul", 170, 250, 12,
                                "/assets/img/Casaca adidas.avif"),
                        product("Nike Sportswear", "Colección Nike Sportswear con estilo urbano y tecnología deportiva.",
                                "Ropa Urbana", "Nike", "S, M, L, XL", "Negro", 230, 330, 10,
                                "/assets/img/nike sportswear2.webp"),
                        product("Camiseta Reebok Classics Cropped", "Camiseta Reebok Classics de corte moderno, cómoda para outfits deportivos.",
                                "Ropa Urbana", "Reebok", "S, M, XL", "Blanco", 70, 115, 25,
                                "/assets/img/camiseta reebok.webp")
                ));
            }
        };
    }

    private Product product(String name, String description, String category, String brand, String size, String color,
                            double purchasePrice, double salePrice, int stock, String imageUrl) {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setCategory(category);
        product.setBrand(brand);
        product.setSize(size);
        product.setColor(color);
        product.setFeatured(true);
        product.setPurchasePrice(BigDecimal.valueOf(purchasePrice));
        product.setSalePrice(BigDecimal.valueOf(salePrice));
        product.setStock(stock);
        product.setMinimumStock(5);
        product.setImageUrl(imageUrl);
        product.setActive(true);
        product.getVariants().add(variant(product, brand.toUpperCase() + "-M", "M", color, purchasePrice, salePrice, Math.max(1, stock / 2)));
        product.getVariants().add(variant(product, brand.toUpperCase() + "-L", "L", color, purchasePrice + 5, salePrice + 10, Math.max(1, stock / 2)));
        return product;
    }

    private ProductVariant variant(Product product, String sku, String size, String color,
                                   double purchasePrice, double salePrice, int stock) {
        ProductVariant variant = new ProductVariant();
        variant.setProduct(product);
        variant.setSku(sku);
        variant.setSize(size);
        variant.setColor(color);
        variant.setPurchasePrice(BigDecimal.valueOf(purchasePrice));
        variant.setSalePrice(BigDecimal.valueOf(salePrice));
        variant.setStock(stock);
        return variant;
    }
}
