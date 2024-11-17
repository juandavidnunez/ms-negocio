import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruta from 'App/Models/Ruta';
import RutaValidator from 'App/Validators/RutaValidator';

export default class RutasController {

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(RutaValidator);
        const theRuta = await Ruta.create(body)
        return theRuta
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Rutas: Ruta[] = await Ruta.query().paginate(page, perPage)
        return Rutas
    }


    public async findById({ params }: HttpContextContract) {
        const theRuta = await Ruta.findOrFail(params.id)
        return theRuta
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(RutaValidator);
        // Buscar la ruta por ID
        const theRuta = await Ruta.findOrFail(params.id);
        // Actualizar las propiedades de theRuta con los valores del cuerpo
        Object.assign(theRuta, body);
        
        await theRuta.save();
        return theRuta;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const theRuta = await Ruta.findOrFail(params.id)
        response.status(204)
        return await theRuta.delete()
    }
    
}
