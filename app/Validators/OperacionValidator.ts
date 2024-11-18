import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const OperacionValidation = {
  schema: schema.create({
    vehiculo_id: schema.number([
        rules.required(),
        rules.exists({ table: 'vehiculo', column: 'id' })
      ]),
      municipio_id: schema.number([
        rules.required(),
        rules.exists({ table: 'municipio', column: 'id' })
      ])
    })
}