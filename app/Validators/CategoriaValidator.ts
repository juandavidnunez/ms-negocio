import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const CategoriaValidation = {
  schema: schema.create({
    nombre: schema.string({}, [
      rules.required(),
      rules.maxLength(50)
    ]),
    descripcion: schema.string({}, [
      rules.required(),
      rules.maxLength(150)
    ]),
    categoriaPadreId: schema.number.optional([
      rules.exists({table: 'categorias', column:'id'})
    ])
  })
}