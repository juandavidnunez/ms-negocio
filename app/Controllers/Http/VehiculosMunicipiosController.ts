import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import VehiculoMunicipio from "App/Models/VehiculoMunicipio";

export default class VehiculosMunicipiosController {
    // Create a new category
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theVehiculoMunicipio: VehiculoMunicipio = await VehiculoMunicipio.create(body);
        return theVehiculoMunicipio;
    }

    // Get all categories
    public async findAll({ request }: HttpContextContract) {
        const data = request.all();
        if ("page" in data && "per_page" in data) {
            const page = request.input('page', 1);
            const perPage = request.input('perPage', 20);
            return await VehiculoMunicipio.query().paginate(page, perPage);
        } else {
            return await VehiculoMunicipio.query();
        }
    }

    //Devuelve los productos de una vehiculomunicipio
    // public async findProductos({ params }: HttpContextContract) {
    //     let theVehiculoMunicipio: VehiculoMunicipio = await VehiculoMunicipio.query().where('id', params.id).preload('productos').firstOrFail();
    //     return theVehiculoMunicipio;
    // }

    // Get a Category by id
    public async findById({ params }: HttpContextContract) {
        const theVehiculoMunicipio: VehiculoMunicipio = await VehiculoMunicipio.findOrFail(params.id);
        return theVehiculoMunicipio;
    }

    // Update a category by id
    public async update({ params, request }: HttpContextContract) {
        const body = request.body();
        const theVehiculoMunicipio: VehiculoMunicipio = await VehiculoMunicipio.findOrFail(params.id);
        return await theVehiculoMunicipio.save();
    }

    // Delete a category by id
    public async delete({ params, response }: HttpContextContract) {
        const theVehiculoMunicipio: VehiculoMunicipio = await VehiculoMunicipio.findOrFail(params.id);
        response.status(204);
        return await theVehiculoMunicipio.delete();
    }
}
