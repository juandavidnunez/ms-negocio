import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'empresas'
  
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string('razon_social', 255).notNullable()
      table.string('nit', 20).notNullable()
      table.string('contacto', 20)

      table.integer('cliente_id').unsigned().references('clientes.id')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
