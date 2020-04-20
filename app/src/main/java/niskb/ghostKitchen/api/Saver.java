package niskb.ghostKitchen.api;

import niskb.ghostKitchen.model.RecipeBag;

import java.io.File;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;

public class Saver {

    public static void saveRecipes(RecipeBag recipeBag) {
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
