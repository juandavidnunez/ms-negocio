import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'productos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nombre', 50).notNullable()
      table.string('descripcion', 255).notNullable()
      table.integer('precio').notNullable()

      table.integer('lote_id').unsigned().references('lotes.id')
      table.integer('cliente_id').unsigned().references('clientes.id')  

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
