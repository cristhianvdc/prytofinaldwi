package com.athletix.sports.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank String fullName,
        @Email @NotBlank String email,
        @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres") String password,
        String phone,
        String address,
        String city,
        String district
) {
}
