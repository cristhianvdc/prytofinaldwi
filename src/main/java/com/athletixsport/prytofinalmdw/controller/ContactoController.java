package com.athletixsport.prytofinalmdw.controller;

import com.athletixsport.prytofinalmdw.model.Contacto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contacto")
public class ContactoController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> procesarFormularioContacto(@RequestBody Contacto contacto) {
        Map<String, Object> response = new HashMap<>();

        response.put("success", true);
        response.put("message", "Gracias por contactarnos, " + contacto.getNombre() + ". Te responderemos pronto.");
        response.put("datosRecibidos", contacto);

        return ResponseEntity.ok(response);
    }
}