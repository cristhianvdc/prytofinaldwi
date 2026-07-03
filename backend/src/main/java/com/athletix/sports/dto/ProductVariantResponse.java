package com.athletix.sports.dto;

import java.math.BigDecimal;

public record ProductVariantResponse(
        Long id,
        String sku,
        String size,
        String color,
        BigDecimal purchasePrice,
        BigDecimal salePrice,
        Integer stock
) {
}
