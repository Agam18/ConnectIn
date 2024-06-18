package com.example.Socialmedia.service;

import com.example.Socialmedia.Repository.UserRepository;
import com.example.Socialmedia.config.JwtProvider;
import com.example.Socialmedia.entity.Post;
import com.example.Socialmedia.entity.User;
import jakarta.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostService postService;



    @Override
    public User registerUser(User user) {
        User newUser= new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstname(user.getFirstname());
        newUser.setLastname(user.getLastname());
        newUser.setPassword(user.getPassword());
        if(user.getId()!=null) newUser.setId(user.getId());

        User savedUser= userRepository.save(newUser);
        return savedUser;
    }

    @Override
    public User findUserByld(String userld) throws Exception {
        Optional<User> newUser= userRepository.findById(userld);
        if(newUser.isPresent()) return newUser.get();

        throw new Exception("user not exist with userId"+userld);
    }

    @Override
    public User findUserByEmail(String email)  {
        Optional<User> newUser= userRepository.findByEmail(email);
        if(newUser.isPresent()) return newUser.get();
        return null;


    }

    @Override
    public User followUser(String reqUserId, String userId2) throws Exception {
        User reqUser=findUserByld(reqUserId);
        User user2=findUserByld(userId2);
        reqUser.getFollowings().add(user2.getId());
        user2.getFollowers().add(reqUserId);
        userRepository.save(reqUser);
        userRepository.save(user2);
        return reqUser;

    }

    @Override
    public User updateUser(User user,String id) throws Exception{
        Optional<User> user1= userRepository.findById(id);
        if(user1.isEmpty()){
            throw new Exception("user not exist with "+id);
        }
        User oldUser=user1.get();
        if(user.getFirstname()!=null){
            oldUser.setFirstname(user.getFirstname());
        }
        if(user.getLastname()!=null){
            oldUser.setLastname(user.getLastname());
        }
        if(user.getEmail()!=null){
            oldUser.setEmail(user.getEmail());
        }
        if(user.getPassword()!=null){
            oldUser.setPassword(user.getPassword());
        }
        if(user.getGender()!=null){
            oldUser.setGender(user.getGender());
        }
        User updatedUser=userRepository.save(oldUser);
        List<Post> AllPosts=postService.findPostByUserId(updatedUser);
        String newname=user.getFirstname()+" "+user.getLastname();
        Post newPost = new Post();
        newPost.setUser(newname);
        for(Post post:AllPosts){
            postService.updatePost(newPost,post.getId());

        }
        return updatedUser;

    }

//    @Query"select u from User u where u.firstName LIKE %:query% OR u.lastName LIKE %:query%")
//    public List<User> searchUser(@Param("query") String query);
//    @Override
//    public Iterable<User> searchUser(String query) {
//        Iterable<User> users = userRepository.searchUser(query);
//        return users;
//    }

    @Override
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email= JwtProvider.getEmailFormJwtToken(jwt);
        User user=userRepository.findByEmail(email).get();
        user.setPassword(null);
        return user;

    }
}
