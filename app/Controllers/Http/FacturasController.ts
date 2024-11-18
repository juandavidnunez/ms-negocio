import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Factura from "App/Models/Factura";
import FacturaValidator from 'App/Validators/FacturaValidator';

export default class FacturasController {

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(FacturaValidator);
        const theFactura = await Factura.create(body)
        return theFactura
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Facturas: Factura[] = await Factura.query().paginate(page, perPage)
        return Facturas
    }


    public async findById({ params }: HttpContextContract) {
        const theFactura = await Factura.findOrFail(params.id)
        return theFactura
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(FacturaValidator);
        // Buscar la Factura por ID
        const theFactura = await Factura.findOrFail(params.id);
        // Actualizar las propiedades de theFactura con los valores del cuerpo
        Object.assign(theFactura, body);
        
        await theFactura.save();
        return theFactura;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const theFactura = await Factura.findOrFail(params.id)
        response.status(204)
        return await theFactura.delete()
    }
}
