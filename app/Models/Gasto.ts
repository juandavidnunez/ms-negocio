import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Factura from './Factura'
import Dueno from './Dueno'
import Conductor from './Conductor'
import Servicio from './Servicio'

export default class Gasto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cantidad: number

  @column()
  public dueno_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Factura, {
    foreignKey: 'gasto_id'
  })
  public personaNatural: HasOne<typeof Factura>

  @belongsTo(() => Dueno, {
    foreignKey: 'dueno_id'
  })
  public dueno: BelongsTo<typeof Dueno>

  @belongsTo(() => Conductor, {
    foreignKey: 'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>

  @belongsTo(() => Servicio, {
    foreignKey: 'servicio_id'
  })
  public servicio: BelongsTo<typeof Servicio>
}
