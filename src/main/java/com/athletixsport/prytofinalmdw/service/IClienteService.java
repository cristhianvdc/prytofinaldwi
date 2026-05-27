package com.athletixsport.prytofinalmdw.service;

import com.athletixsport.prytofinalmdw.model.Cliente;

public interface IClienteService {

    void registrarCliente(Cliente cliente);

    boolean existeCorreo(String correo);
}
