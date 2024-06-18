package com.example.Socialmedia.controller;

import com.example.Socialmedia.entity.Post;
import com.example.Socialmedia.entity.User;
import com.example.Socialmedia.response.ApiResponse;
import com.example.Socialmedia.service.PostService;
import com.example.Socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/posts")
    public ResponseEntity<Post> createPost(@RequestBody Post post,@RequestHeader("Authorization")String jwt) throws Exception {
        User reqUser=userService.findUserByJwt(jwt);
        Post newPost=postService.createNewPost(post,reqUser);
        return new ResponseEntity<>(newPost, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/api/posts/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable String postId,@RequestHeader("Authorization")String jwt) throws Exception {
        User reqUser=userService.findUserByJwt(jwt);
        String message=postService.deletePost(postId,reqUser);
        ApiResponse res=new ApiResponse(message,true);
        return new ResponseEntity<ApiResponse>(res,HttpStatus.OK);

    }

    @PutMapping("/api/posts/{postId}")
    public Post updatePost(@RequestBody Post post, @PathVariable String postId) throws Exception {



        return postService.updatePost(post, postId);


    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<Post> findPostById(@PathVariable String postId) throws Exception {

        Post post=postService.findPostById(postId);
        return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
    }

    @GetMapping("/posts/profile")
    public ResponseEntity<List<Post>> findUsersPost(@RequestHeader("Authorization")String jwt){
        User reqUser=userService.findUserByJwt(jwt);
        List<Post> posts=postService.findPostByUserId(reqUser);
        return new ResponseEntity<>(posts,HttpStatus.OK);
    }
    @GetMapping("/posts/savedPosts")
    public ResponseEntity<List<Post>> findSavedPosts(@RequestHeader("Authorization")String jwt) throws Exception {
        User reqUser=userService.findUserByJwt(jwt);
        List<String> saved=reqUser.getSaved();
        List<Post> savedPosts=new ArrayList<>();
        for(String item:saved){
            savedPosts.add(postService.findPostById(item));

        }


        return new ResponseEntity<>(savedPosts,HttpStatus.OK);
    }

    @GetMapping("/posts")
    public ResponseEntity<Iterable<Post>> findAllPosts(){
        Iterable<Post> posts=postService.findAlIPost();
        return new ResponseEntity<Iterable<Post>>(posts,HttpStatus.OK);
    }

    @PutMapping("/posts/{postId}/save")
    public ResponseEntity<Post> savePost(@PathVariable String postId,@RequestHeader("Authorization")String jwt) throws Exception {
        User reqUser=userService.findUserByJwt(jwt);
        Post post=postService.savedPost(postId,reqUser);
        return new ResponseEntity<>(post,HttpStatus.ACCEPTED);
    }

    @PutMapping("/posts/like/{postId}")
    public ResponseEntity<Post> likePost(@PathVariable String postId, @RequestHeader("Authorization")String jwt) throws Exception {
        User reqUser=userService.findUserByJwt(jwt);
        Post post=postService.likePost(postId,reqUser);
        return new ResponseEntity<>(post,HttpStatus.ACCEPTED);
    }



}
