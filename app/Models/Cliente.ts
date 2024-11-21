import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, hasOne, HasOne} from '@ioc:Adonis/Lucid/Orm'
import Empresa from './Empresa'
import PersonaNatural from './PersonaNatural'
import Producto from './Producto'
import Contrato from './Contrato'

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public security_id: string // Id for the user in users

  @hasMany(()=>Producto,{
    foreignKey: 'cliente_id'
  })
  public producto: HasMany<typeof Producto>

  @hasMany(()=>Contrato,{
    foreignKey: 'cliente_id'
  })
  public contrato: HasMany<typeof Contrato>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Empresa, {
    foreignKey: 'user_id'
  })
  public empresa: HasOne<typeof Empresa>

  @hasOne(() => PersonaNatural, {
    foreignKey: 'user_id'
  })
  public persona_natural: HasOne<typeof PersonaNatural>
}
