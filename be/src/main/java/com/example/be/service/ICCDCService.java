package com.example.be.service;

import com.example.be.entity.CCDC;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICCDCService {
    Page<CCDC> searchCCDCByNameAndManufacturer(String name, String manufacturer, Pageable pageable);
    CCDC getById(int id);
    void saveCCDC(CCDC ccdc);
}
