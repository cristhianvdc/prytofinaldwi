# Athletix Sports

Athletix Sports es un sistema web de tienda de ropa deportiva desarrollado como proyecto academico. Permite a los clientes explorar productos, seleccionar variantes, agregar productos al carrito, confirmar compras y revisar sus pedidos. Tambien incluye un panel administrativo para gestionar productos, stock, pedidos y mensajes de contacto.

## Tecnologias Utilizadas

### Backend

- Java 17
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- MySQL
- Maven

### Frontend

- Angular
- Bootstrap
- Bootstrap Icons
- TypeScript
- HTML y SCSS

### Base de Datos

- MySQL

## Arquitectura Del Sistema

El sistema utiliza una arquitectura cliente-servidor basada en API REST.

```text
Cliente / Navegador
        |
        v
Frontend Angular
        |
        v
API REST Spring Boot
        |
        v
Servicios + Repositorios
        |
        v
JPA / Hibernate
        |
        v
Base de datos MySQL
```

El frontend se comunica con el backend mediante peticiones HTTP. El backend procesa la logica de negocio, valida datos, protege rutas con JWT y persiste la informacion en MySQL usando JPA/Hibernate.

## Roles Del Sistema

### Cliente

El cliente puede:

- Registrarse e iniciar sesion.
- Ver el catalogo de productos.
- Buscar productos.
- Filtrar por categorias.
- Ver detalle de producto.
- Seleccionar variantes por talla y color.
- Agregar productos al carrito.
- Confirmar compra desde checkout.
- Editar sus datos personales.
- Cambiar su contrasena.
- Revisar sus pedidos.

### Administrador

El administrador puede:

- Acceder al panel administrativo.
- Ver metricas generales.
- Crear productos.
- Editar productos.
- Subir imagenes de productos.
- Gestionar stock.
- Configurar precio de compra y venta.
- Agregar variantes por talla, color, precio y stock.
- Marcar productos como activos u ocultos.
- Marcar productos como destacados.
- Revisar pedidos.
- Cambiar el estado de pedidos.
- Ver mensajes enviados desde el formulario de contacto.

## Funcionalidades Principales

- Autenticacion con JWT.
- Registro e inicio de sesion.
- Control de roles `ADMIN` y `CLIENT`.
- Catalogo de productos.
- Productos con imagenes.
- Productos destacados en la pagina principal.
- Variantes de producto por talla, color, precio y stock.
- Carrito de compras.
- Checkout con datos del perfil del usuario.
- Registro de pedidos en base de datos.
- Estado inicial de pedido: `En revision`.
- Panel administrativo.
- CRUD de productos.
- Cambio de estado de pedidos.
- Perfil de usuario.
- Formulario de contacto guardado en base de datos.

## Estructura Del Proyecto

```text
Proyecto tienda de ropa/
├── backend/
│   ├── src/main/java/com/athletix/sports/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── exception/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── security/
│   │   └── service/
│   └── pom.xml
│
├── frontend/
│   ├── src/app/
│   │   ├── core/
│   │   ├── pages/
│   │   └── shared/
│   └── package.json
│
└── docker-compose.yml
```

## Requisitos Para Ejecutar El Proyecto

- Java 17 o superior
- Maven
- Node.js
- Angular CLI
- MySQL

Docker no es obligatorio. El proyecto puede ejecutarse usando MySQL instalado localmente.

## Configuracion De Base De Datos

Crear una base de datos en MySQL:

```sql
CREATE DATABASE athletix_sports;
```

El backend puede crear o actualizar las tablas automaticamente mediante JPA/Hibernate.

## Ejecutar Backend Con MySQL Local

Entrar a la carpeta del backend:

```bash
cd backend
```

Ejecutar el proyecto indicando la conexion a MySQL local:

```bash
DB_URL="jdbc:mysql://localhost:3306/athletix_sports?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC" \
DB_USERNAME="root" \
DB_PASSWORD="TU_PASSWORD_MYSQL" \
./mvnw spring-boot:run
```

En Windows PowerShell:

```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/athletix_sports?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="TU_PASSWORD_MYSQL"
./mvnw spring-boot:run
```

Si no se usa Maven Wrapper:

```bash
mvn spring-boot:run
```

El backend se ejecuta en:

```text
http://localhost:8080
```

## Ejecutar Frontend

Entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Iniciar Angular en modo desarrollo:

```bash
npm run dev
```

El frontend se ejecuta en:

```text
http://localhost:4200
```

## Despliegue En La Nube

