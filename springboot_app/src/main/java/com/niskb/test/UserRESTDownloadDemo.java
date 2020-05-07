package com.niskb.test;

import com.niskb.api.Downloader;
import com.niskb.api.Loader;
import com.niskb.api.Saver;
import com.niskb.model.User;
import com.niskb.model.UserBag;

public class UserRESTDownloadDemo {


    public static void main(String args[]) {
        UserBag userBag = Downloader.downloadUserData(75);
        Saver.saveUsers(userBag);
        userBag = Loader.loadUsers();
        for(int i = 0; i < 75; i++) {
            User user = new User();
            user.setId(userBag.getUser(i).getId());
            user.setName(userBag.getUser(i).getName());
            user.setEmail(userBag.getUser(i).getEmail());
            user.setAddress(userBag.getUser(i).getAddress());
            System.out.println(user);
        }
    }

}
