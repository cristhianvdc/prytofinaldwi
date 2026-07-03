package com.athletix.sports.service;

import com.athletix.sports.dto.ChangePasswordRequest;
import com.athletix.sports.dto.UserProfileRequest;
import com.athletix.sports.dto.UserProfileResponse;
import com.athletix.sports.exception.ApiException;
import com.athletix.sports.model.User;
import com.athletix.sports.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final MapperService mapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, MapperService mapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
    }

    public UserProfileResponse profile(String email) {
        return mapper.toUserProfile(getByEmail(email));
    }

    public UserProfileResponse updateProfile(String email, UserProfileRequest request) {
        User user = getByEmail(email);
        user.setFullName(request.fullName());
        user.setPhone(request.phone());
        user.setAddress(request.address());
        user.setCity(request.city());
        user.setDistrict(request.district());
        return mapper.toUserProfile(userRepository.save(user));
    }

    public void changePassword(String email, ChangePasswordRequest request) {
        User user = getByEmail(email);
        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "La contraseña actual no es correcta");
        }
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }
}