El sistema se encuentra desplegado en Railway con servicios separados para frontend, backend y base de datos MySQL.

### URLs De Produccion

```text
Frontend: https://athletix-frontend-production.up.railway.app
Backend:  https://athletix-backend-production-bbfd.up.railway.app
API:      https://athletix-backend-production-bbfd.up.railway.app/api
```

### Variables Principales En Railway

Backend:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
JWT_SECRET
FRONTEND_ORIGIN
UPLOAD_DIR
```

Frontend:

```text
API_ORIGIN
```

El backend utiliza un volumen persistente montado en `/data` y guarda imagenes subidas en `/data/uploads`.

## Ejecucion Opcional Con Docker

El archivo `docker-compose.yml` se incluye como ayuda opcional para levantar MySQL rapidamente. No es obligatorio para ejecutar el sistema.

Desde la raiz del proyecto:

```bash
docker compose up -d mysql
```

En esta configuracion, MySQL queda expuesto en el puerto:

```text
localhost:3307
```

Luego se puede iniciar el backend normalmente con la configuracion por defecto del proyecto.

## Credenciales De Prueba

El sistema crea usuarios demo al iniciar por primera vez.

### Administrador

```text
Correo: admin@athletix.com
Contrasena: Admin12345
```

### Cliente

```text
Correo: cliente@athletix.com
Contrasena: Cliente12345
```

## Endpoints Principales

### Autenticacion

```text
POST /api/auth/register
POST /api/auth/login
```

### Productos Publicos

```text
GET /api/products
GET /api/products/{id}
GET /api/products/slug/{slug}
```

### Administracion De Productos

```text
GET    /api/admin/products
POST   /api/admin/products
PUT    /api/admin/products/{id}
DELETE /api/admin/products/{id}
```

### Pedidos

```text
POST /api/orders
GET  /api/orders/mine
```

### Administracion De Pedidos

```text
GET   /api/admin/orders
PATCH /api/admin/orders/{id}/status
```

### Perfil De Usuario

```text
GET /api/me
PUT /api/me
PUT /api/me/password
```

### Contacto

```text
POST /api/contact
GET  /api/admin/messages
```

## Manual Basico De Usuario

1. Ingresar a la tienda.
2. Explorar el catalogo o buscar productos.
3. Abrir el detalle de un producto.
4. Seleccionar talla, color y cantidad si el producto tiene variantes.
5. Agregar al carrito.
6. Ir al carrito.
7. Iniciar sesion o registrarse.
8. Confirmar compra en checkout.
9. Revisar el estado del pedido desde `Mi cuenta`.

## Manual Basico De Administrador

1. Iniciar sesion con cuenta de administrador.
2. Entrar al panel `Admin`.
3. Revisar metricas generales.
4. Gestionar productos desde `Productos`.
5. Crear o editar productos.
6. Agregar imagen, categoria, stock, precio y variantes.
7. Revisar pedidos desde `Pedidos`.
8. Cambiar el estado del pedido de `En revision` a `Confirmado`, `Enviado`, `Entregado` o `Cancelado`.
9. Revisar mensajes de contacto desde el panel.

## Seguridad

El sistema implementa seguridad con Spring Security y JWT.

- Las contrasenas se almacenan cifradas con BCrypt.
- El login genera un token JWT.
- Angular envia el token en las peticiones protegidas mediante un interceptor.
- Las rutas administrativas requieren rol `ADMIN`.
- Las rutas de perfil, checkout y pedidos requieren autenticacion.

## Buenas Practicas Aplicadas

- Separacion entre frontend y backend.
- Arquitectura por capas en backend.
- Uso de DTOs para entrada y salida de datos.
- Servicios Angular separados por responsabilidad.
- Guards para proteger rutas.
- Interceptor para JWT.
- Validaciones en frontend y backend.
- Manejo global de errores en backend.
- Componentes organizados por paginas.
- Persistencia con JPA/Hibernate.

## Posibles Mejoras Futuras

- Documentacion Swagger/OpenAPI para endpoints.
- Pruebas unitarias e integracion mas completas.
- Pasarela de pagos.
- Historial detallado de estados de pedido.
- Recuperacion de contrasena por correo.
- Notificaciones por email.
- Migraciones con Flyway o Liquibase.

## Estado Del Proyecto

El sistema se encuentra funcional para ejecucion local y cubre los modulos principales de una tienda web:

- Cliente
- Administrador
- Productos
- Variantes
- Carrito
- Checkout
- Pedidos
- Contacto
- Seguridad
- Persistencia en MySQL
