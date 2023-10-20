import {
  Model,
  Table,
  Column,
  PrimaryKey,
  AutoIncrement,
  Unique,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  passwordHash!: string;

  @CreatedAt
  @Column({ type: DataType.DATE, allowNull: false })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: false })
  updatedAt!: Date;
}

export default User;
