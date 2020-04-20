package niskb.ghostKitchen.api;

import niskb.ghostKitchen.model.Recipe;
import niskb.ghostKitchen.model.RecipeBag;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class Downloader {

    private static RecipeBag recipeBag = new RecipeBag(1000);

    public static RecipeBag downloadData() {
        List<String> titleList = new ArrayList<String>();
        List<String> hrefList = new ArrayList<String>();
        List<String> ingredientsList = new ArrayList<String>();
        List<String> thumbnailList = new ArrayList<String>();
        for (int i = 1; i <= 100; i++) {
            try {
                String url = "http://www.recipepuppy.com/api/?p=" + i;
                URL obj = new URL(url);
                HttpURLConnection con = (HttpURLConnection) obj.openConnection();

                int responseCode = con.getResponseCode();

                System.out.println("\nSending 'GET' request to URL : " + url);
                System.out.println("Response Code : " + responseCode);
                BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();
                // Print Response in String //

                // Convert Response to JSONObject //

                JSONObject myResponse = new JSONObject(response.toString());
                System.out.println(myResponse);

                // System.out.println("title : " + myResponse.getString("title"));
                // System.out.println("version : " + myResponse.getDouble("version"));
                // System.out.println("href : " + myResponse.getString("href"));
                // System.out.println("results : " + myResponse.getString("results"));

                JSONArray results_array = new JSONArray(myResponse.getJSONArray("results").toString());
                // System.out.println("results : " + results_array);

                for (int j = 0; j < results_array.length(); j++) {
                    titleList.add(results_array.getJSONObject(j).getString("title"));
                }

                for (int j = 0; j < results_array.length(); j++) {
                    hrefList.add(results_array.getJSONObject(j).getString("href"));
                }

                for (int j = 0; j < results_array.length(); j++) {
                    ingredientsList.add(results_array.getJSONObject(j).getString("ingredients"));
                }

                for (int j = 0; j < results_array.length(); j++) {
                    thumbnailList.add(results_array.getJSONObject(j).getString("thumbnail"));
                }

            } catch (Exception e) {
                System.out.println(e);
            }

        }

        for (int k = 0; k < 1000; k++) {
            recipeBag.insertRecipe(new Recipe(titleList.get(k), hrefList.get(k), ingredientsList.get(k), thumbnailList.get(k)));
        }

        return recipeBag;
    }

}