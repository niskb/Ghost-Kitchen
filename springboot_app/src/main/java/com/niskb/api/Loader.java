package com.niskb.api;

import com.niskb.model.HistoryBag;
import com.niskb.model.RecipePuppyBag;
import com.niskb.model.UserBag;

import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class Loader {

    public static RecipePuppyBag loadRecipes() {
        RecipePuppyBag recipeBag = null;
        try {
            FileInputStream f = new FileInputStream("myRecipes.dat");
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
            FileInputStream f = new FileInputStream("myUsers.dat");
            ObjectInputStream o = new ObjectInputStream(f);
            userBag = (UserBag) o.readObject();
            o.close();
            f.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userBag;
    }

    public static HistoryBag loadHistory() {
        HistoryBag historyBag = null;
        try {
            FileInputStream f = new FileInputStream("myHistories.dat");
            ObjectInputStream o = new ObjectInputStream(f);
            historyBag = (HistoryBag) o.readObject();
            o.close();
            f.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return historyBag;
    }

}
