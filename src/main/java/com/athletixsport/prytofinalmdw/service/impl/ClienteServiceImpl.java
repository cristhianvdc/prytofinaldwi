package com.athletixsport.prytofinalmdw.service.impl;

import com.athletixsport.prytofinalmdw.model.Cliente;
import com.athletixsport.prytofinalmdw.repository.IClienteRepository;
import com.athletixsport.prytofinalmdw.service.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; // <- Importación fundamental para la seguridad
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl implements IClienteService {

    private IClienteRepository clienteRepository;

    // 1. Inyección del encriptador BCrypt definido en tu configuración de seguridad
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setClienteRepository(IClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public void registrarCliente(Cliente cliente) {
        // 2. Extraemos la contraseña en texto plano, la encriptamos y la volvemos a setear
        String passwordEncriptado = passwordEncoder.encode(cliente.getPassword());
        cliente.setPassword(passwordEncriptado);

        // 3. Guardamos el cliente con la contraseña ya protegida en la base de datos
        clienteRepository.save(cliente);
    }

    @Override
    public boolean existeCorreo(String correo) {
        return clienteRepository.existsByCorreo(correo);
    }
}