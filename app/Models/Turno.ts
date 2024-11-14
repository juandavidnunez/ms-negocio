import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'

export default class Turno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public conductor_id: number

  @column()
  public hora_inicio: DateTime

  @column()
  public hora_vencimiento: DateTime

  @column()
  public dias: string

  @belongsTo(()=> Conductor, {
    foreignKey: 'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
