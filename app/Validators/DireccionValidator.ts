import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const direccionValidation = {
  schema: schema.create({
    direccion: schema.string({}, [
      rules.required(),
      rules.maxLength(15)
    ]),
    adicional: schema.string({}, [
      rules.required(),
      rules.maxLength(20)
    ]),
    municipio_id: schema.number([
      rules.required(),
      rules.exists({ table: 'municipios', column: 'id' }) 
    ])
  })
}
