import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiKey } from '../api-keys/entities/api-key.entity';
import { Role } from '../../roles/entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, select: false })
  password?: string;

  @ManyToOne((type) => Role, (role) => role.user)
  role: Role;

  @OneToOne(() => Permission, (permission) => permission.user, {
    cascade: true,
  })
  @JoinColumn()
  permission: Permission;

  @Column({ default: false })
  isTFAEnabled: boolean;

  @Column({ nullable: true })
  tfaSecret?: string;

  @Column({ nullable: true })
  googleId?: string;

  @JoinTable()
  @OneToMany((type) => ApiKey, (apiKey) => apiKey.user)
  apiKeys: ApiKey[];
}
