package com.athletix.sports.service;

import com.athletix.sports.dto.ContactResponse;
import com.athletix.sports.dto.OrderItemResponse;
import com.athletix.sports.dto.OrderResponse;
import com.athletix.sports.dto.ProductResponse;
import com.athletix.sports.dto.ProductVariantResponse;
import com.athletix.sports.dto.UserProfileResponse;
import com.athletix.sports.model.ContactMessage;
import com.athletix.sports.model.Order;
import com.athletix.sports.model.OrderItem;
import com.athletix.sports.model.Product;
import com.athletix.sports.model.ProductVariant;
import com.athletix.sports.model.User;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MapperService {
    public UserProfileResponse toUserProfile(User user) {
        return new UserProfileResponse(user.getId(), user.getFullName(), user.getEmail(), user.getRole(),
                user.getPhone(), user.getAddress(), user.getCity(), user.getDistrict());
    }

    public ProductResponse toProduct(Product product) {
        List<ProductVariantResponse> variants = product.getVariants().stream().map(this::toVariant).toList();
        return new ProductResponse(product.getId(), product.getSlug(), product.getName(), product.getDescription(), product.getCategory(),
                product.getBrand(), product.getPurchasePrice(), product.getSalePrice(), product.getStock(),
                product.getMinimumStock(), product.getSize(), product.getColor(), variants, product.getImageUrl(),
                product.isActive(), product.isFeatured(), product.getCreatedAt());
    }

    public OrderResponse toOrder(Order order) {
        List<OrderItemResponse> items = order.getItems().stream().map(this::toOrderItem).toList();
        return new OrderResponse(order.getId(), order.getUser().getFullName(), order.getUser().getEmail(),
                order.getTotal(), order.getShippingAddress(), order.getStatus(), order.getCreatedAt(), items);
    }

    public ContactResponse toContact(ContactMessage message) {
        return new ContactResponse(message.getId(), message.getFullName(), message.getEmail(), message.getSubject(),
                message.getMessage(), message.isAnswered(), message.getCreatedAt());
    }

    private OrderItemResponse toOrderItem(OrderItem item) {
        Long variantId = item.getVariant() == null ? null : item.getVariant().getId();
        String variantLabel = item.getVariant() == null ? null
                : item.getVariant().getSize() + " / " + item.getVariant().getColor();
        return new OrderItemResponse(item.getProduct().getId(), item.getProduct().getName(), variantId, variantLabel,
                item.getQuantity(), item.getUnitPrice(), item.getSubtotal());
    }

    private ProductVariantResponse toVariant(ProductVariant variant) {
        return new ProductVariantResponse(variant.getId(), variant.getSku(), variant.getSize(), variant.getColor(),
                variant.getPurchasePrice(), variant.getSalePrice(), variant.getStock());
    }
}
