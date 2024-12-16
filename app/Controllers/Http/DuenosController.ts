import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dueno from 'App/Models/Dueno';
import DuenoValidator from 'App/Validators/DuenoValidator'
import env from '@ioc:Adonis/Core/Env'
import axios from 'axios';
import Vehiculo from 'App/Models/Vehiculo';
export default class DuenosController {


  public async create({ request, response }: HttpContextContract) {
    try {
      let body = request.only(['name', 'email', 'password']);
      const token = request.header('Authorization');
      const toke = token

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
        `${env.get('MS_SECURITY')}/api/user_roles/user/${userId}/role/${env.get('DUENO_ROLE_ID')}`,
        {},
        {
          headers: {
            'Authorization': toke,
          },
        }
      );

      const tempBody = await request.validate(DuenoValidator);
      tempBody.security_id = userId;
      const theDueno = await Dueno.create(tempBody)
      return theDueno

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
    let Duenos: Dueno[] = await Dueno.query().paginate(page, perPage)
    return Duenos
  }


  public async findById({ params }: HttpContextContract) {
    const theDueno = await Dueno.findOrFail(params.id)
    return theDueno
  }


  public async update({ params, request }: HttpContextContract) {
    // Validar el cuerpo de la solicitud
    const body = await request.validate(DuenoValidator);
    // Buscar la Dueno por ID
    const theDueno = await Dueno.findOrFail(params.id);
    // Actualizar las propiedades de theDueno con los valores del cuerpo
    Object.assign(theDueno, body);

    await theDueno.save();
    return theDueno;
  }

  public async delete({ params, response }: HttpContextContract) {
    const theDueno = await Dueno.findOrFail(params.id)
    response.status(204)
    return await theDueno.delete()
  }

  public async duenosVehiculos({ params, response, request }: HttpContextContract) {
    const page = request.input('page', 1); // Página actual
    const perPage = request.input('perPage', 20); // Número de registros por página

    // Verificar que el vehiculo existe
    const vehiculo = await Vehiculo.findOrFail(params.id);

    // Paginar los vehículos relacionados
    const duenos = await vehiculo
      .related('duenos') // Relación en el modelo
      .query()
      .paginate(page, perPage); // Paginación directamente en la relación

    return response.status(200).json(duenos); // Retorna la respuesta paginada
  }

}
