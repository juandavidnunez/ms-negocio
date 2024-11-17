import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'personas_naturales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 30).notNullable()
      table.string('apellido', 30).notNullable()
      table.string('cedula', 20).notNullable()
      // foreign key
      table.integer('empresa_id').unsigned().references('empresas.id')
      table.integer('cliente_id').unsigned().references('clientes.id')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
