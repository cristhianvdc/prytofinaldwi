package com.athletix.sports.dto;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long productId,
        String productName,
        Long variantId,
        String variantLabel,
        int quantity,
        BigDecimal unitPrice,
        BigDecimal subtotal
) {
}
