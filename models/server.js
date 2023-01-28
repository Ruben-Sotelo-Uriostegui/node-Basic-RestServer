const express = require('express')
const cors=require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app= express();
        this.port=process.env.PORT;
        //path para los usuarios

          this.paths={
            auth:        '/api/auth',
            usuarios:    '/api/usuarios',
            categorias:  '/api/categorias',
            productos:   '/api/productos',
            buscar:      '/api/buscar',
            uploads:      '/api/uploads'
          }

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

       //manejar la carga de archivos
        this.app.use(
           fileUpload({
            useTempFiles: true,
            tempFileDir: "/tmp/",
            createParentPath: true
         })
        );
 
    }

    //en nuestras rutas usamos la ruta definida y requerimos las rutas definidas en nuestro archivo usuarios
    routes(){
       this.app.use(this.paths.auth,require('../routes/auth'));
       this.app.use(this.paths.usuarios,require('../routes/usuarios'));
       this.app.use(this.paths.categorias,require('../routes/categorias'));
       this.app.use(this.paths.productos,require('../routes/productos'));
       this.app.use(this.paths.buscar,require('../routes/buscar'));
       this.app.use(this.paths.uploads,require('../routes/uplodads'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto',this.port);
        })
    }
}

module.exports=Server;