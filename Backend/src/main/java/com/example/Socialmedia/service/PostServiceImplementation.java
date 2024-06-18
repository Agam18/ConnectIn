package com.example.Socialmedia.service;

import com.example.Socialmedia.Repository.PostRepository;
import com.example.Socialmedia.Repository.UserRepository;
import com.example.Socialmedia.entity.Post;
import com.example.Socialmedia.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImplementation implements PostService{

    @Autowired
    private PostRepository postRepository;

//    @Autowired
//    private UserService userService;

    @Autowired
    private UserRepository userRepository;



    @Override
    public Post createNewPost(Post post, User requser) throws Exception {
        User user=requser;
//        post.setCreatedAt(LocalDateTime.now());
        post.setUser(user.getFirstname()+" "+user.getLastname());
        post.setUserId(user.getId());
        Post saved=postRepository.save(post);
        return post;


    }

    @Override
    public String deletePost(String postId, User user) throws Exception {
        Post post=findPostById(postId);

        //return post.getUserId()+" "+userId;
        if(post.getUserId().equals(user.getId())){
            postRepository.delete(post);
//
            return "deleted successfully";

        }
        throw new Exception("You are not authorised to delete this post");
    }

    @Override
    public List<Post> findPostByUserId(User user) {
        return postRepository.findPostByUserId(user.getId());
    }

    @Override
    public Post findPostById(String postId) throws Exception {
        Optional<Post> opt=postRepository.findById(postId);
        if(opt.isEmpty()){
            throw new Exception("post not find by id "+postId);
        }
        return opt.get();
    }

    @Override
    public Iterable<Post> findAlIPost() {
        return postRepository.findAll();
    }

    @Override
    public Post savedPost(String postId, User user) throws Exception {
        //Post post=findPostById(postId);

        if(user.getSaved().contains(postId)){

            user.getSaved().remove(postId);
        }
        else{
            user.getSaved().add(postId);
        }
        userRepository.save(user);
        return null;
    }

    @Override
    public Post likePost(String postId, User user) throws Exception {
        Post post=findPostById(postId);
        //User user=userService.findUserByld(userId);

        if(post.getLiked().contains(user.getId())){
            post.getLiked().remove(user.getId());
        }
        else {
            post.getLiked().add(user.getId());
        }

        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post post, String id) throws Exception {
        Post old=findPostById(id);
        if(post.getCaption()!=null) old.setCaption(post.getCaption());
        if(post.getImage()!=null) old.setImage(post.getImage());
        if(post.getUser()!=null) old.setUser(post.getUser());
        postRepository.save(old);
        return old;
    }
}
