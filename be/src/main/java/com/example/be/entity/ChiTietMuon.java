package com.example.be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietMuon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date ngayMuon;
    private Date ngayTra;
    private int soLuongMuon;
    @ManyToOne
    @JoinColumn(name = "ma_ccdc",referencedColumnName = "id")
    private CCDC ccdc;
    @ManyToOne
    @JoinColumn(name = "ma_nhan_vien",referencedColumnName = "id")
    private NhanVien nhanVien;
}
