import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const CentrosDistribucionValidation = {
  schema: schema.create({
    nombre: schema.string({}, [
      rules.required(),
      rules.maxLength(15)
    ]),
        municipio_id: schema.number([
      rules.required(),
      rules.exists({ table: 'municipios', column: 'id' })
    ]),
    direccion_id: schema.number([
      rules.required(),
      rules.exists({ table: 'direccions', column: 'id' })
    ])
  })
}