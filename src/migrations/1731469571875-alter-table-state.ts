import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableState1731469571875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`
        ALTER TABLE state_entity
          ADD uf varchar(2) NOT NULL;
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`
        ALTER TABLE state_entity
          DROP uf;
      `)
    }

}
