import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Ruta from './Ruta'
import Cliente from './Cliente'
import Cuota from './Cuota'

export default class Contrato extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_creacion: DateTime | null

  @column()
  public cliente_id: number

  @belongsTo(() => Cliente, {
    foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @hasMany(()=> Ruta, {
    foreignKey: 'contrato_id'
  })
  public rutas: HasMany<typeof Ruta>

  @hasMany(()=> Cuota, {
    foreignKey: 'contrato_id'
  })  
  public cuotas: HasMany<typeof Cuota>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}