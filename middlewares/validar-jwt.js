const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
const validarJWT=async(req = request,res = response,next)=>{
   const token = req.header('token');

   if(!token){
    return res.status(401).json({
        msg:'no hay token en la peticion'
    })
   }
   try {
    const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);
    const usuario= await Usuario.findById(uid);
     if(!usuario){
        return res.status(401).json({
            msg:'token no valido - usuario no existe en base de datos'
        })
     }
    //validar que el uid no esta marcado como eliminado
    if(!usuario.estado){
        return res.status(401).json({
            msg:'token no valido - usuario con estado false'
        })
    }
    req.usuario=usuario;


    next();
   } catch (error) {
    console.log(error);
    res.status(401).json({
        msg:'Token no valido!'
    })
   }
   //console.log(token);
  
}

module.exports={
    validarJWT
}