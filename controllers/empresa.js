const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal');



const postEmpresa = async (req = request, res = response) => {

    const { nombre, direccion, password, tipoEmpresa, sucursal, correo } = req.body;
    const empresaGuardadaDB = new Empresa({ nombre, direccion, password, tipoEmpresa, sucursal, correo });

    for (const sucursalId of sucursal) {
        if (!mongoose.Types.ObjectId.isValid(sucursalId)) {
            return res.status(400).json({
                msg: `La ID "${sucursalId}" en el array de sucursal no es válida`
            });
        }
    }

    try {

        const salt = bcrypt.genSaltSync();
        empresaGuardadaDB.password = bcrypt.hashSync(password, salt);

        await empresaGuardadaDB.save();

        res.json({
            msg: 'Post Api - Post Empresa',
            empresaGuardadaDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error'
        });
    }
}


const putEmpresa = async (req = request, res = response) => {

    const { estado, ...resto } = req.body;
    const idToken = req.empresa.id;

    for (const sucursalId of resto.sucursal) {
        if (!mongoose.Types.ObjectId.isValid(sucursalId)) {
            return res.status(400).json({
                msg: `La ID "${sucursalId}" en el array de sucursal no es válida`
            });
        }
    }

    if (resto.password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const empresaEditada = await Empresa.findByIdAndUpdate(idToken, resto);

    res.json({
        msg: 'PUT editar user',
        empresaEditada
    });
}

const deleteEmpresa = async (req = request, res = response) => {

    const idToken = req.empresa.id;
    const empresaEliminada = await Empresa.findByIdAndUpdate(idToken, { estado: false, sucursal: [] });

    res.json({
        msg: 'DELETE eliminar user',
        empresaEliminada
    });
}

module.exports = {
    postEmpresa,
    putEmpresa,
    deleteEmpresa
}