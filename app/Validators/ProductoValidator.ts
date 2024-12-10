import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const productoValidation = {
  schema: schema.create({
      nombre: schema.string({}, [
        rules.required(),
        rules.maxLength(50)
      ]), 
      descripcion: schema.string({}, [
        rules.required(),
        rules.maxLength(150)
      ]),
      precio: schema.number.optional(),
      lote_id: schema.number.optional([
        rules.exists({ table: 'lote', column: 'id' })
      ]),
      cliente_id: schema.number([
        rules.required(),
        rules.exists({ table: 'cliente', column: 'id' })
      ])
    })
}