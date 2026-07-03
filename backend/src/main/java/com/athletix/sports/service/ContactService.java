package com.athletix.sports.service;

import com.athletix.sports.dto.ContactRequest;
import com.athletix.sports.dto.ContactResponse;
import com.athletix.sports.model.ContactMessage;
import com.athletix.sports.repository.ContactMessageRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private final ContactMessageRepository repository;
    private final MapperService mapper;

    public ContactService(ContactMessageRepository repository, MapperService mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public ContactResponse create(ContactRequest request) {
        ContactMessage message = new ContactMessage();
        message.setFullName(request.fullName());
        message.setEmail(request.email());
        message.setSubject(request.subject());
        message.setMessage(request.message());
        return mapper.toContact(repository.save(message));
    }

    public List<ContactResponse> latest() {
        return repository.findTop20ByOrderByCreatedAtDesc().stream().map(mapper::toContact).toList();
    }
}
