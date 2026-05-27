package com.athletixsport.prytofinalmdw.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 1. Configuración del Encriptador exigido por la rúbrica y modelo de informe
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 2. Definición de Usuarios y Roles en memoria para la entrega de la Semana 10
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        UserDetails admin = User.withUsername("admin")
                .password(encoder.encode("admin123")) // Se encripta usando BCrypt
                .roles("ADMIN")
                .build();

        UserDetails cliente = User.withUsername("comprador")
                .password(encoder.encode("cliente123")) // Se encripta usando BCrypt
                .roles("CLIENTE")
                .build();

        return new InMemoryUserDetailsManager(admin, cliente);
    }

    // 3. Protección y restricción de Endpoints RESTful
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Se deshabilita CSRF para poder interactuar libremente mediante Postman
                .authorizeHttpRequests(auth -> auth
                        // Permite acceso libre para ver el catálogo de productos (Página de Inicio de Athletix Sport)
                        .requestMatchers(HttpMethod.GET, "/api/catalogo/**").permitAll()

                        // Permite que cualquiera pueda enviarte un mensaje de contacto o registrarse como nuevo cliente
                        .requestMatchers("/api/contacto/**", "/api/clientes/registro").permitAll()

                        // Restringe la administración de productos (Crear, Editar, Eliminar) únicamente al ADMIN
                        .requestMatchers("/api/productos/**").hasRole("ADMIN")

                        // Exige autenticación para cualquier interacción con el carrito de compras
                        .requestMatchers("/api/carrito/**").authenticated()

                        // Cualquier otra ruta requiere inicio de sesión
                        .anyRequest().authenticated()
                )
                .httpBasic(withDefaults()); // Utiliza autenticación básica (Usuario y Contraseña por cabecera HTTP)

        return http.build();
    }
}