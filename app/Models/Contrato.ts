import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Ruta from './Ruta'

export default class Contrato extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cliente_id: number

  @column()
  public fecha_creacion: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=> Cliente,{
    foreignKey: 'cliente_id',
  })
  public cliente BelongsTo<typeof Cliente>

  @hasMany(()=> Cuota, {
    foreignKey: 'contrato_id',
  })
  public cuotas: HasMany<typeof Cuota>

  @hasMany(()=> Ruta, {
    foreignKey: 'contrato_id',
  })
  public rutas: HasMany<typeof Ruta>


}
