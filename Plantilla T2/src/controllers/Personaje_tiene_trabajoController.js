import prisma from '../prismaClient.js'



const getAllOcupations = async (req, res) => {
    try{
        const relacion = await prisma.personaje_tiene_trabajo.findMany();
      if (relacion.length === 0) {
            
            return res.status(404).json({ message: 'Ningun ocupacion encontrado.' });
          }
        res.json(relacion);
    } catch (error) {
        console.error(`Falla de sacar ocupaciones:`, error);
        res.status(500).json({error: `Falla de sacar ocupacion`});
    }
};

const getOcupationById = async (req, res) => {
    try {
        const { id } = req.params
        const relacion = await prisma.personaje_tiene_trabajo.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(relacion)
    } catch (error) {
        console.error(`Falla de sacar ocupacion por Id:`, error);
        res.status(500).json({error: `Falla de sacar ocupacion por Id`});
    }
}

const createOcupation = async (req, res) => {
    try{
        const {id_trabajo, id_personaje, fecha_inicio, fecha_termino} = req.body
        const inicio = new Date(fecha_inicio);
        const termino = new Date(fecha_termino);
        const relacion = await prisma.personaje_tiene_trabajo.create({
            data: {
                id_trabajo,
                id_personaje,
                fecha_inicio:inicio,
                fecha_termino:termino
            }
        })
        res.json(relacion)
    } catch (error) {
        console.error(`Falla de crear ocupacion:`, error);
        res.status(500).json({error: `Falla de crear ocupacion`});
    }
}



const updateOcupation = async(req,res) => {
    try {
        const { id } = req.params
        const {id_trabajo, id_personaje, fecha_inicio, fecha_termino} = req.body

        const existingRelacion = await prisma.personaje_tiene_trabajo.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingRelacion) {
            return res.status(404).json({error: `Ocupacion no existe`})
        }

        const updatedRelacion = await prisma.personaje_tiene_trabajo.update({
            where: {
                id: Number(id),
            },
            data: {
                id_trabajo,
                id_personaje,
                fecha_inicio,
                fecha_termino
            }
        })

        res.json(updatedPersonaje)

        
    } catch (error) {
        console.error(`Falla de actualizar ocupacion`, error)
        res.status(500).json({error:`Falla de actualizar ocupacion`})
    }
}

const deleteOcupation = async(req,res) => {
    try {
        const { id } = req.params
        const {id_trabajo, id_personaje, fecha_inicio, fecha_termino} = req.body

        const existingRelacion = await prisma.personaje_tiene_trabajo.findUnique({
            where: {
                id: Number(id),
            }
        })

        if(!existingRelacion) {
            return res.status(404).json({error: `Ocupacion no existe`})
        }

        const deletedRelacion = await prisma.personaje_tiene_trabajo.delete({
            where: {
                id: Number(id),
            }
        })

        res.json(deletedRelacion)
    } catch (error) {
        console.error('Falla de eliminar ocupacion:', error);
        res.status(500).json({ error: 'Falla de eliminar ocupacion' });
    }
}

const Personaje_tiene_trabajoController = {
    getAllOcupations,
    getOcupationById,
    createOcupation,
    updateOcupation,
    deleteOcupation
}
  
  export default Personaje_tiene_trabajoController

