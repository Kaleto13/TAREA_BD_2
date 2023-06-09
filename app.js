import express from 'express';
import UsersController from './controllers/UsersController.js';
import PersonajeController from './controllers/PersonajeController.js';
import morgan from 'morgan';

const ENV = process.env;
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//endpoints(Routes)
app.get('/users', UsersController.getUsers)
app.get('/users/:id', UsersController.getUserById)
app.post('/users', UsersController.createUser)
app.get('/users/:id/posts', UsersController.usersPosts)

// Personaje endpoints
app.get('/personajes', PersonajeController.getAllPersonajes);
app.get('/personajes/:id', PersonajeController.getPersonajeById);
app.post('/personajes', PersonajeController.createPersonaje);
app.put('/personajes/:id', PersonajeController.updatePersonaje);
app.delete('/personajes/:id', PersonajeController.deletePersonaje);

//==========================================================//
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!!' });
})
//==========================================================//


// 404 not found route
app.use((_, res) => {
    res.status(404).json({ message: 'Not found Crack!' });
})


//Init server
app.listen(ENV.API_PORT, () => {
    console.log(`Server running on port ${ENV.API_PORT}`);
})