package com.example.be.controller;

import com.example.be.entity.CCDC;
import com.example.be.entity.ChiTietMuon;
import com.example.be.service.ICCDCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api-ccdc")
public class CCDCRestController {
    @Autowired
    private ICCDCService iccdcService;

    @GetMapping("/list")
    public ResponseEntity<Page<CCDC>> getCCDCList(@RequestParam(defaultValue = "") String searchName,
                                                  @RequestParam(defaultValue = "") String searchManu,
                                                  @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 2);
        Page<CCDC> ccdcPage = iccdcService.searchCCDCByNameAndManufacturer(searchName, searchManu, pageable);
        if (ccdcPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(ccdcPage, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCCDC(@RequestBody CCDC ccdc) {
        iccdcService.saveCCDC(ccdc);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
