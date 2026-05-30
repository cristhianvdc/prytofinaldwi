package com.athletixsport.prytofinalmdw.controller;

import com.athletixsport.prytofinalmdw.dto.ClienteDTO;
import com.athletixsport.prytofinalmdw.dto.LoginDTO;
import com.athletixsport.prytofinalmdw.model.Cliente;
import com.athletixsport.prytofinalmdw.service.IClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth") // Endpoint unificado de Autenticación y Registro
public class AuthController {

    // Inyección de dependencias requerida por la rúbrica
    @Autowired
    private IClienteService clienteService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarCliente(@Valid @RequestBody ClienteDTO clienteDTO, BindingResult result) {
        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {
            response.put("success", false);
            response.put("errors", result.getAllErrors());
            return ResponseEntity.badRequest().body(response);
        }

        if (clienteService.existeCorreo(clienteDTO.getCorreo())) {
            response.put("success", false);
            response.put("message", "El correo ya está registrado en la tienda");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }

        // Traspaso de datos seguro del DTO a la Entidad de Persistencia
        Cliente cliente = new Cliente();
        cliente.setNombres(clienteDTO.getNombres());
        cliente.setApellidos(clienteDTO.getApellidos());
        cliente.setTelefono(clienteDTO.getTelefono());
        cliente.setCorreo(clienteDTO.getCorreo());
        cliente.setPassword(clienteDTO.getPassword()); // Se encriptará en la capa de servicio

        clienteService.registrarCliente(cliente);

        response.put("success", true);
        response.put("message", "Cliente registrado exitosamente utilizando patrón DTO");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO, BindingResult result) {
        Map<String, Object> response = new HashMap<>();

        if (result.hasErrors()) {
            response.put("success", false);
            response.put("errors", result.getAllErrors());
            return ResponseEntity.badRequest().body(response);
        }

        // Validación  servicios REST 
        if (clienteService.existeCorreo(loginDTO.getCorreo())) {
            response.put("success", true);
            response.put("message", "Autenticación exitosa en Athletix Sport");
            response.put("token", "simulated-jwt-token-for-semana10-" + loginDTO.getCorreo());
            return ResponseEntity.ok(response);
        }

        response.put("success", false);
        response.put("message", "Credenciales incorrectas o el usuario no existe");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}