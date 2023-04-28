const { Router } = require('express');
const { check } = require('express-validator');
const { postSucursal, putSucursal, deleteSucursal } = require('../controllers/sucursal');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('municipio', 'La sucursal es obligatoria').not().isEmpty(),
    validarCampos,
] ,postSucursal);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
] ,putSucursal);

router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
] ,deleteSucursal);

module.exports = router;