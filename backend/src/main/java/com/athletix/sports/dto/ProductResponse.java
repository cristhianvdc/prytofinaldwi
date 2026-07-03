package com.athletix.sports.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record ProductResponse(
        Long id,
        String slug,
        String name,
        String description,
        String category,
        String brand,
        BigDecimal purchasePrice,
        BigDecimal salePrice,
        Integer stock,
        Integer minimumStock,
        String size,
        String color,
        List<ProductVariantResponse> variants,
        String imageUrl,
        boolean active,
        boolean featured,
        Instant createdAt
) {
}
