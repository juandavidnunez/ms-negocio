import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria';

export default class CategoriasController {
    // Create a new category
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCategoria: Categoria = await Categoria.create(body);
        return theCategoria;
    }

    // Get all categories
    public async findAll({ request }: HttpContextContract) {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input('perPage', 20);
            return await Categoria.query().paginate(page, perPage);
        } else {
            return await Categoria.query();
        }
    }

    //Devuelve los productos de una categoria
    public async findProductos({ params }: HttpContextContract) {
        let theCategoria: Categoria = await Categoria.query().where('id', params.id).preload('productos').firstOrFail();
        return theCategoria;
    }

    // Get a Category by id
    public async findById({ params }: HttpContextContract) {
        const theCategoria: Categoria = await Categoria.findOrFail(params.id);
        return theCategoria;
    }

    // Update a category by id
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theCategoria: Categoria = await Categoria.findOrFail(params.id);
        theCategoria.nombre = body.nombre;
        theCategoria.descripcion = body.descripcion;
        return await theCategoria.save();
    }

    // Delete a category by id
    public async delete({ params, response }: HttpContextContract) {
        const theCategoria: Categoria = await Categoria.findOrFail(params.id);
        response.status(204);
        return await theCategoria.delete();
    }
}
