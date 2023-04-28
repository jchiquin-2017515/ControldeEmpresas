const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Sucursal = require('../models/sucursal');



const postSucursal = async (req = request, res = response) => {

    const { nombre, municipio, direccion } = req.body;
    const sucursalGuardadaDB = new Sucursal({ nombre, municipio, direccion });
    
    await sucursalGuardadaDB.save();

    res.json({
        msg: 'Post Api - Post sucursal',
        sucursalGuardadaDB
    });
}


const putSucursal = async (req = request, res = response) => {

    const { id } = req.params;
    const { ...resto } = req.body;

    const sucursalEditada = await Sucursal.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar user',
        sucursalEditada
    });
}

const deleteSucursal = async (req = request, res = response) => {

    const { id } = req.params;
    const sucursalEliminada = await Sucursal.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar user',
        sucursalEliminada
    });
}

module.exports = {
    postSucursal,
    putSucursal,
    deleteSucursal
}