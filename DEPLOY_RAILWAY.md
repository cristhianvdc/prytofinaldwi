# Despliegue en Railway paso a paso

Esta guia asume que vas a desplegar todo en Railway:

- MySQL
- Backend Spring Boot
- Frontend Angular

Railway recomienda crear servicios desde GitHub y, para proyectos tipo monorepo, configurar el root directory de cada servicio.

## 1. Antes de Railway

1. Sube este proyecto a GitHub.
2. Asegurate de subir estos archivos nuevos:
   - `backend/railway.toml`
   - `frontend/railway.toml`
   - `frontend/scripts/write-env.mjs`
   - `frontend/src/assets/env.js`
3. No subas archivos `.env` con claves reales.

## 2. Crear proyecto en Railway

1. Entra a `https://railway.com`.
2. Crea una cuenta o inicia sesion.
3. Click en `New Project`.
4. Elige `Deploy from GitHub repo`.
5. Conecta tu GitHub y selecciona este repositorio.

Si Railway crea un solo servicio al inicio, esta bien. Luego puedes agregar los otros.

## 3. Agregar MySQL

1. Dentro del proyecto en Railway, click en `+ New`.
2. Elige `Database`.
3. Elige `MySQL`.
4. Espera a que el servicio de MySQL termine de desplegar.

Railway crea variables como `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD` y `MYSQLDATABASE`.

## 4. Backend Spring Boot

1. Crea o abre el servicio del backend.
2. Ve a `Settings`.
3. En `Source`, configura:
   - Root Directory: `/backend`
4. Verifica que Railway use el archivo:
   - `/backend/railway.toml`
5. Ve a `Variables`.
6. Agrega estas variables:

```text
DB_URL=jdbc:mysql://${{MySQL.MYSQLHOST}}:${{MySQL.MYSQLPORT}}/${{MySQL.MYSQLDATABASE}}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USERNAME=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
JWT_SECRET=pon_aqui_una_clave_larga_y_random
FRONTEND_ORIGIN=https://URL_DEL_FRONTEND
UPLOAD_DIR=/data/uploads
```

Importante: si tu servicio de MySQL no se llama `MySQL`, reemplaza `MySQL` por el nombre real del servicio en Railway.

7. Ve a `Settings`.
8. Busca `Networking`.
9. Click en `Generate Domain`.
10. Copia la URL del backend. Debe verse parecido a:

```text
https://athletix-backend-production.up.railway.app
```

## 5. Volumen para imagenes subidas

Esto evita que las imagenes subidas desde el admin se pierdan en redeploys.

1. Abre el servicio del backend.
2. Ve a `Settings`.
3. Busca `Volumes`.
4. Crea un volumen.
5. Mount path:

```text
/data
```

6. Mantén en variables:

```text
UPLOAD_DIR=/data/uploads
```

## 6. Frontend Angular

1. Crea otro servicio desde el mismo repo de GitHub.
2. Ve a `Settings`.
3. En `Source`, configura:
   - Root Directory: `/frontend`
4. Verifica que Railway use el archivo:
   - `/frontend/railway.toml`
5. Ve a `Variables`.
6. Agrega:

```text
API_ORIGIN=https://URL_DEL_BACKEND
```

Ejemplo:

```text
API_ORIGIN=https://athletix-backend-production.up.railway.app
```

No pongas `/api` al final. El frontend ya lo agrega solo.

7. Ve a `Settings`.
8. Busca `Networking`.
9. Click en `Generate Domain`.
10. Copia la URL del frontend.

## 7. Volver al backend y arreglar CORS

Ahora que ya tienes la URL real del frontend:

1. Abre el servicio del backend.
2. Ve a `Variables`.
3. Edita:

```text
FRONTEND_ORIGIN=https://URL_DEL_FRONTEND
```

Ejemplo:

```text
FRONTEND_ORIGIN=https://athletix-frontend-production.up.railway.app
```

4. Redeploy del backend.

## 8. Orden recomendado

Hazlo en este orden para no marearte:

1. MySQL
2. Backend
3. Generar dominio del backend
4. Frontend con `API_ORIGIN`
5. Generar dominio del frontend
6. Actualizar `FRONTEND_ORIGIN` en backend
7. Probar la app

## 9. Pruebas finales

1. Abre la URL del frontend.
2. Entra al catalogo.
3. Registra un usuario.
4. Inicia sesion.
5. Agrega un producto al carrito.
6. Haz checkout.
7. Entra como admin y revisa productos/pedidos.

Si algo falla, revisa en Railway:

- Servicio backend -> `Deployments` -> `View Logs`
- Servicio frontend -> `Deployments` -> `View Logs`
- Variables escritas sin espacios extra
- Que `API_ORIGIN` no tenga `/api`
- Que `FRONTEND_ORIGIN` sea exactamente la URL del frontend
