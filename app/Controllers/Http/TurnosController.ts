import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Turno from "App/Models/Turno";

export default class TurnosController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(TurnoValidator);
        const theTurno = await Turno.create(body)
        return theTurno
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Turnos: Turno[] = await Turno.query().paginate(page, perPage)
        return Turnos
    }


    public async findById({ params }: HttpContextContract) {
        const theTurno = await Turno.findOrFail(params.id)
        return theTurno
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(TurnoValidator);
        // Buscar la Turno por ID
        const theTurno = await Turno.findOrFail(params.id);
        // Actualizar las propiedades de theTurno con los valores del cuerpo
        Object.assign(theTurno, body);
        
        await theTurno.save();
        return theTurno;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const theTurno = await Turno.findOrFail(params.id)
        response.status(204)
        return await theTurno.delete()
    }
}
