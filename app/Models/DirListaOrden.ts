import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote'
import Anotacion from './Anotacion'

export default class DirListaOrden extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orden: number

  @column()
  public direccion_id: number

  @column()
  public ruta_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Lote,{
    foreignKey: 'dir_lista_orden_id'
  })
  public lote: HasOne<typeof Lote>

  @hasMany(() => Anotacion, {
    foreignKey: 'dir_lista_orden_id'
  })
  public anotaciones: HasMany<typeof Anotacion>
}
