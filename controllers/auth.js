const  {response, json} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req,res = response) => {

    const {correo,password}= req.body;
    try {

        //verificar si el email existe
         const usuario = await Usuario.findOne({correo});
         if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos'
            });
         }
        //verificar si el usuario esta activo en bd
         if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado False'
            });
         
         }

        //Verificar la contraseña
        const validPassword = bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos -password'
            });
         
         }

        //Generar el JWT
         const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Algo salio mal'
        })
    }
  

}

const googleSignIn = async(req , res=response)=>{
const {id_token}=req.body;
try {
    const {nombre,img,correo} = await googleVerify(id_token);
    //si existe el usuario
    let usuario = await Usuario.findOne({correo});
    console.log(usuario);
    if(!usuario){
        //crear usuario si no existe
        const data = {
        nombre,
        correo,
        password:':P',
        img,
        google:true,
        rol:'USER_ROLE',
        };
        usuario= new Usuario(data);
        await usuario.save();
    }

    //si el usuario en DB esta en false
    if(!usuario.estado){
        return res.status(400).json({
            msg:"Hanle con el administrador, usuario bloqueado",
        })
    }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token
    })
} catch (error) {
    console.log(error);
    res.status(400).json({
        ok:false,
        msg:"El token no se pudo verificar: \n" + error
    })
}

}

module.exports={
    login,
    googleSignIn
}