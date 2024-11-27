import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertRootInUser1732731691482 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      INSERT INTO public."user_entity"(name, email, cpf, type_user, phone, password)
        VALUES ('root', 'root@root.com', '12345678901', 2, '31925325252', '$2b$10$BhaMKrzUdPJFaHLcdvls7.lFMHojH9/sG/jwrp.Is0YXIlpBe4gI.');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      DELETE FROM public."user_entity" WHERE email like 'root@root.com';
    `);
  }

}
