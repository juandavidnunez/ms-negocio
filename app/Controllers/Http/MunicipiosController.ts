import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipio from 'App/Models/Municipio';
import { MunicipioValidation } from 'App/Validators/MunicipioValidator';
import axios from 'axios';


export default class MunicipiosController {

  public async create({ request }: HttpContextContract) {
    const response = await axios.get<{ id: number, name: string, departmentId: number }[]>("https://api-colombia.com/api/v1/City")
    const municipios = response.data
    console.log(municipios)
    municipios.forEach(async element => {
      await Municipio.create({"id":element.id,"nombre":element.name, "departamento_id":element.departmentId})
    });
    return municipios
  }

  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Municipios: Municipio[] = await Municipio.query().paginate(page, perPage)
    return Municipios
  }
  public async show ({params}:HttpContextContract){
    return Municipio.query().where("id",params.id).preload('sedes')
  }

  public async findById({ params }: HttpContextContract) {
    const theMunicipio = await Municipio.findOrFail(params.id)
    return theMunicipio
  }


  public async update({ params, request }: HttpContextContract) {
    // Validar el cuerpo de la solicitud
    const body = await request.validate(MunicipioValidation);
    // Buscar la Municipio por ID
    const theMunicipio = await Municipio.findOrFail(params.id);
    // Actualizar las propiedades de theMunicipio con los valores del cuerpo
    Object.assign(theMunicipio, body);
    
    await theMunicipio.save();
    return theMunicipio;
}

  public async delete({ params, response }: HttpContextContract) {
    const theMunicipio = await Municipio.findOrFail(params.id)
    response.status(204)
    return await theMunicipio.delete()
  }
}
