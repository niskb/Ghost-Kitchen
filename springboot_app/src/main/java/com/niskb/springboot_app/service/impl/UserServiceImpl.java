package com.niskb.springboot_app.service.impl;

import com.niskb.api.Loader;
import com.niskb.model.Meal;
import com.niskb.model.RecipePuppyBag;
import com.niskb.model.User;
import com.niskb.model.UserBag;
import com.niskb.springboot_app.service.UserService;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    private Long userId = 1L;
    private Map<Long, User> userMap = new HashMap<Long, User>();

    {
        for(int i = 0; i < 75; i++) {
            User user = new User();
            user.setId(userId++);
            user.setName("Default");
            user.setEmail("Default");
            user.setAddress("Default");
            user.setPhoneNumber("Default");
            //System.out.println("PUTTING NEW USER IN, User Id: " + user.getId());
            userMap.put(user.getId(), user);
        }
    }

    @Override
    public Collection<User> findAll() {
        return userMap.values();
    }

    @Override
    public User findUserById(Long id) {
        return userMap.get(id);
    }

    @Override
    public User saveUser(User user) {
        Long newUserId = ++userId;
        user.setId(userId);
        System.out.println("SAVING USER, User Id: " + user.getId());
        userMap.put(user.getId(), user);
        return userMap.get(newUserId);
    }

    @Override
    public User updateUser(User user) {
        userId = user.getId();
        if(userMap.get(userId) != null) {
            System.out.println("UPDATING USER, User Id: " + user.getId());
            userMap.put(userId, user);
            return userMap.get(userId);
        }
        return null;
    }

    @Override
    public User deleteUserById(Long id) {
        if(userMap.get(id) != null) {
            System.out.println("DELETING USER, User Id: " + id);
            userMap.remove(id);
        }
        return null;
    }
}
