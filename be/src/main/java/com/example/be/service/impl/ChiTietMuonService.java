package com.example.be.service.impl;

import com.example.be.entity.ChiTietMuon;
import com.example.be.repository.IChiTietMuonRepository;
import com.example.be.service.IChiTietMuonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChiTietMuonService implements IChiTietMuonService {
    @Autowired
    IChiTietMuonRepository chiTietMuonRepository;
    @Override
    public void save(ChiTietMuon chiTietMuon) {
        chiTietMuonRepository.save(chiTietMuon);
    }
}
