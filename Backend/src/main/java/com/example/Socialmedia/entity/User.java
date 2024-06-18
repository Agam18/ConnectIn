package com.example.Socialmedia.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(indexName = "allusers")
public class User {

    @Id
    private String id;

    private String firstname;

    private String lastname;

    private String email;

    private String  gender;

    private String password;

    private List<String> followings=new ArrayList<>();

    private List<String> followers=new ArrayList<>();

    private List<String> saved=new ArrayList<>();

}
