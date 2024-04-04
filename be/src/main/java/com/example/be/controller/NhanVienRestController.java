package com.example.be.controller;

import com.example.be.entity.CCDC;
import com.example.be.entity.NhanVien;
import com.example.be.service.INhanVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api-employee")
public class NhanVienRestController {
    @Autowired
    private INhanVienService nhanVienService;
    @GetMapping("/list")
    public ResponseEntity<List<NhanVien>> getEmployeeList(){
        List<NhanVien> nhanVienList = nhanVienService.findAllNhanVien();
        if(nhanVienList.isEmpty()){
            return new ResponseEntity<>(nhanVienList,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(nhanVienList,HttpStatus.OK);
    }
}
