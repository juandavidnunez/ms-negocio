import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import VehiculoConductor from "App/Models/VehiculoConductor";
import VehiculoConductorValidator from 'App/Validators/VehiculoConductorValidator';

export default class VehiculoConductorsController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(VehiculoConductorValidator);
        const theVehiculoConductor = await VehiculoConductor.create(body)
        return theVehiculoConductor
    }

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let VehiculoConductors: VehiculoConductor[] = await VehiculoConductor.query().paginate(page, perPage)
        return VehiculoConductors
    }


    public async findById({ params }: HttpContextContract) {
        const theVehiculoConductor = await VehiculoConductor.findOrFail(params.id)
        return theVehiculoConductor
    }


    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(VehiculoConductorValidator);
        // Buscar la VehiculoConductor por ID
        const theVehiculoConductor = await VehiculoConductor.findOrFail(params.id);
        // Actualizar las propiedades de theVehiculoConductor con los valores del cuerpo
        Object.assign(theVehiculoConductor, body);

        await theVehiculoConductor.save();
        return theVehiculoConductor;
    }

    public async delete({ params, response }: HttpContextContract) {
        const theVehiculoConductor = await VehiculoConductor.findOrFail(params.id)
        response.status(204)
        return await theVehiculoConductor.delete()
    }

    public async deleteAllVehiculo({ params, response }: HttpContextContract) {
        const vehiculoConductores = await VehiculoConductor.query().where('vehiculo_id', params.id);
        // Verificar si se encontraron registros
        if (vehiculoConductores.length === 0) {
            return response.status(404).send({ message: 'No se encontraron registros para eliminar.' });
        }
        return await VehiculoConductor.query().where('vehiculo_id', params.id).delete();
        
    }

}
