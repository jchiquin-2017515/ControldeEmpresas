const TipoEmpresa = require('../models/tipo');

const esTipoValido = async( tipo = '' ) => {

    const existeTipo = await TipoEmpresa.findOne( { tipo } );

    if ( !existeTipo ) {
        throw new Error(`El tipo de empresa ${ tipo } no está registrado en la DB`);
    }

}

module.exports = {
    esTipoValido
}