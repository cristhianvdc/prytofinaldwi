package com.athletix.sports.dto;

import com.athletix.sports.model.Role;

public record AuthResponse(
        String token,
        Long id,
        String fullName,
        String email,
        Role role
) {
}
