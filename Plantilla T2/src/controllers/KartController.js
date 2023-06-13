import prisma from '../prismaClient.js'



const getAllKarts = async (req, res) => {
    try{
        const karts = await prisma.Karts.findMany();
      if (karts.length === 0) {
            
            return res.status(404).json({ message: 'Ningun kart encontrado.' });
          }
        res.json(karts);
    } catch (error) {
        console.error(`Falla de sacar karts(consola):`, error);
        res.status(500).json({error: `Falla de sacar karts`});
    }
};

  const getKartById = async (req, res) => {
    try {
        const { id } = req.params
        const kart = await prisma.Karts.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(kart)
    } catch (error) {
        console.error(`Falla de sacar kart por Id:`, error);
        res.status(500).json({error: `Falla de sacar kart por Id`});
    }
}


const createKart = async (req, res) => {
    try{
        const {modelo, color, velocidad_maxima, id_personaje} = req.body
        const kart = await prisma.Karts.create({
            data: {
                modelo,
                color   ,
                velocidad_maxima ,
                id_personaje,
            }
        })
        res.json(kart)
    } catch (error) {
        console.error(`Falla de crear kart:`, error);
        res.status(500).json({error: `Falla de crear kart`});
    }
}


const updateKart = async(req,res) => {
    try {
        const { id } = req.params
        const {modelo, color, velocidad_maxima, id_personaje} = req.body

        const existingKart = await prisma.Karts.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingKart) {
            return res.status(404).json({error: `Kart no existe`})
        }

        const updatedKart = await prisma.Karts.update({
            where: {
                id: Number(id),
            },
            data: {
                modelo,
                color   ,
                velocidad_maxima ,
                id_personaje,
            }
        })

        res.json(updatedKart)

        
    } catch (error) {
        console.error(`Falla de actualizar kart`, error)
        res.status(500).json({error:`Falla de actualizar kart`})
    }
}

const deleteKart = async (req, res) => {
    try {
        const { id } = req.params
        const {modelo, color, velocidad_maxima, conductor, id_personaje} = req.body

        const existingKart = await prisma.Karts.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingKart) {
            return res.status(404).json({error: `Kart no existe`})
        }

        const deletedKart = await prisma.Karts.delete({
            where: {
                id: Number(id),
            }
        })

        res.json(deletedKart)
    } catch (error) {
        console.error('Falla de eliminar kart:', error);
        res.status(500).json({ error: 'Falla de eliminar kart' });
    }
}


const KartController = {
    getAllKarts,
    getKartById,
    createKart,
    updateKart,
    deleteKart
}
  
  export default KartController