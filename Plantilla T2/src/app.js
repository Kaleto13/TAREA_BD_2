import express from 'express';
import UsersController from './controllers/UsersController.js';
import PersonajeController from './controllers/PersonajeController.js';
import KartController from './controllers/KartController.js';
import ReinoController from './controllers/ReinoController.js';
import TrabajoController from './controllers/TrabajoController.js';
import DefensaController from './controllers/DefensaController.js';
import DiplomaciaController from './controllers/DiplomaciaController.js';
import Personaje_tiene_trabajoController from './controllers/Personaje_tiene_trabajoController.js';
import Personaje_habita_reinoController from './controllers/Personaje_habita_reinoController.js';
import Defensas_reinosController from './controllers/Defensas_reinosController.js';
import morgan from 'morgan';

const ENV = process.env;
const app = express();
const port = 3000;
//middleware
app.use(express.json());
app.use(morgan('dev'));

//endpoints(Routes)
app.get('/users', UsersController.getUsers)
app.get('/users/:id', UsersController.getUserById)
app.post('/users', UsersController.createUser)
app.get('/users/:id/posts', UsersController.usersPosts)

// Personaje endpoints
app.get('/Personaje', PersonajeController.getAllPersonajes);
app.get('/Personaje/:id', PersonajeController.getPersonajeById);
app.post('/Personaje', PersonajeController.createPersonaje);
app.put('/Personaje/:id', PersonajeController.updatePersonaje);
app.delete('/Personaje/:id', PersonajeController.deletePersonaje);

// Kart endpoints
app.get('/Karts', KartController.getAllKarts);
app.get('/Karts/:id', KartController.getKartById);
app.post('/Karts', KartController.createKart);
app.put('/Karts/:id', KartController.updateKart);
app.delete('/Karts/:id', KartController.deleteKart);

// Reino endpoints
app.get('/Reinos', ReinoController.getAllReinos);
app.get('/Reinos/:id', ReinoController.getReinoById);
app.post('/Reinos', ReinoController.createReino);
app.put('/Reinos/:id', ReinoController.updateReino);
app.delete('/Reinos/:id', ReinoController.deleteReino);

// Trabajo endpoints
app.get('/trabajos', TrabajoController.getAllTrabajos);
app.get('/trabajos/:id', TrabajoController.getTrabajoById);
app.post('/trabajos', TrabajoController.createTrabajo);
app.put('/trabajos/:id', TrabajoController.updateTrabajo);
app.delete('/trabajos/:id', TrabajoController.deleteTrabajo);

// Defensa endpoints
app.get('/Defensas', DefensaController.getAllDefensas);
app.get('/Defensas/:id', DefensaController.getDefensaById);
app.post('/Defensas', DefensaController.createDefensa);
app.put('/Defensas/:id', DefensaController.updateDefensa);
app.delete('/Defensas/:id', DefensaController.deleteDefensa);

// Diplomacia endpoints
app.get('/Diplomacias', DiplomaciaController.getAllDiplomacies);
app.get('/Diplomacias/:id', DiplomaciaController.getDiplomacyById);
app.post('/Diplomacias', DiplomaciaController.createDiplomacy);
app.put('/Diplomacias/:id', DiplomaciaController.updateDiplomacy);
app.delete('/Diplomacias/:id', DiplomaciaController.deleteDiplomacy);

// Personaje_tiene_trabajo endpoints
app.get('/personaje_tiene_trabajo', Personaje_tiene_trabajoController.getAllOcupations);
app.get('/personaje_tiene_trabajo/:id', Personaje_tiene_trabajoController.getOcupationById);
app.post('/personaje_tiene_trabajo', Personaje_tiene_trabajoController.createOcupation);
app.put('/personaje_tiene_trabajo/:id', Personaje_tiene_trabajoController.updateOcupation);
app.delete('/personaje_tiene_trabajo/:id', Personaje_tiene_trabajoController.deleteOcupation);

// Personaje_habita_reino endpoints
app.get('/personaje_habita_reino', Personaje_habita_reinoController.getAllInhabitants);
app.get('/personaje_habita_reino/:id', Personaje_habita_reinoController.getInhabitantById);
app.post('/personaje_habita_reino', Personaje_habita_reinoController.createInhabitant);
app.put('/personaje_habita_reino/:id', Personaje_habita_reinoController.updateInhabitant);
app.delete('/personaje_habita_reino/:id', Personaje_habita_reinoController.deleteInhabitant);

// Defensas_reinos endpoints
app.get('/defensas_reinos', Defensas_reinosController.getAllReinoDefensas);
app.get('/defensas_reinos/:id', Defensas_reinosController.getReinoDefensaById);
app.put('/defensas_reinos/:id', Defensas_reinosController.updateReinoDefensa);
app.delete('/defensas_reinos/:id', Defensas_reinosController.deleteReinoDefensa);






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
app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ${port}');
  });