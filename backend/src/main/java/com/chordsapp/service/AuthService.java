package com.chordsapp.service;

import com.chordsapp.exception.ApiException;
import com.chordsapp.model.User;
import com.chordsapp.repository.UserRepository;
import com.chordsapp.util.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(String email, String password) {
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            throw new ApiException("Email and password are required", HttpStatus.BAD_REQUEST);
        }
        if (password.length() < 6) {
            throw new ApiException("Password must be at least 6 characters", HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByEmail(email)) {
            throw new ApiException("Email already taken", HttpStatus.CONFLICT);
        }
        User user = new User();
        user.setEmail(email.trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER");
        userRepository.save(user);
        return jwtUtil.generateToken(user.getEmail());
    }

    public String login(String email, String password) {
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            throw new ApiException("Email and password are required", HttpStatus.BAD_REQUEST);
        }
        Optional<User> userOpt = userRepository.findByEmail(email.trim().toLowerCase());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return jwtUtil.generateToken(user.getEmail());
            }
        }
        throw new ApiException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }
}