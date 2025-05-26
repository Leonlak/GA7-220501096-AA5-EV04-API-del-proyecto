// Importación de módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

// Creación de la aplicación Express
const app = express();
const port = 3000;

// Middleware para procesar JSON en las peticiones
app.use(bodyParser.json());

// Base de datos simulada (en memoria)
const users = [];

// CREATE - Crear un nuevo usuario
app.post('/users', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Validación de datos de entrada
        if (!username || !password || !email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Usuario, contraseña y email son requeridos' 
            });
        }

        // Verificar si el usuario ya existe
        if (users.find(user => user.username === username)) {
            return res.status(400).json({ 
                success: false, 
                message: 'El usuario ya existe' 
            });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword,
            email,
            createdAt: new Date()
        };

        // Guardar el usuario
        users.push(newUser);

        // Retornar usuario creado (sin la contraseña)
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json({ 
            success: true, 
            message: 'Usuario creado exitosamente',
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor' 
        });
    }
});

// READ - Obtener todos los usuarios
app.get('/users', (req, res) => {
    try {
        // Retornar usuarios sin contraseñas
        const usersWithoutPasswords = users.map(({ password, ...user }) => user);
        res.json({
            success: true,
            users: usersWithoutPasswords
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor' 
        });
    }
});

// READ - Obtener un usuario específico
app.get('/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Retornar usuario sin contraseña
        const { password, ...userWithoutPassword } = user;
        res.json({
            success: true,
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor' 
        });
    }
});

// UPDATE - Actualizar un usuario
app.put('/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { username, password, email } = req.body;

        // Buscar el usuario
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Actualizar campos
        if (username) users[userIndex].username = username;
        if (email) users[userIndex].email = email;
        if (password) {
            users[userIndex].password = await bcrypt.hash(password, 10);
        }

        // Retornar usuario actualizado sin contraseña
        const { password: _, ...updatedUser } = users[userIndex];
        res.json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor' 
        });
    }
});

// DELETE - Eliminar un usuario
app.delete('/users/:id', (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        // Eliminar usuario
        users.splice(userIndex, 1);

        res.json({
            success: true,
            message: 'Usuario eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor' 
        });
    }
});

// Ruta para inicio de sesión
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validación de datos de entrada
        if (!username || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Usuario y contraseña son requeridos' 
            });
        }

        // Buscar el usuario
        const user = users.find(user => user.username === username);
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Error en la autenticación' 
            });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ 
                success: false, 
                message: 'Error en la autenticación' 
            });
        }

        // Retornar usuario sin contraseña
        const { password: _, ...userWithoutPassword } = user;
        res.json({ 
            success: true, 
            message: 'Autenticación satisfactoria',
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor' 
        });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
}); 