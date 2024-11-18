import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contrato from 'App/Models/Contrato';
import ContratoValidator from 'App/Validators/ContratoValidator';

export default class ContratoesController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(ContratoValidator);
        const theContrato = await Contrato.create(body)
        return theContrato
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Contratos: Contrato[] = await Contrato.query().paginate(page, perPage)
        return Contratos
    }


    public async findById({ params }: HttpContextContract) {
        const theContrato = await Contrato.findOrFail(params.id)
        return theContrato
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(ContratoValidator);
        // Buscar la Contrato por ID
        const theContrato = await Contrato.findOrFail(params.id);
        // Actualizar las propiedades de theContrato con los valores del cuerpo
        Object.assign(theContrato, body);
        
        await theContrato.save();
        return theContrato;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const theContrato = await Contrato.findOrFail(params.id)
        response.status(204)
        return await theContrato.delete()
    }
}
