import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gasto from 'App/Models/Gasto';
import { GastoValidation } from 'App/Validators/GastoValidator';

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
    const body = await request.validate(GastoValidation);
    const theGasto = await Gasto.findOrFail(params.id)
    theGasto.cantidad = body.cantidad


    return theGasto.save()
  }


  public async delete({ params, response }: HttpContextContract) {
    const theGasto = await Gasto.findOrFail(params.id)
    response.status(204)
    return await theGasto.delete()
  }

}
