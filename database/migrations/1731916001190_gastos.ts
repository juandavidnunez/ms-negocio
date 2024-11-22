import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gastos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id'),
      table.integer('cantidad')

      table.integer('dueño_id').unsigned().references('duenos.id')
      table.integer('conductor_id').unsigned().references('conductors.id')
      table.integer('servicio_id').unsigned().references('servicios.id')
      table.integer('factura_id').unsigned().references('facturas.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
