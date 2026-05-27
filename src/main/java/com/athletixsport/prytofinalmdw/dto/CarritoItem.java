package com.athletixsport.prytofinalmdw.dto;

import java.io.Serializable;

public class CarritoItem implements Serializable {

    private Integer idProducto;
    private String nombre;
    private Integer idCategoria;
    private String nombreCategoria;
    private String talla;
    private String color;
    private int cantidad;
    private double precio;
    private String imagenUrl;

    public CarritoItem() {
    }

    public CarritoItem(Integer idProducto, String nombre, Integer idCategoria, String nombreCategoria,
            String talla, String color, int cantidad, double precio, String imagenUrl) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.idCategoria = idCategoria;
        this.nombreCategoria = nombreCategoria;
        this.talla = talla;
        this.color = color;
        this.cantidad = cantidad;
        this.precio = precio;
        this.imagenUrl = imagenUrl;
    }

    public Integer getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Integer idCategoria) {
        this.idCategoria = idCategoria;
    }

    public String getNombreCategoria() {
        return nombreCategoria;
    }

    public void setNombreCategoria(String nombreCategoria) {
        this.nombreCategoria = nombreCategoria;
    }

    public String getTalla() {
        return talla;
    }

    public void setTalla(String talla) {
        this.talla = talla;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public double getSubtotal() {
        return cantidad * precio;
    }
}
