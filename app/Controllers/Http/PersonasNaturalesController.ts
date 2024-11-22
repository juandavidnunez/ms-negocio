import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonaNatural from 'App/Models/PersonaNatural';
import PersonaNaturalValidator from 'App/Validators/PersonaNaturalValidator';

export default class PersonasNaturalesController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(PersonaNaturalValidator);
        const thePersonaNatural = await PersonaNatural.create(body)
        return thePersonaNatural
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let PersonaNaturals: PersonaNatural[] = await PersonaNatural.query().paginate(page, perPage)
        return PersonaNaturals
    }


    public async findById({ params }: HttpContextContract) {
        const thePersonaNatural = await PersonaNatural.findOrFail(params.id)
        return thePersonaNatural
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(PersonaNaturalValidator);
        // Buscar la PersonaNatural por ID
        const thePersonaNatural = await PersonaNatural.findOrFail(params.id);
        // Actualizar las propiedades de thePersonaNatural con los valores del cuerpo
        Object.assign(thePersonaNatural, body);
        
        await thePersonaNatural.save();
        return thePersonaNatural;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const thePersonaNatural = await PersonaNatural.findOrFail(params.id)
        response.status(204)
        return await thePersonaNatural.delete()
    }
}
