const express = require('express')
const cors=require('cors');
const { dbConnection } = require('../database/config');
class Server{

    constructor(){
        this.app= express();
        this.port=process.env.PORT;
        //path para los usuarios
        this.usuariosRoutesPath='/api/usuarios';
        
        //conectar a base de datos
         this.conectarDB();

        //midddleware
          this.middleware();

        //rutas de mi app
        this.routes();
    }

    async conectarDB(){
     await dbConnection();
    }
 
    middleware(){
      //CORS
      this.app.use(cors());

      //lectura y parseo del body nos permite recibir parametros de tipo json del body
      this.app.use(express.json());

      //directorio publico
        this.app.use(express.static('public'));
    }

    //en nuestras rutas usamos la ruta definida y requerimos las rutas definidas en nuestro archivo usuarios
    routes(){
       this.app.use(this.usuariosRoutesPath,require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto',this.port);
        })
    }
}

module.exports=Server;