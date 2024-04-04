package com.example.be.service;

import com.example.be.entity.NhanVien;

import java.util.List;

public interface INhanVienService {
    List<NhanVien> findAllNhanVien();
    NhanVien getEmployeeById(int id);
}
