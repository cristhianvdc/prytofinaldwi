package com.athletix.sports.controller;

import com.athletix.sports.dto.ContactResponse;
import com.athletix.sports.dto.DashboardStatsResponse;
import com.athletix.sports.dto.OrderResponse;
import com.athletix.sports.dto.UpdateOrderStatusRequest;
import com.athletix.sports.service.ContactService;
import com.athletix.sports.service.DashboardService;
import com.athletix.sports.service.OrderService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {
    private final DashboardService dashboardService;
    private final OrderService orderService;
    private final ContactService contactService;

    public AdminDashboardController(DashboardService dashboardService, OrderService orderService, ContactService contactService) {
        this.dashboardService = dashboardService;
        this.orderService = orderService;
        this.contactService = contactService;
    }

    @GetMapping("/stats")
    public DashboardStatsResponse stats() {
        return dashboardService.stats();
    }

    @GetMapping("/orders")
    public List<OrderResponse> orders() {
        return orderService.all();
    }

    @PatchMapping("/orders/{id}/status")
    public OrderResponse updateOrderStatus(@PathVariable Long id, @Valid @RequestBody UpdateOrderStatusRequest request) {
        return orderService.updateStatus(id, request);
    }

    @GetMapping("/messages")
    public List<ContactResponse> messages() {
        return contactService.latest();
    }
}
