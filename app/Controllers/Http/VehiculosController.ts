import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehiculo from 'App/Models/Vehiculo';
import Ws from 'App/Services/Ws';
import VehiculoValidator from 'App/Validators/VehiculoValidator';

export default class VehiculosController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(VehiculoValidator);
        const theVehiculo = await Vehiculo.create(body)
        return theVehiculo
    }

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Vehiculos: Vehiculo[] = await Vehiculo.query().paginate(page, perPage)
        return Vehiculos
    }


    public async findById({ params }: HttpContextContract) {
        const theVehiculo = await Vehiculo.findOrFail(params.id)
        return theVehiculo
    }


    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(VehiculoValidator);
        // Buscar la Vehiculo por ID
        const theVehiculo = await Vehiculo.findOrFail(params.id);
        // Actualizar las propiedades de theVehiculo con los valores del cuerpo
        Object.assign(theVehiculo, body);

        await theVehiculo.save();
        return theVehiculo;
    }

    public async delete({ params, response }: HttpContextContract) {
        const theVehiculo = await Vehiculo.findOrFail(params.id)
        response.status(204)
        return await theVehiculo.delete()
    }
    
    public async test({ response }: HttpContextContract) {
        Ws.io.emit('notifications', { message: 'Nueva notificación' })

        response.status(200);
        return {
            "message": "ok"
        };
    }
}
