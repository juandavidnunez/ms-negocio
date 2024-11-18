import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const CategoriaProductoValidation = {
  schema: schema.create({
    cantidad: schema.number( [
        rules.required()
      ]),
      categoria_id: schema.number([
        rules.required(),
        rules.exists({ table: 'categoria', column: 'id' })
      ]),
      producto_id: schema.number([
        rules.required(),
        rules.exists({ table: 'producto', column: 'id' })
      ])
    })
}