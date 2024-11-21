import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'seguros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.time('fecha_inicio')
      table.time('fecha_vencimiento')
      
      table.integer('vehiculo_id').unsigned().references('vehiculos.id')
      
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
