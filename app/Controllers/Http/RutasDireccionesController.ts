import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RutaDireccion from 'App/Models/RutaDireccion';

export default class RutasDireccionesController {
    // Create a new category
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theRutaDireccion: RutaDireccion = await RutaDireccion.create(body);
        return theRutaDireccion;
    }

    // Get all categories
    public async findAll({ request }: HttpContextContract) {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input('perPage', 20);
            return await RutaDireccion.query().paginate(page, perPage);
        } else {
            return await RutaDireccion.query();
        }
    }

    //Devuelve los productos de una rutadireccion
    // public async findProductos({ params }: HttpContextContract) {
    //     let theRutaDireccion: RutaDireccion = await RutaDireccion.query().where('id', params.id).preload('productos').firstOrFail();
    //     return theRutaDireccion;
    // }

    // Get a Category by id
    public async findById({ params }: HttpContextContract) {
        const theRutaDireccion: RutaDireccion = await RutaDireccion.findOrFail(params.id);
        return theRutaDireccion;
    }

    // Update a category by id
    // public async update({ params, request }: HttpContextContract) {
    //     const body = request.body();
    //     const theRutaDireccion: RutaDireccion = await RutaDireccion.findOrFail(params.id);
    //     return await theRutaDireccion.save();
    // }

    // Delete a category by id
    public async delete({ params, response }: HttpContextContract) {
        const theRutaDireccion: RutaDireccion = await RutaDireccion.findOrFail(params.id);
        response.status(204);
        return await theRutaDireccion.delete();
    }
}
