import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CentrosDistribucion from 'App/Models/CentrosDistribucion';
import { CentrosDistribucionValidation } from 'App/Validators/CentrosDistribucionValidator';

export default class CentrosDistribucionsController {

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(CentrosDistribucionValidation);
    const theCentrosDistribucion = await CentrosDistribucion.create(body)
    return theCentrosDistribucion
}

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let CentrosDistribucions: CentrosDistribucion[] = await CentrosDistribucion.query().paginate(page, perPage)
    return CentrosDistribucions
  }
  public async show ({params}:HttpContextContract){
    return CentrosDistribucion.query().where("id",params.id).preload('Direcciones');
  }


  public async findById({ params }: HttpContextContract) {
    const theCentrosDistribucion = await CentrosDistribucion.findOrFail(params.id)
    return theCentrosDistribucion
  }


  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(CentrosDistribucionValidation);
    const theCentrosDistribucion = await CentrosDistribucion.findOrFail(params.id)
    theCentrosDistribucion.nombre = body.nombre
    return theCentrosDistribucion.save()
  }


  public async delete({ params, response }: HttpContextContract) {
    const theCentrosDistribucion = await CentrosDistribucion.findOrFail(params.id)
    response.status(204)
    return await theCentrosDistribucion.delete()
  }

}