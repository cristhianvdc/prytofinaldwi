package com.athletix.sports.service;

import com.athletix.sports.dto.OrderRequest;
import com.athletix.sports.dto.OrderResponse;
import com.athletix.sports.dto.UpdateOrderStatusRequest;
import com.athletix.sports.exception.ApiException;
import com.athletix.sports.model.Order;
import com.athletix.sports.model.OrderItem;
import com.athletix.sports.model.OrderStatus;
import com.athletix.sports.model.Product;
import com.athletix.sports.model.ProductVariant;
import com.athletix.sports.model.User;
import com.athletix.sports.repository.OrderRepository;
import com.athletix.sports.repository.ProductRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserService userService;
    private final MapperService mapper;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository,
                        UserService userService, MapperService mapper) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userService = userService;
        this.mapper = mapper;
    }

    @Transactional
    public OrderResponse create(String email, OrderRequest request) {
        User user = userService.getByEmail(email);
        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(request.shippingAddress());
        order.setStatus(OrderStatus.IN_REVIEW);

        BigDecimal total = BigDecimal.ZERO;
        for (var itemRequest : request.items()) {
            Product product = productRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Producto no encontrado"));
            if (!product.isActive()) {
                throw new ApiException(HttpStatus.BAD_REQUEST, product.getName() + " no está disponible");
            }

            ProductVariant variant = null;
            BigDecimal unitPrice = product.getSalePrice();
            if (itemRequest.variantId() != null) {
                variant = product.getVariants().stream()
                        .filter(item -> item.getId().equals(itemRequest.variantId()))
                        .findFirst()
                        .orElseThrow(() -> new ApiException(HttpStatus.BAD_REQUEST, "La variante seleccionada no existe"));
                if (variant.getStock() < itemRequest.quantity()) {
                    throw new ApiException(HttpStatus.BAD_REQUEST, "Stock insuficiente para " + product.getName()
                            + " " + variant.getSize() + "/" + variant.getColor());
                }
                variant.setStock(variant.getStock() - itemRequest.quantity());
                unitPrice = variant.getSalePrice();
            } else if (product.getStock() < itemRequest.quantity()) {
                throw new ApiException(HttpStatus.BAD_REQUEST, "Stock insuficiente para " + product.getName());
            }

            product.setStock(Math.max(0, product.getStock() - itemRequest.quantity()));
            BigDecimal subtotal = unitPrice.multiply(BigDecimal.valueOf(itemRequest.quantity()));
            total = total.add(subtotal);

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setVariant(variant);
            item.setQuantity(itemRequest.quantity());
            item.setUnitPrice(unitPrice);
            item.setSubtotal(subtotal);
            order.getItems().add(item);
        }

        order.setTotal(total);
        return mapper.toOrder(orderRepository.save(order));
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> myOrders(String email) {
        User user = userService.getByEmail(email);
        return orderRepository.findByUserOrderByCreatedAtDesc(user).stream().map(mapper::toOrder).toList();
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> all() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream().map(mapper::toOrder).toList();
    }

    @Transactional
    public OrderResponse updateStatus(Long id, UpdateOrderStatusRequest request) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Pedido no encontrado"));
        order.setStatus(request.status());
        return mapper.toOrder(orderRepository.save(order));
    }
}
