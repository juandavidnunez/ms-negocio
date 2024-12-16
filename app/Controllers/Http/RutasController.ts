import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruta from 'App/Models/Ruta';
import Vehiculo from 'App/Models/Vehiculo';
import RutaValidator from 'App/Validators/RutaValidator';

export default class RutasController {

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(RutaValidator);
        const theRuta = await Ruta.create(body)
        return theRuta
    }

    public async findAll({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const perPage = request.input('perPage', 20)
        let Rutas: Ruta[] = await Ruta.query().paginate(page, perPage)
        return Rutas
    }


    public async findById({ params }: HttpContextContract) {
        const theRuta = await Ruta.findOrFail(params.id)
        return theRuta
    }


    public async update({ params, request }: HttpContextContract) {
        // Validar el cuerpo de la solicitud
        const body = await request.validate(RutaValidator);
        // Buscar la ruta por ID
        const theRuta = await Ruta.findOrFail(params.id);
        // Actualizar las propiedades de theRuta con los valores del cuerpo
        Object.assign(theRuta, body);

        await theRuta.save();
        return theRuta;
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRuta = await Ruta.findOrFail(params.id)
        response.status(204)
        return await theRuta.delete()
    }

    public async recorrida({ params, request }: HttpContextContract) {
        const theRuta = await Ruta.findOrFail(params.id)
        theRuta.recorrida = request.body().recorrida
        await theRuta.save()
        return theRuta
    }

    public async rutasVehiculos({ params, response, request }: HttpContextContract) {
        const page = request.input('page', 1); // Página actual
        const perPage = request.input('perPage', 20); // Número de registros por página

        // Verificar que el contrato existe
        const vehiculo = await Vehiculo.findOrFail(params.id);

        // Paginar los vehículos relacionados
        const rutas = await vehiculo
            .related('rutas')
            .query()
            .paginate(page, perPage); // Paginación directamente en la relación

        return response.status(200).json(rutas); // Retorna la respuesta paginada
    }

    public async direccionesRuta({ params, response, request }: HttpContextContract) {
        const page = request.input('page', 1); // Página actual
        const perPage = request.input('perPage', 20); // Número de registros por página

        // Verificar que la ruta existe
        const ruta = await Ruta.findOrFail(params.id);

        // Paginar los vehículos relacionados
        const direcciones = await ruta
            .related('direcciones')
            .query()
            .paginate(page, perPage); // Paginación directamente en la relación

        return response.status(200).json(direcciones); // Retorna la respuesta paginada
    }

}
