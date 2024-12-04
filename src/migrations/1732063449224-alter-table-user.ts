import { MigrationInterface, QueryRunner, Unique } from "typeorm";

export class AlterTableUser1732063449224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`
        ALTER TABLE Public.user add unique(email);
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`
      `)
    }

}
