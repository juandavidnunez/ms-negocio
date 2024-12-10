import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departamento from 'App/Models/Departamento'
import { departamentoValidation } from 'App/Validators/DepartamentoValidator'
import axios from 'axios'


export default class DepartamentosController {
  // Create a new Departament
  public async create({ request }: HttpContextContract) {
    const response = await axios.get<{ id: number, name: string }[]>("https://api-colombia.com/api/v1/Department")
    const departamentos = response.data
    console.log(departamentos)
    departamentos.forEach(async element => {
      await Departamento.create({"id":element.id,"nombre":element.name})
    });
    return departamentos
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
