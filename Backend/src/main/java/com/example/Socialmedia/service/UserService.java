package com.example.Socialmedia.service;

import com.example.Socialmedia.entity.User;

import java.util.Iterator;
import java.util.List;

public interface UserService {

    public User registerUser(User user);

    public User findUserByld(String userld) throws Exception;

    public User findUserByEmail(String email) ;

    public User followUser(String userId1, String userId2) throws Exception;

    public User updateUser(User user,String id) throws Exception;

//    public Iterable<User> searchUser(String query);

    public Iterable<User> getAllUsers();

    public User findUserByJwt(String jwt);
}
