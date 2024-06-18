package com.example.Socialmedia.Repository;

import com.example.Socialmedia.entity.Post;
import com.example.Socialmedia.entity.User;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;
import java.util.Optional;


public interface PostRepository extends ElasticsearchRepository<Post,String> {

    public Optional<Post> findById(String id);


//    @Query("{\"bool\": {\"must\": [{\"match\": {\"user.id\": \"?0\"}}]}}")
    public List<Post> findPostByUserId(String userId);
}
