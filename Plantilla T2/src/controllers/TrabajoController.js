import prisma from '../prismaClient.js'



const getAllTrabajos = async (req, res) => {
    try{
        const cnsttrabajos = await prisma.trabajos.findMany();
      if (cnsttrabajos.length === 0) {
            
            return res.status(404).json({ message: 'Ningun trabajo encontrado.' });
          }
        res.json(cnsttrabajos);
    } catch (error) {
        console.error(`Falla de sacar trabajos:`, error);
        res.status(500).json({error: `Falla de sacar trabajos`});
    }
};

const getTrabajoById = async (req, res) => {
    try {
        const { id } = req.params
        const trabajo = await prisma.trabajos.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(trabajo)
    } catch (error) {
        console.error(`Falla de sacar trabajo por Id:`, error);
        res.status(500).json({error: `Falla de sacar trabajo por Id`});
    }
}

const createTrabajo = async (req, res) => {
    try{
        const {descripcion, sueldo} = req.body
        const trabajo = await prisma.trabajos.create({
            data: {
                descripcion,
                sueldo,
            }
        })
        res.json(trabajo)
    } catch (error) {
        console.error(`Falla de crear trabajo:`, error);
        res.status(500).json({error: `Falla de crear trabajo`});
    }
}

const updateTrabajo = async(req,res) => {
    try {
        const { id } = req.params
        const {descripcion, sueldo} = req.body

        const existingTrabajo = await prisma.trabajos.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingTrabajo) {
            return res.status(404).json({error: `Trabajo no existe`})
        }

        const updatedTrabajo = await prisma.trabajos.update({
            where: {
                id: Number(id),
            },
            data: {
                descripcion,
                sueldo
            }
        })

        res.json(updatedTrabajo)

        
    } catch (error) {
        console.error(`Falla de actualizar trabajo`, error)
        res.status(500).json({error:`Falla de actualizar trabajo`})
    }
}

const deleteTrabajo = async(req,res) => {
    try {
        const { id } = req.params
        const {descripcion, sueldo} = req.body

        const existingTrabajo = await prisma.trabajos.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingTrabajo) {
            return res.status(404).json({error: `Trabajo no existe`})
        }
        const deletedTrabajo = await prisma.trabajos.delete({
            where: {
                id: Number(id),
            }
        })

        res.json(deletedTrabajo)
    } catch (error) {
        console.error('Falla de eliminar trabajo:', error);
        res.status(500).json({ error: 'Falla de eliminar trabajo' });
    }
}

const TrabajoController = {
    getAllTrabajos,
    getTrabajoById,
    createTrabajo,
    updateTrabajo,
    deleteTrabajo
}
  
  export default TrabajoController