package com.athletix.sports.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank String fullName,
        @Email @NotBlank String email,
        @NotBlank String subject,
        @NotBlank @Size(max = 1800) String message
) {
}
