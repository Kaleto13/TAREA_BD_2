import prisma from '../prismaClient.js'



const getAllReinoDefensas = async (req, res) => {
    try{
        const defensas = await prisma.Defensas_Reinos.findMany();
      if (defensas.length === 0) {
            
            return res.status(404).json({ message: 'Ningun defensa de reino encontrado.' });
          }
        res.json(inhabitants);
    } catch (error) {
        console.error(`Falla de sacar defensas de reinos:`, error);
        res.status(500).json({error: `Falla de sacar defensas de reinos`});
    }
};

const getReinoDefensaById = async (req, res) => {
    try {
        const { id } = req.params
        const defensa = await prisma.Defensas_Reinos.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(defensa)
    } catch (error) {
        console.error(`Falla de sacar defensa de reino por Id:`, error);
        res.status(500).json({error: `Falla de sacar defensa de reino por Id`});
    }
}

const createReinoDefensa = async (req, res) => {
    try{
        const {id_reino, id_defensas} = req.body
        const defensa = await prisma.Defensas_Reinos.create({
            data: { 
                id_reino,
                id_defensas
            }
        })
        res.json(defensa)
    } catch (error) {
        console.error(`Falla de crear defensa de reino:`, error);
        res.status(500).json({error: `Falla de crear defensa de reino`});
    }
}


const updateReinoDefensa = async(req,res) => {
    try {
        const { id } = req.params
        const {id_reino, id_defensas} = req.body

        const existingDefensa = await prisma.Defensas_Reinos.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingDefensa) {
            return res.status(404).json({error: `Defensa de reino no existe`})
        }

        const updatedDefensa = await prisma.Defensas_Reinos.update({
            where: {
                id: Number(id),
            },
            data: {
                id_reino,
                id_defensas
            }
        })

        res.json(updatedDefensa)

        
    } catch (error) {
        console.error(`Falla de actualizar defensa de reino`, error)
        res.status(500).json({error:`Falla de actualizar defensa de reino`})
    }
}

const deleteReinoDefensa = async(req,res) => {
    try {
        const { id } = req.params
        const {id_reino, id_defensas} = req.body

        const existingDefensa = await prisma.Defensas_Reinos.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingDefensa) {
            return res.status(404).json({error: `Defensa de reino no existe`})
        }
        const deletedDefensa = await prisma.Defensas_Reinos.delete({
            where: {
                id: Number(id),
            }
        })

        res.json(deletedDefensa)
    } catch (error) {
        console.error('Falla de eliminar defensa de reino:', error);
        res.status(500).json({ error: 'Falla de eliminar defensa de reino' });
    }
}

const Defensas_reinosController = {
    getAllReinoDefensas,
    getReinoDefensaById,
    createReinoDefensa,
    updateReinoDefensa,
    deleteReinoDefensa
}
  
  export default Defensas_reinosController