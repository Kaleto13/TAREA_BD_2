import prisma from '../prismaClient.js'



const getAllReinos = async (req, res) => {
    try{
        const reinos = await prisma.Reinos.findMany();
      if (reinos.length === 0) {
            
            return res.status(404).json({ message: 'Ningun reino encontrado.' });
          }
        res.json(reinos);
    } catch (error) {
        console.error(`Falla de sacar reinos:`, error);
        res.status(500).json({error: `Falla de sacar reinos`});
    }
};

const getReinoById = async (req, res) => {
    try {
        const { id } = req.params
        const reino = await prisma.Reinos.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(reino)
    } catch (error) {
        console.error(`Falla de sacar reino por Id:`, error);
        res.status(500).json({error: `Falla de sacar reino por Id`});
    }
}

const createReino = async (req, res) => {
    try{
        const {nombre, ubicacion, superficie} = req.body
        const reino = await prisma.Reinos.create({
            data: {
                nombre,
                ubicacion,
                superficie,
            }
        })
        res.json(reino)
    } catch (error) {
        console.error(`Falla de crear reino:`, error);
        res.status(500).json({error: `Falla de crear reino`});
    }
}

const updateReino = async(req,res) => {
    try {
        const { id } = req.params
        const {nombre, ubicacion, superficie} = req.body

        const existingReino = await prisma.Reinos.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingReino) {
            return res.status(404).json({error: `Reino no existe`})
        }

        const updatedReino = await prisma.Reinos.update({
            where: {
                id: Number(id),
            },
            data: {
                nombre,
                ubicacion,
                superficie
            }
        })

        res.json(updatedReino)

        
    } catch (error) {
        console.error(`Falla de actualizar reino`, error)
        res.status(500).json({error:`Falla de actualizar reino`})
    }
}

const deleteReino = async (req, res) => {
    try {
        const { id } = req.params
        const {nombre, ubicacion, superficie} = req.body

        const existingReino = await prisma.Reinos.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingReino) {
            return res.status(404).json({error: `Reino no existe`})
        }

        const deletedReino = await prisma.Reinos.delete({
            where: {
                id: Number(id),
            }
        })

        res.json(deletedReino)
    } catch (error) {
        console.error('Falla de eliminar reino:', error);
        res.status(500).json({ error: 'Falla de eliminar reino' });
    }
}

const ReinoController = {
    getAllReinos,
    getReinoById,
    createReino,
    updateReino,
    deleteReino
}
  
  export default ReinoController

