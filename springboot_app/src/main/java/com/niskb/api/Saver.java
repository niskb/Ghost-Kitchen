package com.niskb.api;

import com.niskb.model.RecipePuppyBag;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;

public class Saver {

    public static void saveRecipes(RecipePuppyBag recipeBag) {
        try {
            FileOutputStream f = new FileOutputStream("myRecipes.txt");
            ObjectOutputStream o = new ObjectOutputStream(f);
            o.writeObject(recipeBag);
            o.close();
            f.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
