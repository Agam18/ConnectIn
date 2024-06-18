package com.example.Socialmedia.Repository;

import com.example.Socialmedia.entity.User;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends ElasticsearchRepository<User,String> {

    public Optional<User> findByEmail(String email);

    public Optional<User> findById(String id);
//
////    @Query("{\"bool\": {\"should\": [{\"match\": {\"firstname\": {\"query\": \"?0\", \"fuzziness\": \"AUTO\"}}}, {\"match\": {\"lastname\": {\"query\": \"?0\", \"fuzziness\": \"AUTO\"}}}]}}")
//    public Iterable<User> searchUser(@Param("query") String query);





}
