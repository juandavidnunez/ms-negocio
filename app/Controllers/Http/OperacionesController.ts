import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operacion from 'App/Models/Operacion';

export default class OperacionesController {
    // Create a new operation
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theOperacion: Operacion = await Operacion.create(body);
        return theOperacion;
    }

    // Get all categories
    public async findAll({ request }: HttpContextContract) {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input('perPage', 20);
            return await Operacion.query().paginate(page, perPage);
        } else {
            return await Operacion.query();
        }
    }

    //Devuelve los productos de una operacion
    // public async findProductos({ params }: HttpContextContract) {
    //     let theOperacion: Operacion = await Operacion.query().where('id', params.id).preload('productos').firstOrFail();
    //     return theOperacion;
    // }

    // Get a Category by id
    public async findById({ params }: HttpContextContract) {
        const theOperacion: Operacion = await Operacion.findOrFail(params.id);
        return theOperacion;
    }

    // Update a operation by id
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theOperacion: Operacion = await Operacion.findOrFail(params.id);
        // theOperacion.nombre = body.nombre;
        // theOperacion.descripcion = body.descripcion;
        return await theOperacion.save();
    }

    // Delete a category by id
    public async delete({ params, response }: HttpContextContract) {
        const theOperacion: Operacion = await Operacion.findOrFail(params.id);
        response.status(204);
        return await theOperacion.delete();
    }

      public async deleteAllVehiculo({ params, response }: HttpContextContract) {
                const vehiculoConductores = await Operacion.query().where('vehiculo_id', params.id);
                // Verificar si se encontraron registros
                if (vehiculoConductores.length === 0) {
                    return response.status(404).send({ message: 'No se encontraron registros para eliminar.' });
                }
                return await Operacion.query().where('vehiculo_id', params.id).delete();
                
            }
}
