import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/rutadireccion', 'RutasdireccionesController.findAll')
  Route.get('/rutadireccion/:id', 'RutasdireccionesController.findById')
  Route.post('/rutadireccion', 'RutasdireccionesController.create')
  Route.put('/rutadireccion/:id', 'RutasdireccionesController.update')
  Route.delete('/rutadireccion/:id', 'RutasdireccionesController.delete')
}).middleware(["security"])