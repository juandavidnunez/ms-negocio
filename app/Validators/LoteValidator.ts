import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const loteValidation = {
  schema: schema.create({
    
    dir_lista_orden_id: schema.number([
        rules.required(),
        rules.exists({ table: 'dirlistaordenes', column: 'id' })
      ]),
      ruta_id: schema.number([
        rules.required(),
        rules.exists({ table: 'ruta', column: 'id' })
      ]),
    })
}