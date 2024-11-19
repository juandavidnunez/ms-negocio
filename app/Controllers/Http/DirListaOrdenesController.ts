import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DirListaOrden from 'App/Models/DirListaOrden'

export default class DirListaOrdenesController {
    public async create({ request }: HttpContextContract) {
        const body = request
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
        const body = request
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
}
