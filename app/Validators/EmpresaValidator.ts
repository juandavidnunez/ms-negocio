import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const EmpresaValidation = {
  schema: schema.create({
    razon_social: schema.string({}, [
        rules.required(),
        rules.maxLength(150)
      ]), nit: schema.string({}, [
        rules.required(),
        rules.maxLength(50)
      ]),
      contacto: schema.string({}, [
        rules.required(),
        rules.maxLength(50)
      ]),
      cliente_id: schema.number([
        rules.required(),
        rules.exists({ table: 'cliente', column: 'id' })
      ])
    })
}