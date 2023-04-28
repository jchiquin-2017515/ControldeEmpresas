const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    telefono: {
        type: String,
    },
    tipoEmpresa: {
        type: String,
        required: [true, 'El tipo de empresa es obligatorio']
    },
    sucursal: [{
        type: Schema.Types.ObjectId,
        ref: 'Sucursale',
        required: [true, 'La sucursal de la empresa es obligatorio']
    }],
    estado: {
        type: Boolean,
        default: true
    },
});


module.exports = model('Empresa', EmpresaSchema);