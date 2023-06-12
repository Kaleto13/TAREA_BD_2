import prisma from '../prismaClient.js'



const getAllDefensas = async (req, res) => {
    try{
        const defensas = await prisma.Defensas.findMany();
      if (defensas.length === 0) {
            
            return res.status(404).json({ message: 'Ningun defensa encontrado.' });
          }
        res.json(defensas);
    } catch (error) {
        console.error(`Falla de sacar defensas:`, error);
        res.status(500).json({error: `Falla de sacar defensas`});
    }
};

const getDefensaById = async (req, res) => {
    try {
        const { id } = req.params
        const defensa = await prisma.Defensas.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(defensa)
    } catch (error) {
        console.error(`Falla de sacar defensa por Id:`, error);
        res.status(500).json({error: `Falla de sacar defensa por Id`});
    }
}

const createDefensa = async (req, res) => {
    try{
        const {defensa} = req.body
        const cnstdefensa = await prisma.Defensas.create({
            data: { 
                defensa
            }
        })
        res.json(cnstdefensa)
    } catch (error) {
        console.error(`Falla de crear defensa:`, error);
        res.status(500).json({error: `Falla de crear defensa`});
    }
}

const updateDefensa = async(req,res) => {
    try {
        const { id } = req.params
        const {defensa} = req.body

        const existingDefensa = await prisma.Defensas.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingDefensa) {
            return res.status(404).json({error: `Defensa no existe`})
        }

        const updatedDefensa = await prisma.Defensas.update({
            where: {
                id: Number(id),
            },
            data: {
                defensa
            }
        })

        res.json(updatedDefensa)

        
    } catch (error) {
        console.error(`Falla de actualizar defensa`, error)
        res.status(500).json({error:`Falla de actualizar defensa`})
    }
}

const deleteDefensa = async(req,res) => {
    try {
        const { id } = req.params
        const {defensa} = req.body

        const existingDefensa = await prisma.Defensas.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingDefensa) {
            return res.status(404).json({error: `Defensa no existe`})
        }
        const deletedDefensa = await prisma.Defensas.delete({
            where: {
                id: Number(id),
            }
        })

        res.json(deletedDefensa)
    } catch (error) {
        console.error('Falla de eliminar defensa:', error);
        res.status(500).json({ error: 'Falla de eliminar defensa' });
    }
}

const DefensaController = {
    getAllDefensas,
    getDefensaById,
    createDefensa,
    updateDefensa,
    deleteDefensa
}
  
  export default DefensaController

