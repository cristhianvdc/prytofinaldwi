package com.athletix.sports.service;

import com.athletix.sports.dto.DashboardStatsResponse;
import com.athletix.sports.model.Role;
import com.athletix.sports.repository.ContactMessageRepository;
import com.athletix.sports.repository.OrderRepository;
import com.athletix.sports.repository.ProductRepository;
import com.athletix.sports.repository.UserRepository;
import java.math.BigDecimal;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ContactMessageRepository contactRepository;

    public DashboardService(ProductRepository productRepository, UserRepository userRepository,
                            OrderRepository orderRepository, ContactMessageRepository contactRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.contactRepository = contactRepository;
    }

    public DashboardStatsResponse stats() {
        long lowStock = productRepository.findAll().stream()
                .filter(product -> product.getStock() <= product.getMinimumStock())
                .count();
        BigDecimal revenue = orderRepository.totalRevenue();
        return new DashboardStatsResponse(productRepository.count(), userRepository.countByRole(Role.CLIENT),
                orderRepository.count(), contactRepository.count(), revenue, lowStock);
    }
}
