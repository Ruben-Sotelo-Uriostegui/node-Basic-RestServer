const { response } = require("express");
const {Producto} = require('../models/index');


const getProductosPopulate=async(req,res=response)=>{
    //obtenemos los query params y asignamos valores por defectos para cuando no son enviados
    const {limite=5,desde=0}= req.query;
    const query = {estado:true};
    //promise to all ejecutara todas las promesas al mismo tiempo y esperara a que todas terminen antes de continuar
      const [total,productos]= await Promise.all(
       [
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
     ]);

     res.status(201).json({
      total,
     categorias: productos
      
     
      
    
     })
    }

    const getProducto=async(req, res=response)=> {
        const {id}= req.params;
        const query = {estado:true,disponible:true};
        const producto = await Producto.findById(id);
    
    
        res.json(producto);
      }
    


const crearProducto = async (req, res = response)=>{
  
    const {nombre,precio,descripcion,categoria } = req.body;
    const productoDb = await Producto.findOne({nombre:nombre.toUpperCase()})

    if(productoDb){
        return res.status(400).json({
            msg: `El producto ${productoDb.nombre}, ya existe`,
        });
    }
     
    //generar la data aguardar

    const data = {
       nombre:nombre.toUpperCase(),
       precio,
       descripcion,
       categoria,
       usuario: req.usuario._id
    }

     const producto = new Producto(data);

     //guardar en base de datos
     await producto.save();
 
    res.status(201).json(producto)
}


const actualizarProducto = async(req, res=response)=>{
    //aquí leemos propiedades recibidas mediante parámetros de segmento que vienen de la URL
 const {id}= req.params;
 const {estado,usuario,...data}=req.body;
 
 data.nombre = data.nombre.toUpperCase();
 data.usuario = req.usuario._id;
  

 const producto = await Producto.findByIdAndUpdate(id,data,{new:true})

    res.json(producto);
}

const borrarProducto= async (req, res)=> {
    const {id}= req.params;

    //borrar físicamente no recomendado
    const producto = await Producto.findByIdAndUpdate(id,{estado:false,disponible:false});
  //informacion del usuario autenticado
    //const usuarioAutenticado= req.usuario;

    res.status(201).json({
        categoria: producto
    })
  }


module.exports={
    crearProducto,
    actualizarProducto,
    borrarProducto,
    getProductosPopulate,
    getProducto
}