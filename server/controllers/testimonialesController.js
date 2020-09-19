const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    })
}

exports.agregarTestimonial = async (req, res) => {
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
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            errores,
            nombre, 
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
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
}