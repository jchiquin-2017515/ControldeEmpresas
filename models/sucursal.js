const { Schema, model } = require('mongoose');

const SucursalSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    direccion: {
        type: String
    },
    municipio: {
        type: String,
        required: [true, 'El municipio es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
});


module.exports = model('Sucursale', SucursalSchema);