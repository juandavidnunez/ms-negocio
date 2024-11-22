import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departamento from 'App/Models/Departamento'
import { departamentoValidation } from 'App/Validators/DepartamentoValidator'


export default class DepartamentosController {
  // Create a new Departament
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(departamentoValidation)
    const theDepartamento = await Departamento.create(body)
    return theDepartamento
  }

  // Get all Departament
  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let departamentos: Departamento[] = await Departamento.query().paginate(page, perPage)
    return departamentos
  }

  // Get a Departament by id

  public async findById({ params }: HttpContextContract) {
    const theDepartamento = await Departamento.findOrFail(params.id)
    return theDepartamento
  }
  public async show ({params}:HttpContextContract){
    return Departamento.query().where("id",params.id).preload('Municipioes');
  }

  // Update a driver by id

  public async update({ params, request }: HttpContextContract) {
    // Validar el cuerpo de la solicitud
    const body = await request.body()
    // Buscar la Departamentosss por ID
    const theDepartamentos = await Departamento.findOrFail(params.id);
    // Actualizar las propiedades de theDepartamentosss con los valores del cuerpo
    Object.assign(theDepartamentos, body);
    
    await theDepartamentos.save();
    return theDepartamentos;
  }

  // Delete a driver by id

  public async delete({ params, response }: HttpContextContract) {
    const theDepartamento = await Departamento.findOrFail(params.id)
    response.status(204)
    return await theDepartamento.delete()
  }

}
