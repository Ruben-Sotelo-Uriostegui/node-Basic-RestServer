const {Router}=require('express');
const {check}=require('express-validator');
const { crearProducto, actualizarProducto, borrarProducto, getProductosPopulate, getProducto } = require('../controllers/productos');
const { idProductoExiste, idCategoriaExiste, idExiste } = require('../helpers/db-validators');

const { validarJWT, tieneRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
//lista de productos

router.get('/',getProductosPopulate)

//mostrar un producto
router.get('/:id',[
    check('id','No es un id Valido').isMongoId(),
    check('id').custom( idProductoExiste ),
    validarCampos
],getProducto)


//crear un producto

//crear una nueva categoria solo personas con token
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check('categoria','No es un id Valido').isMongoId(),
    check('categoria').custom( idCategoriaExiste ),
    validarCampos
],crearProducto)

//actualizar un producto
router.put('/:id',[
    validarJWT,
    check('id','No es un id Valido').isMongoId(),
    check('id').custom( idProductoExiste ),
    check('categoria','No es un id Valido').isMongoId(),
    check('categoria').custom( idCategoriaExiste ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    validarCampos
],actualizarProducto)


//borrar un producto
router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un id Valido').isMongoId(),
    validarCampos,
    check('id').custom( idProductoExiste ),
    validarCampos,
],borrarProducto)


module.exports=router;