const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const configs = require('./config');
const { urlencoded } = require('body-parser');

//base de datos MySQL
// db.authenticate()
//     .then(() => console.log('DB Conectda'))
//     .catch(err => console.log(err));

const app = express();

//Habilitar PUG como Template Engine
app.set('view engine', 'pug');

//Añadir las vistas 
app.set('views', path.join(__dirname, './views'));

//Cargamos la carpeta estatica llamada public
app.use(express.static('public'));


//Validar si estamos en desarrollo o en production
const config = configs[app.get('env')];
app.locals.titulo = config.nombresitio;

//Muestra el año actual
app.use((req, res, next) => {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
})

//ejecutamos bosy parser

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Cargar las rutas desde Router
app.use('/', routes());

app.listen(3500);
