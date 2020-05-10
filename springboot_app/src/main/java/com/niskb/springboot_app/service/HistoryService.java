package com.niskb.springboot_app.service;

import com.niskb.model.History;

import java.util.Collection;

public interface HistoryService {

    Collection<History> findAll();

    History findHistoryById(Long id);

    History saveHistory(History history);

    History updateHistory(History history);

    History deleteHistoryById(Long id);

}
