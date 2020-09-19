const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHomePage = async (req, res) => {

    //Creamos un arreglo de promises para hacer mas de una consulta
    const viajes = await Viaje.findAll({
        //Solo consultamos 3 resultados
        limit: 3
    })
    const testimoniales = await Testimonial.findAll({
        //Solo consultamos 3 resultados
        limit: 3
    })

    //Pasar el promise y ejecutarlo
    res.render('index', {
        pagina: 'Proximos Viajes',
        viajes,
        testimoniales,
        clase: 'home'
    })
}