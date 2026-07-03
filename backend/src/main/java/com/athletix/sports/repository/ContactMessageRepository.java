package com.athletix.sports.repository;

import com.athletix.sports.model.ContactMessage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findTop20ByOrderByCreatedAtDesc();
}
