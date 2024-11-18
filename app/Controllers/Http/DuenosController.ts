import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Dueno from "App/Models/Dueno";
import DuenoValidator from 'App/Validators/DuenoValidator';

export default class DuenosController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(DuenoValidator);
        const theDueno = await Dueno.create(body)
        return theDueno
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Duenos: Dueno[] = await Dueno.query().paginate(page, perPage)
        return Duenos
    }


    public async findById({ params }: HttpContextContract) {
        const theDueno = await Dueno.findOrFail(params.id)
        return theDueno
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(DuenoValidator);
        // Buscar la Dueno por ID
        const theDueno = await Dueno.findOrFail(params.id);
        // Actualizar las propiedades de theDueno con los valores del cuerpo
        Object.assign(theDueno, body);
        
        await theDueno.save();
        return theDueno;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const theDueno = await Dueno.findOrFail(params.id)
        response.status(204)
        return await theDueno.delete()
    }
}
