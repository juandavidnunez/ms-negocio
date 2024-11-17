import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne} from '@ioc:Adonis/Lucid/Orm'
import Administrador from './Administrador'
import Dueno from './Dueno'
import Conductor from './Conductor'
import Personas_natural from './PersonaNatural'

export default class Usuario extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  // MongoDB reference pulled from MS-Security
  @column()
  public security_id: string

  @hasMany(() => Administrador, {
    foreignKey: 'user_id',
  })
  public administrador: HasMany<typeof Administrador>

  @hasOne(() => Dueno, {
    foreignKey: 'user_id',
  })
  public dueno: HasOne<typeof Dueno>

  @hasOne(() => Conductor, {
    foreignKey: 'user_id',
  })
  public conductor: HasOne<typeof Conductor>

  @hasOne(() => Personas_natural, {
    foreignKey: 'user_id',
  })
  public personas_natural: HasOne<typeof Personas_natural>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
