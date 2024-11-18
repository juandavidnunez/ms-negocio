import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const administradorValidation = {
  schema: schema.create({
    nombre: schema.string.optional(),
    fecha_nacimiento: schema.date.optional({
      format: 'yyyy-MM-dd'
    }),
    cedula: schema.string.optional(),
    user_id: schema.number([
      rules.required(),
      rules.exists({table: 'usuarios', column: 'id'})
    ])
  })}



