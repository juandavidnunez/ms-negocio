import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conductor from 'App/Models/Conductor';
import ConductorValidator from 'App/Validators/ConductorValidator'
import env from '@ioc:Adonis/Core/Env'
import axios from 'axios';
export default class ConductorsController {

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
        `${env.get('MS_SECURITY')}/api/user_roles/user/${userId}/role/${env.get('CONDUCTOR_ROLE_ID')}`,
        {},
        {
          headers: {
            'Authorization': toke,
          },
        }
      );
  
      const tempBody = await request.validate(ConductorValidator);
      tempBody.security_id = userId;
      const theConductor = await Conductor.create(tempBody)
      return theConductor

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
        let Conductors: Conductor[] = await Conductor.query().paginate(page, perPage)
        return Conductors
    }


    public async findById({ params }: HttpContextContract) {
        const theConductor = await Conductor.findOrFail(params.id)
        return theConductor
    }


    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(ConductorValidator);
        // Buscar la Conductor por ID
        const theConductor = await Conductor.findOrFail(params.id);
        // Actualizar las propiedades de theConductor con los valores del cuerpo
        Object.assign(theConductor, body);
        
        await theConductor.save();
        return theConductor;
    }

    public async delete({ params, response }: HttpContextContract) {
        const theConductor = await Conductor.findOrFail(params.id)
        response.status(204)
        return await theConductor.delete()
    }
}