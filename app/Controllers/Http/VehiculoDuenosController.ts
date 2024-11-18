import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehiculoDueno from 'App/Models/VehiculoDueno';
import VehiculoDuenoValidator from 'App/Validators/VehiculoDuenoValidator';

export default class VehiculoDuenosController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(VehiculoDuenoValidator);
        const theVehiculoDueno = await VehiculoDueno.create(body)
        return theVehiculoDueno
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let VehiculoDuenos: VehiculoDueno[] = await VehiculoDueno.query().paginate(page, perPage)
        return VehiculoDuenos
    }


    public async findById({ params }: HttpContextContract) {
        const theVehiculoDueno = await VehiculoDueno.findOrFail(params.id)
        return theVehiculoDueno
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(VehiculoDuenoValidator);
        // Buscar la VehiculoDueno por ID
        const theVehiculoDueno = await VehiculoDueno.findOrFail(params.id);
        // Actualizar las propiedades de theVehiculoDueno con los valores del cuerpo
        Object.assign(theVehiculoDueno, body);
        
        await theVehiculoDueno.save();
        return theVehiculoDueno;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const theVehiculoDueno = await VehiculoDueno.findOrFail(params.id)
        response.status(204)
        return await theVehiculoDueno.delete()
    }
}
