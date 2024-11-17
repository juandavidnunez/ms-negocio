import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Servicio from 'App/Models/Servicio'
import { servicioValidation } from 'App/Validators/ServicioValidator';

export default class ServiciosController {
  //create a new servicio

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(servicioValidation);
    const theServicio: Servicio = await Servicio.create(body);
    return theServicio;
  }

  // Get all servicios
  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let servicio: Servicio[] = await Servicio.query().paginate(page, perPage)
    return servicio
  }
  public async show({ params }: HttpContextContract) {
    return Servicio.query()
      .where("id", params.id)
      .preload('restaurante')
      .preload('hotel');
  }
  
  // Get a servio by id

  public async findById({ params }: HttpContextContract) {
    const theServicio = await Servicio.findOrFail(params.id)
    return theServicio
  }

  // Update a servicios by id

  public async update({ params, request }: HttpContextContract) {
    const body = await request.validate(servicioValidation);
    const theServicio = await Servicio.findOrFail(params.id)
    theServicio.descripcion = body.descripcion ?? theServicio.descripcion
    theServicio.estado_servicio = body.estado_servicio
    return theServicio.save()
}

  // Delete a servicios by id

  public async delete({ params, response }: HttpContextContract) {
    const theServicio = await Servicio.findOrFail(params.id)
    response.status(204)
    return await theServicio.delete()
  }
}
