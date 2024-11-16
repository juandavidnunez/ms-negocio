import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import RutaDireccion from './RutaDireccion'
import Producto from './Producto'

export default class Lote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cantidad_productos: number

  @column()
  public peso_total: number

  @column.dateTime()
  public fecha_creacion: DateTime

  @column.dateTime()
  public fecha_entrega: DateTime

  //Foreign Key of Ruta
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => RutaDireccion, {
    foreignKey: 'lote_id',
  })
  public ruta_direccion: HasOne<typeof RutaDireccion>

  @hasMany(() => Producto, {
    foreignKey: 'lote_id',
  })
  public productos: HasMany<typeof Producto>
}
