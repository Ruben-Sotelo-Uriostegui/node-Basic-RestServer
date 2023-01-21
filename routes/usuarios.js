//con destructuracion se obtiene Router de Express
const {Router}=require('express');
const {check}=require('express-validator');
const {validarCampos}= require('../middlewares/validar-campos');
//importamos de controllers/usuarios todos los metodos para nuestros endPoints
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRolValido,emailExiste, idExiste } = require('../helpers/db-validators');

const router = Router();

//definimos los endpoints
router.get('/', usuariosGet);

//aqui se definen los parametros de segmento o de la url
  router.put('/:id',[
    check('id','No es un id Valido').isMongoId(),
    check('id').custom( idExiste ),
    validarCampos
  ] ,usuariosPut);

  router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser minimo de 6 digitos').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    check('correo').custom(emailExiste),
    validarCampos
  ] ,usuariosPost);

  router.delete('/:id',[
    check('id','No es un id Valido').isMongoId(),
    check('id').custom( idExiste ),
    validarCampos,
  ], usuariosDelete);

  router.patch('/', usuariosPatch);

  //retornamos las rutas
module.exports=router;