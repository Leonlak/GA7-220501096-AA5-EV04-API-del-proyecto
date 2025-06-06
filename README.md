# Servicio Web de Autenticación y Gestión de Usuarios

Este es un servicio web para registro, inicio de sesión y gestión de usuarios.

## Requisitos

- Node.js
- npm (Node Package Manager)

## Instalación

1. Instalar las dependencias:
```bash
npm install
```

2. Iniciar el servidor:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints

### Autenticación

#### Inicio de Sesión
- **URL**: `/login`
- **Método**: POST
- **Body**:
```json
{
    "username": "usuario",
    "password": "contraseña"
}
```

### Gestión de Usuarios (CRUD)

#### Crear Usuario
- **URL**: `/users`
- **Método**: POST
- **Body**:
```json
{
    "username": "usuario",
    "password": "contraseña",
    "email": "usuario@ejemplo.com"
}
```

#### Obtener Todos los Usuarios
- **URL**: `/users`
- **Método**: GET

#### Obtener Usuario Específico
- **URL**: `/users/:id`
- **Método**: GET
- **Parámetros**: `id` (ID del usuario)

#### Actualizar Usuario
- **URL**: `/users/:id`
- **Método**: PUT
- **Parámetros**: `id` (ID del usuario)
- **Body**:
```json
{
    "username": "nuevo_usuario",
    "password": "nueva_contraseña",
    "email": "nuevo@ejemplo.com"
}
```

#### Eliminar Usuario
- **URL**: `/users/:id`
- **Método**: DELETE
- **Parámetros**: `id` (ID del usuario)

## Respuestas

### Éxito
```json
{
    "success": true,
    "message": "Operación exitosa",
    "user": {
        "id": 1,
        "username": "usuario",
        "email": "usuario@ejemplo.com",
        "createdAt": "2024-03-14T12:00:00.000Z"
    }
}
```

### Error
```json
{
    "success": false,
    "message": "Mensaje de error"
}
``` #   G A 7 - 2 2 0 5 0 1 0 9 6 - A A 5 - E V 0 4 - A P I - d e l - p r o y e c t o  
 