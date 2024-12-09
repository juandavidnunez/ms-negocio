/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
import './routes/administradores'
import './routes/usuarios'
import './routes/departamentos'
import './routes/servicios'
import './routes/municipios'
import './routes/centrosdistribucion'
import './routes/direccion'
import './routes/hoteles'
import './routes/restaurantes'
import './routes/rutas'
import './routes/clientes'
import './routes/gastos'
import './routes/cuotas'
import './routes/DirListaOrden'
import './routes/categorias'
import './routes/categoriasproductos'
import './routes/empresas'
import './routes/lotes'
import './routes/personasnaturales'
import './routes/productos'
import './routes/rutasdirecciones'
import './routes/vehiculosmunicipio'
import './routes/contratos'
import './routes/conductores'
import './routes/duenos'
import './routes/seguros'
import './routes/vehiculoConductors'
import './routes/vehiculos'
import './routes/vehiculoDuenos'
import './routes/turnos'
import './routes/anotaciones'
import './routes/facturas'

Route.get('/Operaciones', 'OperacionesController.findAll')
Route.get('/Operaciones/:id', 'OperacionesController.findById')
Route.post('/Operaciones', 'OperacionesController.create')
Route.put('/Operaciones/:id', 'OperacionesController.update')
Route.delete('/Operaciones/:id', 'OperacionesController.delete')


