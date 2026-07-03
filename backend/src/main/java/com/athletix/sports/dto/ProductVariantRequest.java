package com.athletix.sports.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record ProductVariantRequest(
        String sku,
        @NotBlank String size,
        @NotBlank String color,
        @NotNull @DecimalMin("0.0") BigDecimal purchasePrice,
        @NotNull @DecimalMin("0.0") BigDecimal salePrice,
        @NotNull @Min(0) Integer stock
) {
}
