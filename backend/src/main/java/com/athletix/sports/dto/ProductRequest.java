package com.athletix.sports.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank String name,
        @NotBlank String description,
        @NotBlank String category,
        @NotBlank String brand,
        @NotNull @DecimalMin("0.0") BigDecimal purchasePrice,
        @NotNull @DecimalMin("0.0") BigDecimal salePrice,
        @NotNull @Min(0) Integer stock,
        @NotNull @Min(0) Integer minimumStock,
        String size,
        String color,
        String variantsJson,
        Boolean active,
        Boolean featured
) {
}
