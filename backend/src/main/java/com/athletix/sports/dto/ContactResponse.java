package com.athletix.sports.dto;

import java.time.Instant;

public record ContactResponse(
        Long id,
        String fullName,
        String email,
        String subject,
        String message,
        boolean answered,
        Instant createdAt
) {
}
