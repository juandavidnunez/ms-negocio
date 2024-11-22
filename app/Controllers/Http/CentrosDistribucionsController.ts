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
    return CentrosDistribucion.query().where("id",params.id).preload('direccion')
  }


  public async findById({ params }: HttpContextContract) {
    const theCentrosDistribucion = await CentrosDistribucion.findOrFail(params.id)
    return theCentrosDistribucion
  }


  public async update({ params, request }: HttpContextContract) {
    // Validar el cuerpo de la solicitud
    const body = await request.body()
    // Buscar la CentrosDistribucionss por ID
    const theCentrosDistribucions = await CentrosDistribucion.findOrFail(params.id);
    // Actualizar las propiedades de theCentrosDistribucionss con los valores del cuerpo
    Object.assign(theCentrosDistribucions, body);
    
    await theCentrosDistribucions.save();
    return theCentrosDistribucions;
  }
  public async delete({ params, response }: HttpContextContract) {
    const theCentrosDistribucion = await CentrosDistribucion.findOrFail(params.id)
    response.status(204)
    return await theCentrosDistribucion.delete()
  }

}