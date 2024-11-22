import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gasto from 'App/Models/Gasto';
import { GastoValidation } from 'App/Validators/GastoValidator';
import { hotelValidation } from 'App/Validators/HotelValidator';

export default class GastosController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(GastoValidation);
    const theGasto = await Gasto.create(body)
    return theGasto
}

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Gastos: Gasto[] = await Gasto.query().paginate(page, perPage)
    return Gastos
  }


  public async findById({ params }: HttpContextContract) {
    const theGasto = await Gasto.findOrFail(params.id)
    return theGasto
  }


  public async update({ params, request }: HttpContextContract) {
    // Validar el cuerpo de la solicitud
    const body = await request.body()
    // Buscar la Gastosss por ID
    const theGastos = await Gasto.findOrFail(params.id);
    // Actualizar las propiedades de theGastosss con los valores del cuerpo
    Object.assign(theGastos, body);
    
    await theGastos.save();
    return theGastos;
  }


  public async delete({ params, response }: HttpContextContract) {
    const theGasto = await Gasto.findOrFail(params.id)
    response.status(204)
    return await theGasto.delete()
  }

}
