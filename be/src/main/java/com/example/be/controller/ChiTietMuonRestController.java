package com.example.be.controller;

import com.example.be.entity.CCDC;
import com.example.be.entity.ChiTietMuon;
import com.example.be.entity.NhanVien;
import com.example.be.service.ICCDCService;
import com.example.be.service.IChiTietMuonService;
import com.example.be.service.INhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api-borrow")
public class ChiTietMuonRestController {
    @Autowired
    private IChiTietMuonService chiTietMuonService;
    @Autowired
    private ICCDCService iccdcService;
    @Autowired
    private INhanVienService nhanVienService;

    @PostMapping("/create")
    public ResponseEntity<?> createBorrow(@RequestParam int employeeId,
                                          @RequestParam int ccdcId,
                                          @RequestParam int quantity) {
        ChiTietMuon chiTietMuon = new ChiTietMuon();
        chiTietMuon.setCcdc(iccdcService.getById(ccdcId));
        chiTietMuon.setNhanVien(nhanVienService.getEmployeeById(employeeId));
        chiTietMuon.setSoLuongMuon(quantity);
        chiTietMuon.setNgayMuon(new java.sql.Date(System.currentTimeMillis()));
        chiTietMuonService.save(chiTietMuon);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
