package com.athletix.sports.repository;

import com.athletix.sports.model.Order;
import com.athletix.sports.model.User;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserOrderByCreatedAtDesc(User user);

    List<Order> findAllByOrderByCreatedAtDesc();

    @Query("select coalesce(sum(o.total), 0) from Order o")
    BigDecimal totalRevenue();
}
