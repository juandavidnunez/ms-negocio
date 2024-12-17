import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PersonaNatural from 'App/Models/PersonaNatural';
import PersonaNaturalValidator from 'App/Validators/PersonaNaturalValidator';
import env from '@ioc:Adonis/Core/Env'
import axios from 'axios';

export default class PersonasNaturalesController {

  public async create({ request, response }: HttpContextContract) {
    console.log('Creando Persona Natural');
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
        `${env.get('MS_SECURITY')}/api/user_roles/user/${userId}/role/${env.get('PERSONA_NATURAL_ROLE_ID')}`,
        {},
        {
          headers: {
            'Authorization': toke,
          },
        }
      );

      console.log(roleResponse.data)
  
      const tempBody = await request.validate(PersonaNaturalValidator);
      tempBody.security_id = userId;
      const thePersonaNatural = await PersonaNatural.create(tempBody)
      return thePersonaNatural

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
        let PersonaNaturals: PersonaNatural[] = await PersonaNatural.query().paginate(page, perPage)
        return PersonaNaturals
    }


    public async findById({ params }: HttpContextContract) {
        const thePersonaNatural = await PersonaNatural.findOrFail(params.id)
        return thePersonaNatural
    }
    
    
    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(PersonaNaturalValidator);
        // Buscar la PersonaNatural por ID
        const thePersonaNatural = await PersonaNatural.findOrFail(params.id);
        // Actualizar las propiedades de thePersonaNatural con los valores del cuerpo
        Object.assign(thePersonaNatural, body);
        
        await thePersonaNatural.save();
        return thePersonaNatural;
    }
    
      public async delete({ params, response }: HttpContextContract) {
        const thePersonaNatural = await PersonaNatural.findOrFail(params.id)
        response.status(204)
        return await thePersonaNatural.delete()
    }
}
