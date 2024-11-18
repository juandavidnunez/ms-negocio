import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const GastoValidation = {
  schema: schema.create({
    cantidad: schema.number( [
        rules.required()
      ]),
      categoria_id: schema.number([
        rules.required(),
        rules.exists({ table: 'categoria', column: 'id' })
      ])
    })
}