package com.athletix.sports.dto;

import com.athletix.sports.model.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
        Long id,
        String customerName,
        String customerEmail,
        BigDecimal total,
        String shippingAddress,
        OrderStatus status,
        Instant createdAt,
        List<OrderItemResponse> items
) {
}
