

const path = require('path')
const fs = require('fs');
const {response,request}= require('express');
const { subirArchivo } = require('../helpers');
const {Usuario,Producto}= require('../models/index')
const cargarArchivo=async (req =request, res=response)=>{
    
    try {
        const nombre= await subirArchivo(req.files,undefined,'img');
        res.json({nombre });
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
    

}

const actualizarImgUser=async(req ,res=response)=>{

const {id,coleccion}= req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
        modelo= await Usuario.findById(id);
        if(!modelo){
            return res.status(400).json({
                msg:`El usuario con el id ${id} no existe`
            })
        }
        break;
        case 'productos':
            modelo= await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`El producto con el id ${id} no existe`
                })
            }
        break;
  
    default:
       return  res.status(500).json({
            msg: 'excepcion del servidor no validada',
        })
        break;
  }
    //limpiar imagenes previas

    try {
        if(modelo.img){
            //hayq ue borrar la imagen del servidor
        const pathImg = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImg)){
            fs.unlinkSync(pathImg);
        }

        }
    } catch (error) {
        res.status(400).json({
            msg:"algo salio mal al borrar imagen anterior"
        })
    }


    const nombreImg = await subirArchivo(req.files,undefined,coleccion);
    modelo.img=nombreImg;

    await modelo.save();
    res.json({
     modelo
})
}

const mostrarImagen=async(req, res=response)=>{
    const {id,coleccion}= req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
        modelo= await Usuario.findById(id);
        if(!modelo){
            return res.status(400).json({
                msg:`El usuario con el id ${id} no existe`
            })
        }
        break;
        case 'productos':
            modelo= await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`El producto con el id ${id} no existe`
                })
            }
        break;
  
    default:
       return  res.status(500).json({
            msg: 'excepcion del servidor no validada',
        })
        break;
  }
    //limpiar imagenes previas
 
    try {
        if(modelo.img){
            //hayq ue borrar la imagen del servidor
         const pathImg = path.join(__dirname,'../uploads',coleccion,modelo.img);
        if(fs.existsSync(pathImg)){
          return  res.sendFile(pathImg);
        }else{
          const  pathImg = path.join(__dirname,'../assets','no-image.jpg');
            console.log(pathImg)
            return  res.sendFile(pathImg);
        }

        }
    } catch (error) {
        res.status(400).json({
            msg:"algo salio mal al borrar imagen anterior"
        })
    }


   //si no se encuentra la imagen nos devolvera esta imagen default
   const  pathImg = path.join(__dirname,'../assets','no-image.jpg');
   res.sendFile(pathImg);
}


module.exports={
    cargarArchivo,
    actualizarImgUser,
    mostrarImagen
}