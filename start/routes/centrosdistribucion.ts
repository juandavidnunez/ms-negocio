import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/centrosdistribucion', 'CentrosDistribucionsController.findAll')
  Route.get('/centrosdistribucion/:id', 'CentrosDistribucionsController.show')
  Route.post('/centrosdistribucion', 'CentrosDistribucionsController.create')
  Route.put('/centrosdistribucion/:id', 'CentrosDistribucionsController.update')
  Route.delete('/centrosdistribucion/:id', 'CentrosDistribucionsController.delete')
}).middleware(["security"])
