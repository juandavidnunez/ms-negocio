import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';
import ConductorValidator from 'App/Validators/ConductorValidator';

export default class ConductoresController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(ConductorValidator);
        const theConductor = await Conductor.create(body)
        return theConductor
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Conductors: Conductor[] = await Conductor.query().paginate(page, perPage)
        return Conductors
    }


    public async findById({ params }: HttpContextContract) {
        const theConductor = await Conductor.findOrFail(params.id)
        return theConductor
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(ConductorValidator);
        // Buscar la Conductor por ID
        const theConductor = await Conductor.findOrFail(params.id);
        // Actualizar las propiedades de theConductor con los valores del cuerpo
        Object.assign(theConductor, body);
        
        await theConductor.save();
        return theConductor;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const theConductor = await Conductor.findOrFail(params.id)
        response.status(204)
        return await theConductor.delete()
    }
}
