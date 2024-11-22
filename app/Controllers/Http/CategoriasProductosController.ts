import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoriaProducto from 'App/Models/CategoriaProducto';

export default class CategoriaProductosProductosController {
    // Create a new category
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.create(body);
        return theCategoriaProducto;
    }

    // Get all categories
    public async findAll({ request }: HttpContextContract) {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input('perPage', 20);
            return await CategoriaProducto.query().paginate(page, perPage);
        } else {
            return await CategoriaProducto.query();
        }
    }

    //Devuelve los productos de una categoriaproducto
    // public async findProductos({ params }: HttpContextContract) {
    //     let theCategoriaProducto: CategoriaProducto = await CategoriaProducto.query().where('id', params.id).preload('productos').firstOrFail();
    //     return theCategoriaProducto;
    // }

    // Get a Category by id
    public async findById({ params }: HttpContextContract) {
        const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(params.id);
        return theCategoriaProducto;
    }

    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.body()
        // Buscar la CategoriaProductos por ID
        const theCategoriaProductos = await CategoriaProducto.findOrFail(params.id);
        // Actualizar las propiedades de theCategoriaProductos con los valores del cuerpo
        Object.assign(theCategoriaProductos, body);
        
        await theCategoriaProductos.save();
        return theCategoriaProductos;
    }

    // Delete a category by id
    public async delete({ params, response }: HttpContextContract) {
        const theCategoriaProducto: CategoriaProducto = await CategoriaProducto.findOrFail(params.id);
        response.status(204);
        return await theCategoriaProducto.delete();
    }
}
