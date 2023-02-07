import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: false})
  name: string

  @Column({nullable: false, unique: true})
  value: string

  @Column({nullable: true})
  description?: string
}