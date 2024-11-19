import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cliente from 'App/Models/Cliente';
import ClienteValidator from 'App/Validators/ClienteValidator';

export default class ClientesController {
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
