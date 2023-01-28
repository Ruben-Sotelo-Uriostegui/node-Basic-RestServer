const {Router}=require('express');
const {check}=require('express-validator');
const { crearCategoria, getCategoria, getCategoriasPopulate, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { idExiste, idCategoriaExiste } = require('../helpers/db-validators');
const { validarJWT, tieneRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//obtener todas las categorías
router.get('/',getCategoriasPopulate)
//obtener una categoría

router.get('/:id',[
    check('id','No es un id Valido').isMongoId(),
    check('id').custom( idCategoriaExiste ),
    validarCampos
],getCategoria)

//crear una nueva categoria solo personas con token
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//actualizar categoria solo personas con token
router.put('/:id',[
    validarJWT,
    check('id','No es un id Valido').isMongoId(),
    check('id').custom( idCategoriaExiste ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria)

//borrar categoria solo personas con token yq ue sean admin
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un id Valido').isMongoId(),
    validarCampos,
    check('id').custom( idCategoriaExiste ),
    validarCampos,
],borrarCategoria)



module.exports= router;