import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonaNatural from 'App/Models/PersonaNatural';

export default class PersonasNaturalesController {
    // Create a new natural person
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const thePersonaNatural: PersonaNatural = await PersonaNatural.create(body);
        return thePersonaNatural;
    }

    // Get all natural person
    public async findAll({ request }: HttpContextContract) {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input('perPage', 20);
            return await PersonaNatural.query().paginate(page, perPage);
        } else {
            return await PersonaNatural.query();
        }
    }

    //Devuelve los productos de una personanatural
    // public async findProductos({ params }: HttpContextContract) {
    //     let thePersonaNatural: PersonaNatural = await PersonaNatural.query().where('id', params.id).preload('productos').firstOrFail();
    //     return thePersonaNatural;
    // }

    // Get a natural person by id
    public async findById({ params }: HttpContextContract) {
        const thePersonaNatural: PersonaNatural = await PersonaNatural.findOrFail(params.id);
        return thePersonaNatural;
    }

    // Update a natural person by id
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const thePersonaNatural: PersonaNatural = await PersonaNatural.findOrFail(params.id);
        thePersonaNatural.nombre = body.nombre;
        thePersonaNatural.apellido = body.apellido;
        thePersonaNatural.cedula = body.cedula;
        return await thePersonaNatural.save();
    }

    // Delete a natural person by id
    public async delete({ params, response }: HttpContextContract) {
        const thePersonaNatural: PersonaNatural = await PersonaNatural.findOrFail(params.id);
        response.status(204);
        return await thePersonaNatural.delete();
    }
}
