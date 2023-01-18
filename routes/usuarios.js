//con destructuracion se obtiene Router de Express
const {Router}=require('express');
//importamos de controllers/usuarios todos los metodos para nuestros endPoints
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router = Router();

//definimos los endpoints
router.get('/', usuariosGet);

//aqui se definen los parametros de segmento o de la url
  router.put('/:id', usuariosPut);

  router.post('/', usuariosPost);

  router.delete('/', usuariosDelete);

  router.patch('/', usuariosPatch);

  //retornamos las rutas
module.exports=router;