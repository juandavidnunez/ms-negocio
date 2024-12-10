import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente'
import ClienteValidator from 'App/Validators/ClienteValidator'
import axios from 'axios'


export default class ClientesController {
 
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'http://localhost:8080/api';
  }

  // Carga un usuario
  public async cargar({ request, response }: HttpContextContract) {
    try {
      const body = request.only(['name', 'email', 'password']);
      const token = request.header('Authorization');
      const toke=token
  
      if (!token) {
        return response.status(401).send('Token de acceso faltante');
      }
  
      // Crear usuario
      const userResponse = await axios.post(
        `${this.apiUrl}/users`,
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
      const roleResponse = await axios.put(
        `${this.apiUrl}/users/${userId}/role/66526ee52e42f03cc82c1c7f`,
        {},
        {
          headers: {
            'Authorization': toke,
          },
        }
      );
  
      // Responder con los datos del rol asignado
      response.status(roleResponse.status).send(roleResponse.data);
    } catch (error) {
      console.error('Error al consumir la API de Adonis:', error);
  
      // Manejo de errores con detalles
      const status = error.response?.status || 500;
      const message = error.response?.data || 'Error al consumir la API de Adonis';
  
      response.status(status).send(message);
    }
  }
  
  public async create({ request }: HttpContextContract) {
    const body = await request.validate(ClienteValidator);
    const theCliente = await Cliente.create(body)
    return theCliente
}

public async findAll({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    let Clientes: Cliente[] = await Cliente.query().paginate(page, perPage)
    return Clientes
}


public async findById({ params }: HttpContextContract) {
    const theCliente = await Cliente.findOrFail(params.id)
    return theCliente
}


public async update({ params, request }: HttpContextContract) {
    // Validar el cuerpo de la solicitud
    const body = await request.validate(ClienteValidator);
    // Buscar la Cliente por ID
    const theCliente = await Cliente.findOrFail(params.id);
    // Actualizar las propiedades de theCliente con los valores del cuerpo
    Object.assign(theCliente, body);
    
    await theCliente.save();
    return theCliente;
}

  public async delete({ params, response }: HttpContextContract) {
    const theCliente = await Cliente.findOrFail(params.id)
    response.status(204)
    return await theCliente.delete()
  }
}
