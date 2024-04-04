package com.example.be.repository;

import com.example.be.entity.CCDC;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ICCDCRepository extends JpaRepository<CCDC,Integer> {
    @Query(value = "select * from ccdc where (ten like :name and hang_san_xuat like :manufacturer )",nativeQuery = true)
    Page<CCDC>searchCCDCByNameAndManufacturer(@Param("name") String name, @Param("manufacturer") String manufacturer, Pageable pageable);
}
