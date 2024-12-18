import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DirListaOrden from 'App/Models/DirListaOrden';
import Lote from 'App/Models/Lote';
import Producto from 'App/Models/Producto';
import Ruta from 'App/Models/Ruta';
import Ws from 'App/Services/Ws';
import { loteValidation } from 'App/Validators/LoteValidator';
import { DateTime } from 'luxon';

export default class LotesController {
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(loteValidation);
        if (body.fecha_creacion == null) {
            body.fecha_creacion = DateTime.now().startOf('day'); // Crea un objeto DateTime
        }
        const theLote = await Lote.create(body)
        return theLote
    }
    
    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Lotes: Lote[] = await Lote.query().paginate(page, perPage)
        return Lotes
    }


    public async findById({ params }: HttpContextContract) {
        const theLote = await Lote.findOrFail(params.id)
        return theLote
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(loteValidation);
        // Buscar la Lote por ID
        const theLote = await Lote.findOrFail(params.id);
        // Actualizar las propiedades de theLote con los valores del cuerpo
        Object.assign(theLote, body);
        
        await theLote.save();
        return theLote;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const theLote = await Lote.findOrFail(params.id)
        response.status(204)
        return await theLote.delete()
    }
  public async test({ response }: HttpContextContract) {
        Ws.io.emit('notifications', { message: 'Nueva notificación' })

        response.status(200);
        return {
            "message": "ok"
        };
    }

    public async lotesRutas({ params, response, request }: HttpContextContract) {
        const page = request.input('page', 1); // Página actual
        const perPage = request.input('perPage', 20); // Número de registros por página
      
        // Verificar que el ruta existe
        const ruta = await Ruta.findOrFail(params.id);
      
        const lotes = await ruta
          .related('lotes')
          .query()
          .paginate(page, perPage); // Paginación directamente en la relación
      
        return response.status(200).json(lotes); // Retorna la respuesta paginada
    }

    public async lotesDirlistaOrden({ params, response, request }: HttpContextContract) {
        const page = request.input('page', 1); // Página actual
        const perPage = request.input('perPage', 20); // Número de registros por página
      
        // Verificar que el dueno existe
        const dir_listar_orden = await DirListaOrden.findOrFail(params.id);
      
        // Paginar los vehículos relacionados
        const lotes = await  dir_listar_orden
          .related('lote')
          .query()
          .paginate(page, perPage); // Paginación directamente en la relación
      
        return response.status(200).json(lotes); // Retorna la respuesta paginada
    }

    public async lotesProductos({ params, response, request }: HttpContextContract) {
        const page = request.input('page', 1); // Página actual
        const perPage = request.input('perPage', 20); // Número de registros por página
      
        // Verificar que el producto existe
        const producto = await Producto.findOrFail(params.id);
      
        // Paginar los vehículos relacionados
        const lotes = await producto
          .related('lote')
          .query()
          .paginate(page, perPage); // Paginación directamente en la relación
      
        return response.status(200).json(lotes); // Retorna la respuesta paginada
    }
    
}
