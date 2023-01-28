const { Categoria, Producto } = require('../models');
const Role= require('../models/role');
const Usuario = require('../models/usuario');
const esRolValido = async(rol='')=>{
    const existeRol=await Role.findOne({rol});
    if(!existeRol){
     throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
   }

const emailExiste=async(correo='')=>{
//verficar si el correo ya existe
const existeEmail = await Usuario.findOne({correo})
if(existeEmail){
    throw new Error(`El correo: ${correo} ya esta registrado en la base de datos`);
}
}

const idExiste=async(_id='')=>{
    //verficar si el correo ya existe
    const existeId = await Usuario.findById(_id)
    if(!existeId){
        throw new Error(`El Id: ${_id} no esta registrado en la base de datos`);
    }
    }

    const idCategoriaExiste=async(_id='')=>{
        //verficar si el correo ya existe
        const existeId = await Categoria.findById(_id)
        if(!existeId){
            throw new Error(`El Id: ${_id} no esta registrado en la base de datos`);
        }
        }

        const idProductoExiste=async(_id='')=>{
            //verficar si el correo ya existe
            const existeId = await Producto.findById(_id)
            if(!existeId){
                throw new Error(`El Id: ${_id} no esta registrado en la base de datos`);
            }
            }
 
        const coleccionPermitidas = (coleccion='',colecciones=[])=>{
            const incluida = colecciones.includes(coleccion);
            if(!incluida){
                throw new Error(`La coleccion: ${coleccion} no es permitida, permitidas: ${colecciones}`)
            }
            return true;
        }

   module.exports = {
    esRolValido,emailExiste,idExiste,idCategoriaExiste,idProductoExiste,coleccionPermitidas
   }

