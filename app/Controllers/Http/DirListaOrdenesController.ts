import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DirListaOrden from 'App/Models/DirListaOrden';

export default class DirListaOrdenesController {
    public async create({ request }: HttpContextContract) {
        const body = await request.body()
        const theDirListaOrden = await DirListaOrden.create(body)
        return theDirListaOrden
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let DirListaOrdens: DirListaOrden[] = await DirListaOrden.query().paginate(page, perPage)
        return DirListaOrdens
    }


    public async findById({ params }: HttpContextContract) {
        const theDirListaOrden = await DirListaOrden.findOrFail(params.id)
        return theDirListaOrden
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.body()
        // Buscar la DirListaOrden por ID
        const theDirListaOrden = await DirListaOrden.findOrFail(params.id);
        // Actualizar las propiedades de theDirListaOrden con los valores del cuerpo
        Object.assign(theDirListaOrden, body);
        
        await theDirListaOrden.save();
        return theDirListaOrden;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const theDirListaOrden = await DirListaOrden.findOrFail(params.id)
        response.status(204)
        return await theDirListaOrden.delete()
    }

      public async deleteAllRuta({ params, response }: HttpContextContract) {
                const vehiculoConductores = await DirListaOrden.query().where('ruta_id', params.id);
                if (vehiculoConductores.length === 0) {
                    return response.status(404).send({ message: 'No se encontraron registros para eliminar.' });
                }
                return await DirListaOrden.query().where('ruta_id', params.id).delete();
                
            }
}
