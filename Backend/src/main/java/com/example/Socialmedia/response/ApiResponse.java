package com.example.Socialmedia.response;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Setter
@Getter
public class ApiResponse {

    private String message;
    private boolean status;
}
