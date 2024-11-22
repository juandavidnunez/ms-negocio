import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Servicio from 'App/Models/Servicio'
import { servicioValidation } from 'App/Validators/ServicioValidator';

export default class ServiciosController {
  //create a new servicio

  public async create({ request }: HttpContextContract) {
    const body = await request.validate(servicioValidation);
    const theServicio = await Servicio.create(body)
    return theServicio
}

public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Servicios: Servicio[] = await Servicio.query().paginate(page, perPage)
    return Servicios
}


public async findById({ params }: HttpContextContract) {
    const theServicio = await Servicio.findOrFail(params.id)
    return theServicio
}


public async update({ params, request }: HttpContextContract) {
    // Validar el cuerpo de la solicitud
    const body = await request.validate(servicioValidation);
    // Buscar la Servicio por ID
    const theServicio = await Servicio.findOrFail(params.id);
    // Actualizar las propiedades de theServicio con los valores del cuerpo
    Object.assign(theServicio, body);
    
    await theServicio.save();
    return theServicio;
}

  public async delete({ params, response }: HttpContextContract) {
    const theServicio = await Servicio.findOrFail(params.id)
    response.status(204)
    return await theServicio.delete()
}
}
