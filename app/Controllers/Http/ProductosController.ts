import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente';
import Lote from 'App/Models/Lote';
import Producto from 'App/Models/Producto';
import { productoValidation } from 'App/Validators/ProductoValidator';

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
            const page = request.input('page', data.page);
            const perPage = request.input('perPage', data.per_page);
            return await Producto.query().paginate(page, perPage);
        } else {
            const page = request.input('page', 1);
            const perPage = request.input('perPage', 20);
            return await Producto.query().paginate(page, perPage);
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
        // Validar el cuerpo de la solicitud
        const body = await request.validate(productoValidation);
        // Buscar la Producto por ID
        const theProducto = await Producto.findOrFail(params.id);
        // Actualizar las propiedades de theProducto con los valores del cuerpo
        Object.assign(theProducto, body);
        
        await theProducto.save();
        return theProducto;
    }
    // Delete a category by id
    public async delete({ params, response }: HttpContextContract) {
        const theProducto: Producto = await Producto.findOrFail(params.id);
        response.status(204);
        return await theProducto.delete();
    }

      public async productosLote({ params, response, request }: HttpContextContract) {
            const page = request.input('page', 1); // Página actual
            const perPage = request.input('perPage', 20); // Número de registros por página
          
            // Verificar que el lote existe
            const lote = await Lote.findOrFail(params.id);
          
            const lotes = await lote
              .related('productos')
              .query()
              .paginate(page, perPage); // Paginación directamente en la relación
          
            return response.status(200).json(lotes); // Retorna la respuesta paginada
        }
    
        public async productosCliente({ params, response, request }: HttpContextContract) {
            const page = request.input('page', 1); // Página actual
            const perPage = request.input('perPage', 20); // Número de registros por página
          
            const cliente = await Cliente.findOrFail(params.id);
          
            // Paginar los vehículos relacionados
            const lotes = await  cliente
              .related('producto')
              .query()
              .paginate(page, perPage); // Paginación directamente en la relación
          
            return response.status(200).json(lotes); // Retorna la respuesta paginada
        }
    
}
