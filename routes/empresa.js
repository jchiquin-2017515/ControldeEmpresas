const { Router } = require('express');
const { check } = require('express-validator');
const { postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/empresa');
const { esTipoValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/agregar', [
    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('sucursal', 'La sucursal es obligatoria').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('tipoEmpresa').custom( esTipoValido ),
    validarCampos,
] ,postEmpresa);

router.put('/editar', [
    validarJWT,
    check('tipoEmpresa').custom(  esTipoValido ),
    validarCampos
] ,putEmpresa);

router.delete('/eliminar', [
    validarJWT,
    validarCampos
] ,deleteEmpresa);

module.exports = router;