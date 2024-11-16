import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Producto from 'App/Models/Producto';

export default class ProductosController {
    // Create a new category
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theProducto: Producto = await Producto.create(body);
        return theProducto;
    }

    // Get all categories
    public async findAll({ request }: HttpContextContract) {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input('perPage', 20);
            return await Producto.query().paginate(page, perPage);
        } else {
            return await Producto.query();
        }
    }

    // //Devuelve los productos de una producto
    // public async findProductos({ params }: HttpContextContract) {
    //     let theProducto: Producto = await Producto.query().where('id', params.id).preload('productos').firstOrFail();
    //     return theProducto;
    // }

    // Get a Category by id
    public async findById({ params }: HttpContextContract) {
        const theProducto: Producto = await Producto.findOrFail(params.id);
        return theProducto;
    }

    // Update a category by id
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theProducto: Producto = await Producto.findOrFail(params.id);
        theProducto.nombre = body.nombre;
        theProducto.descripcion = body.descripcion;
        return await theProducto.save();
    }

    // Delete a category by id
    public async delete({ params, response }: HttpContextContract) {
        const theProducto: Producto = await Producto.findOrFail(params.id);
        response.status(204);
        return await theProducto.delete();
    }
}
