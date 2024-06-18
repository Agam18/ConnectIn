package com.example.Socialmedia.service;

import com.example.Socialmedia.entity.Post;
import com.example.Socialmedia.entity.User;

import java.util.List;

public interface PostService {

    Post createNewPost(Post post, User reqUser) throws Exception;
    String deletePost(String postId,User user) throws Exception;
    List<Post> findPostByUserId(User user);
    Post findPostById(String postId) throws Exception;
    Iterable<Post> findAlIPost();
    Post savedPost(String postId, User user) throws Exception;
    Post likePost(String postId,User user) throws Exception;
    public Post updatePost(Post post, String id) throws Exception;
}
