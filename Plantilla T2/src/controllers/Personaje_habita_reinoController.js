import prisma from '../prismaClient.js'



const getAllInhabitants = async (req, res) => {
    try{
        const inhabitants = await prisma.Personaje_habita_reino.findMany();
      if (inhabitants.length === 0) {
            
            return res.status(404).json({ message: 'Ningun habitante encontrado.' });
          }
        res.json(inhabitants);
    } catch (error) {
        console.error(`Falla de sacar inhabitantes:`, error);
        res.status(500).json({error: `Falla de sacar inhabitantes`});
    }
};

const getInhabitantById = async (req, res) => {
    try {
        const { id } = req.params
        const inhabitant = await prisma.Personaje_habita_reino.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(inhabitant)
    } catch (error) {
        console.error(`Falla de sacar habitante por Id:`, error);
        res.status(500).json({error: `Falla de sacar habitante por Id`});
    }
}

const createInhabitant = async (req, res) => {
    try{
        const {id_personaje, id_reino, fecha_registro, es_gobernante} = req.body
        const inhabitant = await prisma.Personaje_habita_reino.create({
            data: {
                id_personaje,
                id_reino,
                fecha_registro,
                es_gobernante,
            }
        })
        res.json(inhabitant)
    } catch (error) {
        console.error(`Falla de crear habitante:`, error);
        res.status(500).json({error: `Falla de crear habitante`});
    }
}

const updateInhabitant = async(req,res) => {
    try {
        const { id } = req.params
        const {id_personaje, id_reino, fecha_registro, es_gobernante} = req.body

        const existingInhabitant = await prisma.Personaje_habita_reino.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingInhabitant) {
            return res.status(404).json({error: `Ocupacion no existe`})
        }

        const updatedInhabitant = await prisma.Personaje_habita_reino.update({
            where: {
                id: Number(id),
            },
            data: {
                id_personaje,
                id_reino,
                fecha_registro,
                es_gobernante,
            }
        })

        res.json(updatedInhabitant)

        
    } catch (error) {
        console.error(`Falla de actualizar habitante`, error)
        res.status(500).json({error:`Falla de actualizar habitante`})
    }
}

const deleteInhabitant = async(req,res) => {
    try {
        const { id } = req.params
        const {id_personaje, id_reino, fecha_registro, es_gobernante} = req.body

        const existingInhabitant = await prisma.Personaje_habita_reino.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingInhabitant) {
            return res.status(404).json({error: `Ocupacion no existe`})
        }

        const deletedInhabitant = await prisma.Personaje_habita_reino.delete({
            where: {
                id: Number(id),
            }
        })

        res.json(deletedInhabitant)
    } catch (error) {
        console.error('Falla de eliminar habitante:', error);
        res.status(500).json({ error: 'Falla de eliminar habitante' });
    }
}

const Personaje_habita_reinoController = {
    getAllInhabitants,
    getInhabitantById,
    createInhabitant,
    updateInhabitant,
    deleteInhabitant
}
  
  export default Personaje_habita_reinoController



