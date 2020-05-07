package com.niskb.api;

import com.niskb.model.RecipePuppyBag;
import com.niskb.model.UserBag;

import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class Loader {

    public static RecipePuppyBag loadRecipes() {
        RecipePuppyBag recipeBag = null;
        try {
            FileInputStream f = new FileInputStream("myRecipes.txt");
            ObjectInputStream o = new ObjectInputStream(f);
            recipeBag = (RecipePuppyBag) o.readObject();
            o.close();
            f.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return recipeBag;
    }

    public static UserBag loadUsers() {
        UserBag userBag = null;
        try {
            FileInputStream f = new FileInputStream("myUsers.txt");
            ObjectInputStream o = new ObjectInputStream(f);
            userBag = (UserBag) o.readObject();
            o.close();
            f.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userBag;
    }

}
