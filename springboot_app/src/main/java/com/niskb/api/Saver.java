package com.niskb.api;

import com.niskb.model.HistoryBag;
import com.niskb.model.RecipePuppyBag;
import com.niskb.model.UserBag;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;

public class Saver {

    public static void saveRecipes(RecipePuppyBag recipeBag) {
        try {
            FileOutputStream f = new FileOutputStream("myRecipes.dat");
            ObjectOutputStream o = new ObjectOutputStream(f);
            o.writeObject(recipeBag);
            o.close();
            f.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void saveUsers(UserBag userBag) {
        try {
            FileOutputStream f = new FileOutputStream("myUsers.dat");
            ObjectOutputStream o = new ObjectOutputStream(f);
            o.writeObject(userBag);
            o.close();
            f.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void saveHistories(HistoryBag historyBag) {
        try {
            FileOutputStream f = new FileOutputStream("myHistories.dat");
            ObjectOutputStream o = new ObjectOutputStream(f);
            o.writeObject(historyBag);
            o.close();
            f.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
