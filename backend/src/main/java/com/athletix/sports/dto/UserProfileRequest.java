package com.athletix.sports.dto;

import jakarta.validation.constraints.NotBlank;

public record UserProfileRequest(
        @NotBlank String fullName,
        String phone,
        String address,
        String city,
        String district
) {
}
