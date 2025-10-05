const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Persona = require('./model');

const app = express();

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://toledo:123@mongo:27017/CrudUsuarios?authSource=admin';

mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000
})
.then(() => console.log('Conectado a MongoDB - Base de datos'))
.catch(e => console.error('Error conexión MongoDB:', e));

const handleValidationError = (error) => {
    const errors = {};
    Object.keys(error.errors).forEach(key => {
        errors[key] = {
            message: error.errors[key].message
        };
    });
    return errors;
};

// Crear
app.post('/', async (req, res) => {
    try {
        // Limpiar datos de entrada
        if (req.body.dni) req.body.dni = req.body.dni.trim();
        if (req.body.nombres) req.body.nombres = req.body.nombres.trim();
        if (req.body.apellidos) req.body.apellidos = req.body.apellidos.trim();

        const persona = new Persona(req.body);
        await persona.save();
        res.status(201).json(persona);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                errors: {
                    dni: { message: 'El DNI ingresado ya se encuentra registrado.' }
                }
            });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                errors: handleValidationError(error)
            });
        }
        console.error('Error interno:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});


// Obtener todas las personas
app.get('/', async (req, res) => {
    try {
        const personas = await Persona.find();
        res.json(personas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener persona por ID 
app.get('/:id', async (req, res) => {
    try {
        const persona = await Persona.findById(req.params.id);
        if (!persona) return res.status(404).json({ message: 'No encontrado' });
        res.json(persona);
    } catch (error) {
        res.status(400).json({ message: 'Id inválido' });
    }
});

// actualizar
app.put('/:id', async (req, res) => {
    try {
        const persona = await Persona.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } 
        );
        if (!persona) return res.status(404).json({ message: 'No encontrado' });
        res.json(persona);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: 'El DNI ingresado ya pertenece a otra persona.' });
        }
        
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Eliminar persona por ID
app.delete('/:id', async (req, res) => {
    try {
        const persona = await Persona.findByIdAndDelete(req.params.id);
        if (!persona) return res.status(404).json({ message: 'No encontrado' });
        res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'Id inválido' });
    }
});

const PORT = 3000;
const HOST = '0.0.0.0'; 

app.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}/`);
});
