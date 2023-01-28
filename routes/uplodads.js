const {Router}=require('express');
const {check}=require('express-validator');
const { cargarArchivo, actualizarImgUser, mostrarImagen } = require('../controllers/uploads');
const { coleccionPermitidas } = require('../helpers');
const { validarArchivo } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/',cargarArchivo);

router.put('/:coleccion/:id',[
    check('id','El id debe de ser de Mongo').isMongoId(),
    check('coleccion').custom(c=> coleccionPermitidas(c,['usuarios','productos'])),
    validarArchivo,
    validarCampos
],actualizarImgUser);

router.get('/:coleccion/:id',[
    check('id','El id debe de ser de Mongo').isMongoId(),
    check('coleccion').custom(c=> coleccionPermitidas(c,['usuarios','productos'])),
    validarCampos
], mostrarImagen)

module.exports=router;