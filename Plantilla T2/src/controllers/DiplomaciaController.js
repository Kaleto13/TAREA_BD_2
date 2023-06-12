import prisma from '../prismaClient.js'



const getAllDiplomacies = async (req, res) => {
    try{
        const dimplomacies = await prisma.Diplomacias.findMany();
      if (dimplomacies.length === 0) {
            
            return res.status(404).json({ message: 'Ningun diplomacia encontrado.' });
          }
        res.json(dimplomacies);
    } catch (error) {
        console.error(`Falla de sacar diplomacias:`, error);
        res.status(500).json({error: `Falla de sacar diplomacias`});
    }
};

const getDiplomacyById = async (req, res) => {
    try {
        const { id } = req.params
        const diplomacy = await prisma.Diplomacias.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(diplomacy)
    } catch (error) {
        console.error(`Falla de sacar diplomacia por Id:`, error);
        res.status(500).json({error: `Falla de sacar diplomacia por Id`});
    }
}

const createDiplomacy = async (req, res) => {
    try{
        const {id_reino_1, id_reino_2, es_aliado} = req.body
        const diplomacy = await prisma.Diplomacias.create({
            data: { 
                id_reino_1,
                id_reino_2,
                es_aliado
            }
        })
        res.json(diplomacy)
    } catch (error) {
        console.error(`Falla de crear diplomacia:`, error);
        res.status(500).json({error: `Falla de crear diplomacia`});
    }
}

const updateDiplomacy = async(req,res) => {
    try {
        const { id } = req.params
        const {id_reino_1, id_reino_2, es_aliado} = req.body

        const existingDiplomacy = await prisma.Diplomacias.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingDiplomacy) {
            return res.status(404).json({error: `Diplomacia no existe`})
        }

        const updatedDiplomacy = await prisma.Diplomacias.update({
            where: {
                id: Number(id),
            },
            data: {
                id_reino_1,
                id_reino_2,
                es_aliado
            }
        })

        res.json(updatedDiplomacy)

        
    } catch (error) {
        console.error(`Falla de actualizar diplomacia`, error)
        res.status(500).json({error:`Falla de actualizar diplomacia`})
    }
}

const deleteDiplomacy = async(req,res) => {
    try {
        const { id } = req.params
        const {id_reino_1, id_reino_2, es_aliado} = req.body

        const existingDiplomacy = await prisma.Diplomacias.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingDiplomacy) {
            return res.status(404).json({error: `Diplomacia no existe`})
        }
        const deletedDiplomacy = await prisma.Diplomacias.delete({
            where: {
                id: Number(id),
            }
        })

        res.json(deletedDiplomacy)
    } catch (error) {
        console.error('Falla de eliminar diplomacia:', error);
        res.status(500).json({ error: 'Falla de eliminar diplomacia' });
    }
}

const DiplomaciaController = {
    getAllDiplomacies,
    getDiplomacyById,
    createDiplomacy,
    updateDiplomacy,
    deleteDiplomacy
}
  
  export default DiplomaciaController

