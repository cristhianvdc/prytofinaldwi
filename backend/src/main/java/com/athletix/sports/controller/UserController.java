package com.athletix.sports.controller;

import com.athletix.sports.dto.ChangePasswordRequest;
import com.athletix.sports.dto.UserProfileRequest;
import com.athletix.sports.dto.UserProfileResponse;
import com.athletix.sports.service.UserService;
import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/me")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public UserProfileResponse profile(Principal principal) {
        return userService.profile(principal.getName());
    }

    @PutMapping
    public UserProfileResponse updateProfile(Principal principal, @Valid @RequestBody UserProfileRequest request) {
        return userService.updateProfile(principal.getName(), request);
    }

    @PutMapping("/password")
    public void changePassword(Principal principal, @Valid @RequestBody ChangePasswordRequest request) {
        userService.changePassword(principal.getName(), request);
    }
}
