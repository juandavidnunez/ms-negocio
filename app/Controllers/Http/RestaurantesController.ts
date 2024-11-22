import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Restaurante from 'App/Models/Restaurante';
import { restauranteValidation } from 'App/Validators/RestauranteValidator';

export default class RestaurantesController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(restauranteValidation);
    const theRestaurante = await Restaurante.create(body)
    return theRestaurante
}

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Restaurantes: Restaurante[] = await Restaurante.query().paginate(page, perPage)
    return Restaurantes
  }


  public async findById({ params }: HttpContextContract) {
    const theRestaurante = await Restaurante.findOrFail(params.id)
    return theRestaurante
  }



  public async update({ params, request }: HttpContextContract) {
    // Validar el cuerpo de la solicitud
    const body = await request.body()
    // Buscar la Restaurantesss por ID
    const theRestaurantes = await Restaurante.findOrFail(params.id);
    // Actualizar las propiedades de theRestaurantesss con los valores del cuerpo
    Object.assign(theRestaurantes, body);
    
    await theRestaurantes.save();
    return theRestaurantes;
  }

  public async delete({ params, response }: HttpContextContract) {
    const theRestaurante = await Restaurante.findOrFail(params.id)
    response.status(204)
    return await theRestaurante.delete()
  }

}
