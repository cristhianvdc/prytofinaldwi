package com.athletix.sports.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record OrderRequest(
        @NotEmpty List<@Valid CartItemRequest> items,
        @NotBlank String shippingAddress
) {
}
