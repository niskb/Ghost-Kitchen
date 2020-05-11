package com.niskb.model;

import java.io.Serializable;

public class UserBag implements Serializable {

    private User[] users;
    private int nElems;

    public UserBag(int maxSize) {
        users = new User[maxSize];
        nElems = 0;
    }

    public void insertUser(User user) {
        users[nElems++] = user;
    }

    public User getUser(int i) {
        return users[i];
    }

    public void displayUsersInConsole() {
        for (int i = 0; i < nElems; i++) {
            System.out.println(users[i]);
        }
    }

    public int getNElems() {
        return nElems;
    }

}
