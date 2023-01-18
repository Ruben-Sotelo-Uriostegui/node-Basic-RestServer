//para definir el tipo de dato importamos con destructuracion el recurso response del cual nos permite visualizar los metodos de express
const {response}= require('express')

//metodo para peticiones get del usuario 
const usuariosGet=(req, res=response)=> {
    //obtenemos los query params y asignamos valores por defectos para cuando no son enviados
    const {apiKey,nombre="No name",page=1,limit=10} = req.query;
    res.status(201).json({
        msg:'Mensaje API - controlador',
        nombre,
        apiKey

    })
  }

  const usuariosPut=(req, res)=> {
 //aquí leemos propiedades recibidas mediante parámetros de segmento que vienen de la URL
    const {id}= req.params;
    res.status(201).json({
   

        msg:'put API - controlador',
        id
    })
  }

  const usuariosPost=(req, res)=> {
    //aquí leemos propiedades recibidas mediante el body
    //destructurar el objeto de request para ignorar propiedades que no sean necesarias 
    const {nombre,edad}= req.body;
    res.status(201).json({
        msg:'Post API - controlador',
        nombre,
        edad
    })
  }

  const usuariosDelete=(req, res)=> {
    res.status(201).json({
        msg:'delete API - controlador'
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