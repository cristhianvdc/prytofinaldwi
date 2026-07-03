package com.athletix.sports.controller;

import com.athletix.sports.dto.ContactRequest;
import com.athletix.sports.dto.ContactResponse;
import com.athletix.sports.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ContactResponse create(@Valid @RequestBody ContactRequest request) {
        return contactService.create(request);
    }
}
