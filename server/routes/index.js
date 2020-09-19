const express = require('express');
const router = express.Router();

const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

module.exports = function(){
    router.get('/', (req, res) => {

        //Creamos un arreglo de promises para hacer mas de una consulta
        const promises = [];
        promises.push(Viaje.findAll({
            //Solo consultamos 3 resultados
            limit: 3
        }))
        promises.push(Testimonial.findAll({
            //Solo consultamos 3 resultados
            limit: 3
        }))

        //Pasar el promise y ejecutarlo
        const resultado = Promise.all(promises)
        
        resultado.then(resultado => res.render('index', {
            pagina: 'Proximos Viajes',
            viajes: resultado[0],
            testimoniales: resultado[1],
            clase: 'home'
        }))
        .catch((err) => console.log(err));
    })

    router.get('/nosotros', (req, res) => {
        res.render('nosotros', {
            pagina: 'Sobre Nosotros'
        });
    })

    router.get('/viajes', (req, res) => {
        Viaje.findAll()
            .then(viajes => res.render('viajes', {
                pagina: 'Proximos Viajes',
                viajes
            }))
            .catch((err) => console.log(err));
    });

    router.get('/viajes/:id', (req, res) => {
        Viaje.findByPk(req.params.id)
            .then(viaje => res.render('viaje', {
                viaje
            }))
            .catch(err => console.log(err));
    });

    router.get('/testimoniales', (req, res) => {
        Testimonial.findAll()
            .then(testimoniales => res.render('testimoniales', {
                pagina: 'Testimoniales',
                testimoniales
            }))
    });

    router.post('/testimoniales', (req, res) => {
        //Validacion de formulario de Testimoniales
        //Validamos el formulario
        let {nombre, correo, mensaje } = req.body;

        let errores = [];
        if(!nombre){
            errores.push({'mensaje': 'Agrega tu Nombre'})
        }
        if(!correo){
            errores.push({'mensaje': 'Agrega tu Correo'})
        }
        if(!mensaje){
            errores.push({'mensaje': 'Agrega un Mensaje'})
        }

        //Revisar por errores 
        if(errores.length > 0){
            //Muestra la vista con errores
            res.render('testimoniales', {
                errores,
                nombre, 
                correo,
                mensaje
            })
        }else{
            //Almacena los datos en base de datos
            Testimonial.create({
                nombre,
                correo,
                mensaje
            })
                .then(testimonial => res.redirect('/testimoniales'))
                .catch(err => console.log(err));
        }
    });

    return router;
}