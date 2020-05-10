package com.niskb.test;

import com.niskb.api.Downloader;
import com.niskb.api.Loader;
import com.niskb.api.Saver;
import com.niskb.model.History;
import com.niskb.model.HistoryBag;

import java.util.Scanner;

public class HistoryRESTDownloadDemo {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter history size {Integer}: ");
        int size = scanner.nextInt();
        scanner.nextLine();
        System.out.println();
        scanner.close();
        HistoryBag historyBag = Downloader.downloadHistoryData(size);
        Saver.saveHistories(historyBag);
        historyBag = Loader.loadHistory();
        for(int i = 0; i < historyBag.getNElems(); i++) {
            History history = new History();
            history.setId(historyBag.getHistory(i).getId());
            history.setMeals(historyBag.getHistory(i).getMeals());
            history.setTotal(historyBag.getHistory(i).getTotal());
            history.setName(historyBag.getHistory(i).getName());
            history.setEmail(historyBag.getHistory(i).getEmail());
            history.setAddress(historyBag.getHistory(i).getAddress());
            history.setPhoneNumber(historyBag.getHistory(i).getPhoneNumber());
            System.out.println(history);
        }
    }

}
