const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;

const Sucursal = require('../models/sucursal');

const coleccionesPermitidas = [
    'sucursales'
];


const buscarSucursal = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {
        const sucursal = await Sucursal.findById(termino);
        return res.json({
            results: ( sucursal ) ? [ sucursal ] : [] 
        });
    } 

    const regex = new RegExp( termino, 'i');

    const sucursales = await Sucursal.find({
        $or: [ { nombre: regex }, { municipio: regex } ],
        $and: [ { estado: true } ]
    });

    res.json({
        results: sucursales
    })

}


const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `La colección: ${ coleccion } no existe en la DB
                  Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }

    switch (coleccion) {
        case 'sucursales':
            buscarSucursal(termino, res);
        break;
        default:
            res.status(500).json({
                msg: 'Esta busqueda no existe'
            });
        break;
    }
}

module.exports = {
    buscar
}