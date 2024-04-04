package com.example.be.service.impl;


import com.example.be.entity.NhanVien;
import com.example.be.repository.INhanVienRepository;
import com.example.be.service.INhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NhanVienService implements INhanVienService {
    @Autowired
    private INhanVienRepository nhanVienRepository;

    @Override
    public List<NhanVien> findAllNhanVien() {
        return nhanVienRepository.findAll();
    }

    @Override
    public NhanVien getEmployeeById(int id) {
        return nhanVienRepository.findById(id).get();
    }
}
