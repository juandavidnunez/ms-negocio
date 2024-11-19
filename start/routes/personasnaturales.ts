import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/persona_natural', 'PersonasNaturalesController.findAll')
  Route.get('/persona_natural/:id', 'PersonasNaturalesController.findById')
  Route.post('/persona_natural', 'PersonasNaturalesController.create')
  Route.put('/persona_natural/:id', 'PersonasNaturalesController.update')
  Route.delete('/persona_natural/:id', 'PersonasNaturalesController.delete')
}).middleware(["security"])