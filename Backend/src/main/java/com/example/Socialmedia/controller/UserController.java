package com.example.Socialmedia.controller;

import com.example.Socialmedia.entity.User;
import com.example.Socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/users")
    Iterable<User> findAll(){
            return userService.getAllUsers();
    }

    @GetMapping("/api/users/{userId}")
    public User getUserById(@PathVariable("userId") String id) throws Exception {
            return userService.findUserByld(id);
    }

    @GetMapping("/users/email/{email}")
    public User getUserByEmail(@PathVariable String email) throws Exception {

        return userService.findUserByEmail(email);

    }

    @PutMapping("/api/users")
    public User updateUser(@RequestBody User user,@RequestHeader("Authorization")String jwt) throws Exception {
            User reqUser=userService.findUserByJwt(jwt);
            return userService.updateUser(user, reqUser.getId());


    }
    @PutMapping("/api/users/{userId2}")
    public User followUserHandler(@RequestHeader("Authorization")String jwt,@PathVariable String userId2) throws Exception {
        User user=userService.findUserByJwt(jwt);
        String reqUserId=user.getId();
        User user1=userService.followUser(reqUserId,userId2);
        return user1;
    }
    @GetMapping("/api/users/profile")
    public User getUserFromToken(@RequestHeader("Authorization")String jwt){

        User user=userService.findUserByJwt(jwt);

        return user;

    }

//    @GetMapping("/users/search")
//    public Iterable<User> searchUser(@RequestParam ("query") String query){
//        Iterable <User> users=userService.searchUser(query);
//        return users;
//    }
//
//    @DeleteMapping("/users/{userId}")
//    public String deleteUser(@PathVariable Integer userId) throws Exception {
//
//        return userService.deleteUser(userId);
//
//
//    }




}
