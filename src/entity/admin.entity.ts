import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  DeleteDateColumn,
} from 'typeorm'
import { Role } from './role.entity'

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  name: string //姓名

  @Column({ length: 100 })
  userName: string //用户名

  @Column({ length: 100 })
  password: string

  @Column({ length: 1000 })
  email: string

  @Column({ length: 1000 })
  phoneNum: string

  @Column({ length: 10 })
  countryCode: string

  @Column({ length: 100 })
  comments: string

  @Column({ length: 200 })
  avator: string

  @Column({
    default: false,
  })
  enable: boolean

  @Column()
  groupId: number

  @Column()
  editorId: number

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date

  @DeleteDateColumn({
    type: 'timestamp',
  })
  deletedAt: Date

  @ManyToMany(() => Role)
  roles: Role[]
}
