import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lote from 'App/Models/Lote';

export default class LotesController {
        // Create a new category
        public async create({ request }: HttpContextContract) {
            const body = request.body();
            const theLote: Lote = await Lote.create(body);
            return theLote;
        }
    
        // Get all categories
        public async findAll({ request }: HttpContextContract) {
            const data = request.all();
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input('perPage', 20);
                return await Lote.query().paginate(page, perPage);
            } else {
                return await Lote.query();
            }
        }
    
        //Devuelve los productos de un lote
        // public async findProductos({ params }: HttpContextContract) {
        //     let theLote: Lote = await Lote.query().where('id', params.id).preload('productos').firstOrFail();
        //     return theLote;
        // }
    
        // Get a Category by id
        public async findById({ params }: HttpContextContract) {
            // const theLote: Lote = await Lote.findOrFail(params.id);
            // return theLote;
            return await Lote.findOrFail(params.id);

            //para que retorne el lote junto con los productos asociados a el
            // return await Lote.query().where('id', params.id).preload('productos').firstOrFail();
        }
    
        public async update({ params, request }: HttpContextContract) {
            // Validar el cuerpo de la solicitud
            const body = await request.body()
            // Buscar la Lotesss por ID
            const theLotes = await Lote.findOrFail(params.id);
            // Actualizar las propiedades de theLotesss con los valores del cuerpo
            Object.assign(theLotes, body);
            
            await theLotes.save();
            return theLotes;
          }
        
        // Delete a category by id
        public async delete({ params, response }: HttpContextContract) {
            const theLote: Lote = await Lote.findOrFail(params.id);
            response.status(204);
            return await theLote.delete();
        }
}
