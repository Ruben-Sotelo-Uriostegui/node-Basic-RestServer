const {response, request}=require('express');

const validarArchivo=(req=request,res=response,next)=>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo)  {
        
        return res.status(400).json({msg:'No subiste un archivo.'});
       
      }

    next();
}

module.exports={
    validarArchivo
}