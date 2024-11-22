 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel';
import { hotelValidation } from 'App/Validators/HotelValidator';

export default class HotelsController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(hotelValidation);
    const theHotel = await Hotel.create(body)
    return theHotel
}

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Hotels: Hotel[] = await Hotel.query().paginate(page, perPage)
    return Hotels
  }


  public async findById({ params }: HttpContextContract) {
    const theHotel = await Hotel.findOrFail(params.id)
    return theHotel
  }


  public async update({ params, request }: HttpContextContract) {
    // Validar el cuerpo de la solicitud
    const body = await request.body()
    // Buscar la Hotelsss por ID
    const theHotels = await Hotel.findOrFail(params.id);
    // Actualizar las propiedades de theHotelsss con los valores del cuerpo
    Object.assign(theHotels, body);
    
    await theHotels.save();
    return theHotels;
  }



  public async delete({ params, response }: HttpContextContract) {
    const theHotel = await Hotel.findOrFail(params.id)
    response.status(204)
    return await theHotel.delete()
  }

}
