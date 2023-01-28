const dbValidators = require('./db-validators')
const generarJWT   = require('./generar-jwt')
const googleVerify = require('./google-verify')
const subirArchivo = require('./subir-archivos')

//anteponiendo ... se exportan todas las propiedades y metodos que contenga los arhcivos
module.exports={
...dbValidators,
...generarJWT,
...googleVerify,
...subirArchivo
}