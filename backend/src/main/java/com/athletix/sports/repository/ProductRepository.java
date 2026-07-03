package com.athletix.sports.repository;

import com.athletix.sports.model.Product;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrueOrderByCreatedAtDesc();

    Optional<Product> findBySlug(String slug);

    List<Product> findByCategoryContainingIgnoreCaseOrNameContainingIgnoreCaseAndActiveTrue(String category, String name);
}
