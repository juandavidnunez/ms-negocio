import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DirListaOrden from 'App/Models/DirListaOrden';

export default class DirListaOrdenesController {
    
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theDirListaOrden: DirListaOrden = await DirListaOrden.create(body);
        return theDirListaOrden;
    }

    // Get all DirListaOrdenes
    public async findAll({ request }: HttpContextContract) {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input('perPage', 20);
            return await DirListaOrden.query().paginate(page, perPage);
        } else {
            return await DirListaOrden.query();
        }
    }

    //Devuelve las anotaciones de una dirlistaorden
    public async findDirListaOrdenes({ params }: HttpContextContract) {
        let theDirListaOrden: DirListaOrden = await DirListaOrden.query().where('id', params.id).preload('anotaciones').firstOrFail();
        return theDirListaOrden;
    }

    public async findById({ params }: HttpContextContract) {
        const theDirListaOrden: DirListaOrden = await DirListaOrden.findOrFail(params.id);
        return theDirListaOrden;
    }

    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theDirListaOrden: DirListaOrden = await DirListaOrden.findOrFail(params.id);
        theDirListaOrden.orden = body.orden;
        return await theDirListaOrden.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDirListaOrden: DirListaOrden = await DirListaOrden.findOrFail(params.id);
        response.status(204);
        return await theDirListaOrden.delete();
    }
}
