package com.niskb.model;

import java.io.Serializable;

public class HistoryBag implements Serializable {

    private History[] histories;
    private int nElems;

    public HistoryBag(int maxSize) {
        histories = new History[maxSize];
        nElems = 0;
    }

    public void insertHistory(History history) {
        histories[nElems++] = history;
    }

    public History getHistory(int i) {
        return histories[i];
    }

    public void displayHistoriesInConsole() {
        for (int i = 0; i < nElems; i++) {
            System.out.println(histories[i]);
        }
    }

    public int getNElems() {
        return nElems;
    }

}
