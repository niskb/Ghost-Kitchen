package com.niskb.springboot_app.service;

import com.niskb.model.User;

import java.util.Collection;

public interface UserService {

    Collection<User> findAll();

    User findUserById(Long id);

    User saveUser(User user);

    User updateUser(User user);

    User deleteUserById(Long id);

}
