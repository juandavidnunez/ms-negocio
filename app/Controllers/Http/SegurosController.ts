import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Seguro from 'App/Models/Seguro';
import SeguroValidator from 'App/Validators/SeguroValidator';

export default class SegurosController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(SeguroValidator);
        const theSeguro = await Seguro.create(body)
        return theSeguro
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Seguros: Seguro[] = await Seguro.query().paginate(page, perPage)
        return Seguros
    }


    public async findById({ params }: HttpContextContract) {
        const theSeguro = await Seguro.findOrFail(params.id)
        return theSeguro
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(SeguroValidator);
        // Buscar la Seguro por ID
        const theSeguro = await Seguro.findOrFail(params.id);
        // Actualizar las propiedades de theSeguro con los valores del cuerpo
        Object.assign(theSeguro, body);
        
        await theSeguro.save();
        return theSeguro;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const theSeguro = await Seguro.findOrFail(params.id)
        response.status(204)
        return await theSeguro.delete()
    }
}
