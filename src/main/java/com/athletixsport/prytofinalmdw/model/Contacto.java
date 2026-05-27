package com.athletixsport.prytofinalmdw.model;

public class Contacto {
    private String nombre;
    private String email;
    private String telefono;
    private String asunto;
    private String mensaje;
    private boolean recibirOfertas;

    // Constructores, getters y setters
    public Contacto() {}

    // getters y setters para cada atributo:
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getAsunto() { return asunto; }
    public void setAsunto(String asunto) { this.asunto = asunto; }

    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }

    public boolean isRecibirOfertas() { return recibirOfertas; }
    public void setRecibirOfertas(boolean recibirOfertas) { this.recibirOfertas = recibirOfertas; }
}