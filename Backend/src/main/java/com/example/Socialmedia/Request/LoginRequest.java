package com.example.Socialmedia.Request;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class LoginRequest {
    private String email;
    private String password;
}
