import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Anotacion from 'App/Models/Anotacion';
import { AnotacionValidation } from 'App/Validators/AnotacionValidator';

export default class AnotacionesController {
    //create anotation
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(AnotacionValidation);
        const theAnotacion: Anotacion = await Anotacion.create(body);
        return theAnotacion
    }

    public async delete({ params, response }: HttpContextContract) {
        const theAnotacion: Anotacion = await Anotacion.findOrFail(params.id);
        response.status(204);
        return await theAnotacion.delete();
    }
}
