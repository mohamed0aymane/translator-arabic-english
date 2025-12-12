package org.mql.generative.ai.controllers;

import org.mql.generative.ai.models.User;
import org.mql.generative.ai.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private JwtUtil jwt;

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        if (user.getUsername().equals("admin") && user.getPassword().equals("1234")) {
            return jwt.generateToken(user.getUsername());
        }

        return "Invalid credentials!";
    }
}
