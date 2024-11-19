import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota';
import CuotaValidator from 'App/Validators/CuotaValidator';

export default class CuotasController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(CuotaValidator);
        const theCuota = await Cuota.create(body)
        return theCuota
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Cuotas: Cuota[] = await Cuota.query().paginate(page, perPage)
        return Cuotas
    }


    public async findById({ params }: HttpContextContract) {
        const theCuota = await Cuota.findOrFail(params.id)
        return theCuota
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(CuotaValidator);
        // Buscar la Cuota por ID
        const theCuota = await Cuota.findOrFail(params.id);
        // Actualizar las propiedades de theCuota con los valores del cuerpo
        Object.assign(theCuota, body);
        
        await theCuota.save();
        return theCuota;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const theCuota = await Cuota.findOrFail(params.id)
        response.status(204)
        return await theCuota.delete()
    }
}
