import prisma from '../prismaClient.js'



const getAllPersonajes = async (req, res) => {
    try{
        const personajes = await prisma.Personaje.findMany();
      if (personajes.length === 0) {
            
            return res.status(404).json({ message: 'Ningun personaje encontrado.' });
          }
        res.json(personajes);
    } catch (error) {
        console.error(`Falla de sacar personajes:`, error);
        res.status(500).json({error: `Falla de sacar personajes`});
    }
};

  const getPersonajeById = async (req, res) => {
    try {
        const { id } = req.params
        const personaje = await prisma.Personaje.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(personaje)
    } catch (error) {
        console.error(`Falla de sacar personaje por Id:`, error);
        res.status(500).json({error: `Falla de sacar personaje por Id`});
    }
}


const createPersonaje = async (req, res) => {
    try{
        const {nombre, fuerza, fecha_nacimiento, objeto} = req.body
        const Nacimiento = new Date(fecha_nacimiento);
        const personaje = await prisma.Personaje.create({
            data: {
                nombre,
                fuerza,
                fecha_nacimiento:Nacimiento,
                objeto
            }
        })
        res.json(personaje)
    } catch (error) {
        console.error(`Falla de crear personaje:`, error);
        res.status(500).json({error: `Falla de crear personaje`});
    }
}


const updatePersonaje = async(req,res) => {
    try {
        const { id } = req.params
        const {nombre, fuerza, fecha_nacimiento, objeto} = req.body

        const existingPersonaje = await prisma.Personaje.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingPersonaje) {
            return res.status(404).json({error: `Personaje no existe`})
        }

        const updatedPersonaje = await prisma.Personaje.update({
            where: {
                id: Number(id),
            },
            data: {
                nombre,
                fuerza,
                fecha_nacimiento,
                objeto,
            }
        })

        res.json(updatedPersonaje)

        
    } catch (error) {
        console.error(`Falla de actualizar personaje`, error)
        res.status(500).json({error:`Falla de actualizar personaje`})
    }
}

const deletePersonaje = async (req, res) => {
    try {
        const { id } = req.params
        const {nombre, fuerza, fecha_nacimiento, objeto} = req.body

        const existingPersonaje = await prisma.Personaje.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingPersonaje) {
            return res.status(404).json({error: `Personaje no existe`})
        }

        const deletedPersonaje = await prisma.Personaje.delete({
            where: {
                id: Number(id),
            }
        })

        res.json(deletedPersonaje)
    } catch (error) {
        console.error('Falla de eliminar personaje:', error);
        res.status(500).json({ error: 'Falla de eliminar personaje' });
    }
}


const PersonajeController = {
    getAllPersonajes,
    getPersonajeById,
    createPersonaje,
    updatePersonaje,
    deletePersonaje
}
  
  export default PersonajeController