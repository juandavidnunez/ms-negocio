import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Factura from "App/Models/Factura";
import FacturaValidator from 'App/Validators/FacturaValidator';
import Env from '@ioc:Adonis/Core/Env'
import axios from 'axios';
import Cuota from 'App/Models/Cuota';

export default class FacturasController {

    public async pagar({ request, response }: HttpContextContract) {
        try {
            let body = request.body();

            const pagos_host = Env.get('PAGOS_HOST');
            // Hacer una solicitud POST a la API de Epyco

            //Quitamos la id de la cuota
            const cuota_id = body.cuota_id
            delete body.cuota_id

            // Verificar que el valor de pago es el indicado
            const theCuota = await Cuota.findOrFail(cuota_id)
            if(!theCuota){
                throw new Error("No se encuentra la cuota")
            }
            if(theCuota.valor != body.valor){
                throw new Error("El valor de la cuota no es el mismo a pagar")
            }

            const adonisResponse = await axios.post(pagos_host, {
                body
            });
        
            // Crear el objeto factura con los datos necesarios
            const factura = {
                "fecha_pago": adonisResponse.data?.data?.fecha || null, // Usar null si no existe
                "valor": adonisResponse.data?.data?.valor || null, // Usar null si no existe
                "info": adonisResponse.data || null, // Usar null si no existe
                "success": adonisResponse.data?.status || false, // Usar false si no existe
                "cuota_id": cuota_id // Usar null si no existe
            };
        
            // Guardar la factura
            Factura.create(factura)

        } catch (error) {
            // Manejar errores
            console.error('Error al consumir la API de Pagos:', error);
            response.status(error.response?.status || 500).send('Error al consumir la API de Adonis');
        }
    }

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
