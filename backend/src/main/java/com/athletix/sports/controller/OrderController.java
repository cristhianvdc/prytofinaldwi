package com.athletix.sports.controller;

import com.athletix.sports.dto.OrderRequest;
import com.athletix.sports.dto.OrderResponse;
import com.athletix.sports.service.OrderService;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public OrderResponse create(Principal principal, @Valid @RequestBody OrderRequest request) {
        return orderService.create(principal.getName(), request);
    }

    @GetMapping("/mine")
    public List<OrderResponse> mine(Principal principal) {
        return orderService.myOrders(principal.getName());
    }
}
