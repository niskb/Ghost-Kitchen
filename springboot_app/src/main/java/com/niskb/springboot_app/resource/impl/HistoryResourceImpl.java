package com.niskb.springboot_app.resource.impl;

import com.niskb.model.History;
import com.niskb.springboot_app.resource.Resource;
import com.niskb.springboot_app.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/history")
@CrossOrigin(origins="http://localhost:3000")
public class HistoryResourceImpl implements Resource<History> {

    @Autowired
    private HistoryService historyService;

    @Override
    public ResponseEntity<Collection<History>> findAll() {
        return new ResponseEntity<>(historyService.findAll(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<History> findById(Long id) {
        return new ResponseEntity<>(historyService.findHistoryById(id), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<History> save(History history) {
        return new ResponseEntity<>(historyService.saveHistory(history), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<History> update(History history) {
        return new ResponseEntity<>(historyService.updateHistory(history), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<History> deleteById(Long id) {
        return new ResponseEntity<>(historyService.deleteHistoryById(id), HttpStatus.OK);
    }
}