package com.athletix.sports.dto;

import com.athletix.sports.model.Role;

public record UserProfileResponse(
        Long id,
        String fullName,
        String email,
        Role role,
        String phone,
        String address,
        String city,
        String district
) {
}
