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
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.body()
        // Buscar la Categoria por ID
        const theCategoria = await Categoria.findOrFail(params.id);
        // Actualizar las propiedades de theCategoria con los valores del cuerpo
        Object.assign(theCategoria, body);
        
        await theCategoria.save();
        return theCategoria;
    }

    // Delete a category by id
    public async delete({ params, response }: HttpContextContract) {
        const theCategoria: Categoria = await Categoria.findOrFail(params.id);
        response.status(204);
        return await theCategoria.delete();
    }
}
