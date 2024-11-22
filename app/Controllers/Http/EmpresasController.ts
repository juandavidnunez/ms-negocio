import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Empresa from 'App/Models/Empresa';

export default class EmpresasController {
    // Create a new category
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theEmpresa: Empresa = await Empresa.create(body);
        return theEmpresa;
    }

    // Get all categories
    public async findAll({ request }: HttpContextContract) {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input('perPage', 20);
            return await Empresa.query().paginate(page, perPage);
        } else {
            return await Empresa.query();
        }
    }

    //Devuelve los productos de una empresa
    // public async findProductos({ params }: HttpContextContract) {
    //     let theEmpresa: Empresa = await Empresa.query().where('id', params.id).preload('productos').firstOrFail();
    //     return theEmpresa;
    // }

    // Get a Category by id
    public async findById({ params }: HttpContextContract) {
        const theEmpresa: Empresa = await Empresa.findOrFail(params.id);
        return theEmpresa;
    }

    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.body()
        // Buscar la Empresasss por ID
        const theEmpresas = await Empresa.findOrFail(params.id);
        // Actualizar las propiedades de theEmpresasss con los valores del cuerpo
        Object.assign(theEmpresas, body);
        
        await theEmpresas.save();
        return theEmpresas;
      }
    
    // Delete a category by id
    public async delete({ params, response }: HttpContextContract) {
        const theEmpresa: Empresa = await Empresa.findOrFail(params.id);
        response.status(204);
        return await theEmpresa.delete();
    }
}
