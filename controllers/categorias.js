const { response } = require("express");
const {Categoria} = require('../models/index');


//obtenerCategorias - Paginado - total - populate
const getCategoria=async(req, res=response)=> {
    const {id}= req.params;
    const query = {estado:true};
    const categoria = await Categoria.findById(id);


    res.json(categoria);
  }


//obtenerCategorias populate {}

const getCategoriasPopulate=async(req,res=response)=>{
//obtenemos los query params y asignamos valores por defectos para cuando no son enviados
const {limite=5,desde=0}= req.query;
const query = {estado:true};
//promise to all ejecutara todas las promesas al mismo tiempo y esperara a que todas terminen antes de continuar
  const [total,categorias]= await Promise.all(
   [
     Categoria.countDocuments(query),
     Categoria.find(query).populate('usuario','nombre')
    .skip(Number(desde))
    .limit(Number(limite))
 ])

 res.status(201).json({
  total,
 categorias
  
 
  

 })
}


const crearCategoria = async (req, res = response)=>{
  
    const nombre = req.body.nombre;
    
    const categoriaDb = await Categoria.findOne({nombre:nombre.toUpperCase()})

    if(categoriaDb){
        return res.status(400).json({
            msg: `La categoria ${categoriaDb.nombre}, ya existe`,
        });
    }
     
    //generar la data aguardar

    const data = {
       nombre: nombre.toString().toUpperCase(),
       usuario: req.usuario._id
    }

     const categoria = new Categoria(data);

     //guardar en base de datos
     await categoria.save();
 
    res.status(201).json(categoria)
}


//actualizar categoria

const actualizarCategoria = async(req, res=response)=>{
    //aquí leemos propiedades recibidas mediante parámetros de segmento que vienen de la URL
 const {id}= req.params;
 const {estado,usuario,...data}=req.body;
 
 data.nombre = data.nombre.toUpperCase();
 data.usuario = req.usuario._id;
  

 const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true})

    res.json(categoria);
}


//borrar categoria - estado:false

const borrarCategoria= async (req, res)=> {
    const {id}= req.params;

    //borrar físicamente no recomendado
    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false});
  //informacion del usuario autenticado
    //const usuarioAutenticado= req.usuario;

    res.status(201).json({
        categoria
    })
  }




module.exports={
    crearCategoria,
    getCategoria,
    getCategoriasPopulate,
    actualizarCategoria,
    borrarCategoria
}