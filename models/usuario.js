const {Schema,model}=require('mongoose')

// se crea el esquema con las características que necesitamos del lado de mongoDB
const UsarioSchema=Schema({
  nombre:{
    type:String,
    required:[true,'El nombre es obligatorio']
  },
  correo:{
    type:String,
    required:[true,'El correo es obligatorio'],
    unique:true
  },
  password:{
    type:String,
    required:[true,'La contraseña es obligatoria'],
  },
  img:{
    type:String,
  },
  rol:{
    type:String,
    required:true,
    enum:['ADMIN_ROLE','USER_ROLE'],
  },
  estado:{
    type:Boolean,
    default:true
  },
  google:{
    type:Boolean,
    default:false
  }

})

UsarioSchema.methods.toJSON=function(){
    const {password,__v,_id,... usuario}= this.toObject();
    usuario.uid=_id;
    return usuario;

}

// se exporta el modelo del usuario
module.exports= model('Usuario',UsarioSchema);