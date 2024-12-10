import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Lote from './Lote'
import Ruta from './Ruta'
import Direccion from './Direccion'

export default class DirListaOrden extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orden: number

  @column()
  public direccion_id: number

  @column()
  public ruta_id:number

  @belongsTo(() => Ruta, {
    foreignKey: 'ruta_id',
  })
  public ruta: BelongsTo<typeof Ruta>

  @belongsTo(() => Direccion, {
    foreignKey: 'direccion_id',
  })
  public direccion: BelongsTo<typeof Direccion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Lote,{
    foreignKey: 'dir_lista_orden_id'
  })
  public lote: HasOne<typeof Lote>

}
