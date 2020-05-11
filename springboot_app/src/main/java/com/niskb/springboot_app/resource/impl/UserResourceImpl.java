package com.niskb.springboot_app.resource.impl;

import com.niskb.model.User;
import com.niskb.springboot_app.resource.Resource;
import com.niskb.springboot_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserResourceImpl implements Resource<User> {

    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<Collection<User>> findAll() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<User> findById(Long id) {
        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<User> save(User user) {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<User> update(User user) {
        return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<User> deleteById(Long id) {
        return new ResponseEntity<>(userService.deleteUserById(id), HttpStatus.OK);
    }
}
