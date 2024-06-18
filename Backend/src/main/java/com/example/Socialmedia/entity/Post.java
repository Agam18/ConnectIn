package com.example.Socialmedia.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(indexName = "allposts")
public class Post {

    @Id
    private String id;

    private String caption;

    private String image;

    private String userId;

    private String user;
    private List<String> liked=new ArrayList<>();
}
