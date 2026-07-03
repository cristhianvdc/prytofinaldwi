package com.athletix.sports.dto;

import java.math.BigDecimal;

public record DashboardStatsResponse(
        long products,
        long clients,
        long orders,
        long messages,
        BigDecimal revenue,
        long lowStock
) {
}
