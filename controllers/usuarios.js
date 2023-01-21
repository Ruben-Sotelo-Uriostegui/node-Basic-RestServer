//para definir el tipo de dato importamos con destructuracion el recurso response del cual nos permite visualizar los metodos de express
const {response}= require('express')
const bcrypt = require('bcryptjs')
//crear instancias de un modelo
const Usuario = require('../models/usuario');

//metodo para peticiones get del usuario 
const usuariosGet=async(req, res=response)=> {
    //obtenemos los query params y asignamos valores por defectos para cuando no son enviados
    //const {apiKey,nombre="No name",page=1,limit=10} = req.query;
   const {limite=5,desde=0}= req.query;
   const query = {estado:true};
   /*  const usuarios= await Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite));
    const total = await Usuario.countDocuments(query); */

     const [total,usuarios]= await Promise.all(
      [
        Usuario.countDocuments(query),
        Usuario.find(query)
       .skip(Number(desde))
       .limit(Number(limite))
    ])
    res.status(201).json({
     total,
     usuarios
    })
  }

  const usuariosPut= async(req, res)=> {
 //aquí leemos propiedades recibidas mediante parámetros de segmento que vienen de la URL
    const {id}= req.params;

    const {password,google,_id,...resto}=req.body;
    
    //validar contra la base de datos
    if(password){
      const salt = bcrypt.genSaltSync();
      // encriptamos la contraseña antes de guardarla
        resto.password = bcrypt.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.status(201).json(usuario)
  }

  const usuariosPost=async (req, res)=> {
    //aquí leemos propiedades recibidas mediante el body
    //destructurar el objeto de request para ignorar propiedades que no sean necesarias 
    const {nombre,correo,password,rol}= req.body;
   //const body= req.body;
   // se crea un nuevo usuario con las propiedades recibidas por el front request
   const usuario= new Usuario({nombre,correo,password,rol});

   

   //encriptar contraseña por defecto tiene 10 iteraciones pero se puede aumentar para incrementar la dificultad de encriptacion
   const salt = bcrypt.genSaltSync();
 // encriptamos la contraseña antes de guardarla
   usuario.password = bcrypt.hashSync(password,salt);
   // el usuario es un objeto Schema de mongoose que permite utilizar los metodos para guardar en BD
   await usuario.save();

    res.status(201).json({
        msg:'Post API - controlador',
        usuario
    })
  }

  const usuariosDelete= async (req, res)=> {
    const {id}= req.params;

    //borrar físicamente no recomendado
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});


    res.status(201).json({
        usuario
    })
  }

  const usuariosPatch=(req, res)=> {
    res.status(201).json({
        msg:'patch API - controlador'
    })
  }

  module.exports={
    usuariosGet,usuariosPut,usuariosPost,usuariosDelete,usuariosPatch
  }