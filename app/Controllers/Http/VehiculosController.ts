import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';
import Contrato from 'App/Models/Contrato';
import Dueno from 'App/Models/Dueno';
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

    public async vehiculosConductor({ params, response, request }: HttpContextContract) {
        const page = request.input('page', 1); // Página actual
        const perPage = request.input('perPage', 20); // Número de registros por página
      
        // Verificar que el conductor existe
        const conductor = await Conductor.findOrFail(params.id);
      
        // Paginar los vehículos relacionados
        const vehiculos = await conductor
          .related('vehiculos')
          .query()
          .paginate(page, perPage); // Paginación directamente en la relación
      
        return response.status(200).json(vehiculos); // Retorna la respuesta paginada
    }

    public async vehiculosDueno({ params, response, request }: HttpContextContract) {
        const page = request.input('page', 1); // Página actual
        const perPage = request.input('perPage', 20); // Número de registros por página
      
        // Verificar que el dueno existe
        const dueno = await Dueno.findOrFail(params.id);
      
        // Paginar los vehículos relacionados
        const vehiculos = await dueno
          .related('vehiculos')
          .query()
          .paginate(page, perPage); // Paginación directamente en la relación
      
        return response.status(200).json(vehiculos); // Retorna la respuesta paginada
    }

    public async vehiculosContrato({ params, response, request }: HttpContextContract) {
        const page = request.input('page', 1); // Página actual
        const perPage = request.input('perPage', 20); // Número de registros por página
      
        // Verificar que el contrato existe
        const contrato = await Contrato.findOrFail(params.id);
      
        // Paginar los vehículos relacionados
        const vehiculos = await contrato
          .related('vehiculos')
          .query()
          .paginate(page, perPage); // Paginación directamente en la relación
      
        return response.status(200).json(vehiculos); // Retorna la respuesta paginada
    }
}
