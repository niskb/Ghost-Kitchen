package com.niskb.api;

import com.niskb.model.RecipeBag;

import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class Loader {

    public static RecipeBag loadRecipes() {
        RecipeBag recipeBag = null;
        try {
            FileInputStream f = new FileInputStream("myRecipes.txt");
            ObjectInputStream o = new ObjectInputStream(f);
            recipeBag = (RecipeBag) o.readObject();
            o.close();
            f.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return recipeBag;
    }

}
