package com.example.be.service.impl;

import com.example.be.entity.CCDC;
import com.example.be.repository.ICCDCRepository;
import com.example.be.service.ICCDCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CCDCService implements ICCDCService {
    @Autowired
   private ICCDCRepository iccdcRepository;

    @Override
    public Page<CCDC> searchCCDCByNameAndManufacturer(String name, String manufacturer, Pageable pageable) {
        return iccdcRepository.searchCCDCByNameAndManufacturer("%" + name.trim() + "%", "%" + manufacturer.trim() + "%", pageable);
    }

    @Override
    public CCDC getById(int id) {
        return iccdcRepository.findById(id).get();
    }

    @Override
    public void saveCCDC(CCDC ccdc) {
        iccdcRepository.save(ccdc);
    }
}
