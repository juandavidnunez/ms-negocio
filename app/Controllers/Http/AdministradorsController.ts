import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Administrador from 'App/Models/Administrador';
import { AdministradorValidator } from 'App/Validators/AdministradorValidator'
import env from '@ioc:Adonis/Core/Env'
import axios from 'axios';
export default class AdministradorsController {


  public async create({ request, response }: HttpContextContract) {
    try {
      let body = request.only(['name', 'email', 'password']);
      const token = request.header('Authorization');
      const toke=token
  
      if (!token) {
        return response.status(401).send('Token de acceso faltante');
      }

      // Crear usuario
      const userResponse = await axios.post(
        `${env.get('MS_SECURITY')}/api/users`
        ,
        {
          name: body.name,
          email: body.email,
          password: body.password,
        },
        {
          headers: {
            'Authorization': token,
          },
        }
      );
  
      // Obtener el ID del usuario desde la respuesta
      const userId = userResponse.data._id;
  
      // Verificar que el ID del usuario no sea undefined
      if (!userId) {
        return response.status(500).send('Error al crear el usuario, ID no encontrado');
      }
      console.log(toke)

      // Asignar rol al usuario creado
      const roleResponse = await axios.post(
        `${env.get('MS_SECURITY')}/api/user_roles/user/${userId}/role/${env.get('ADMINISTRADOR_ROLE_ID')}`,
        {},
        {
          headers: {
            'Authorization': toke,
          },
        }
      );
  
      const tempBody = await request.validate(AdministradorValidator);
      tempBody.security_id = userId;
      const theAdministrador = await Administrador.create(tempBody)
      return theAdministrador

    } catch (error) {
      console.error('Error al consumir la API de Seguridad:', error);
  
      // Manejo de errores con detalles
      const status = error.response?.status || 500;
      const message = error.response?.data || 'Error al consumir la API de Seguridad';
  
      response.status(status).send(message);
    }
  }
  
  public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Administradors: Administrador[] = await Administrador.query().paginate(page, perPage)
    return Administradors
}


public async findById({ params }: HttpContextContract) {
    const theAdministrador = await Administrador.findOrFail(params.id)
    return theAdministrador
}


public async update({ params, request }: HttpContextContract) {
    // Validar el cuerpo de la solicitud
    const body = await request.validate(AdministradorValidator);
    // Buscar la Administrador por ID
    const theAdministrador = await Administrador.findOrFail(params.id);
    // Actualizar las propiedades de theAdministrador con los valores del cuerpo
    Object.assign(theAdministrador, body);
    
    await theAdministrador.save();
    return theAdministrador;
}

  public async delete({ params, response }: HttpContextContract) {
    const theAdministrador = await Administrador.findOrFail(params.id)
    response.status(204)
    return await theAdministrador.delete()
}
    
}
