const {Schema,model}=require('mongoose');

const ProdcutoSchema=Schema({
   nombre:{
    type:String,
    required:[true,'El nombre es obligatorio'],
    unique:true
   },
    estado:{
        type:Boolean,
        default:true,
        required:[true,'El estado es obligatorio']
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true,
    },
    precio:{
        type:Number,
        default:0,
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        required:true,
    },
    descripcion:{type:String},
    disponible: {type:String, default:true},
    img:{type:String},

})

ProdcutoSchema.methods.toJSON=function(){
    const {__v, ... data}= this.toObject();
    return data;

}

module.exports=model('Producto',ProdcutoSchema);