import { MigrationInterface, QueryRunner } from 'typeorm'

export class createAdminAndRole1676960108144 implements MigrationInterface {
  name = 'createAdminAndRole1676960108144'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`parentId\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`userName\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`email\` varchar(1000) NOT NULL, \`phoneNum\` varchar(1000) NOT NULL, \`countryCode\` varchar(10) NOT NULL, \`comments\` varchar(100) NOT NULL, \`avator\` varchar(200) NOT NULL, \`enable\` tinyint NOT NULL DEFAULT 0, \`groupId\` int NOT NULL, \`editorId\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` timestamp(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`role_admins_admin\` (\`roleId\` int NOT NULL, \`adminId\` int NOT NULL, INDEX \`IDX_c7abe6c21d843d9db77d7aed75\` (\`roleId\`), INDEX \`IDX_3512c0fea5f9910daa279b3ccc\` (\`adminId\`), PRIMARY KEY (\`roleId\`, \`adminId\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`role_admins_admin\` ADD CONSTRAINT \`FK_c7abe6c21d843d9db77d7aed75b\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`role_admins_admin\` ADD CONSTRAINT \`FK_3512c0fea5f9910daa279b3cccb\` FOREIGN KEY (\`adminId\`) REFERENCES \`admin\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`role_admins_admin\` DROP FOREIGN KEY \`FK_3512c0fea5f9910daa279b3cccb\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`role_admins_admin\` DROP FOREIGN KEY \`FK_c7abe6c21d843d9db77d7aed75b\``,
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_3512c0fea5f9910daa279b3ccc\` ON \`role_admins_admin\``,
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_c7abe6c21d843d9db77d7aed75\` ON \`role_admins_admin\``,
    )
    await queryRunner.query(`DROP TABLE \`role_admins_admin\``)
    await queryRunner.query(`DROP TABLE \`admin\``)
    await queryRunner.query(`DROP TABLE \`role\``)
  }
}
