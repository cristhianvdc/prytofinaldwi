package com.athletix.sports.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CartItemRequest(
        @NotNull Long productId,
        Long variantId,
        @Min(1) int quantity
) {
}
