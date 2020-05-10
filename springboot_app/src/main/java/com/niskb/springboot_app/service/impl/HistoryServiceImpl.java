package com.niskb.springboot_app.service.impl;

import com.niskb.model.History;
import com.niskb.springboot_app.service.HistoryService;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
public class HistoryServiceImpl implements HistoryService {

    private Long historyId = 0L;
    private Map<Long, History> historyMap = new HashMap<Long, History>();

    @Override
    public Collection<History> findAll() {
        return historyMap.values();
    }

    @Override
    public History findHistoryById(Long id) {
        return historyMap.get(id);
    }

    @Override
    public History saveHistory(History history) {
        Long newHistoryId = ++historyId;
        history.setId(historyId);
        System.out.println("SAVING HISTORY, History Id: " + history.getId());
        historyMap.put(history.getId(), history);
        return historyMap.get(newHistoryId);
    }

    @Override
    public History updateHistory(History history) {
        historyId = history.getId();
        if(historyMap.get(historyId) != null) {
            System.out.println("UPDATING HISTORY, History Id: " + history.getId());
            historyMap.put(historyId, history);
            return historyMap.get(historyId);
        }
        return null;
    }

    @Override
    public History deleteHistoryById(Long id) {
        if(historyMap.get(id) != null) {
            System.out.println("DELETING HISTORY, History Id: " + id);
            historyMap.remove(id);
        }
        return null;
    }

}
