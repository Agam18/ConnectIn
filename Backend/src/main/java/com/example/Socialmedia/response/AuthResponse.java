package com.example.Socialmedia.response;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthResponse {

    private String  token;
    private String message;

}
