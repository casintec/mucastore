import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1731455830757 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`

        CREATE TABLE public.user_entity (
          id integer NOT NULL,
          name character varying NOT NULL,
          email character varying NOT NULL,
          cpf character varying NOT NULL,
          type_user int NOT NULL,
          phone character varying NOT NULL,
          password character varying NOT NULL,
          create_at timestamp without time zone DEFAULT now() NOT NULL,
          update_at timestamp without time zone DEFAULT now() NOT NULL,
          primary key (id)
        );

        CREATE SEQUENCE public.user_entity_id_seq 
          AS integer
          START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          NO MAXVALUE
          CACHE 1;

          ALTER SEQUENCE public.user_entity_id_seq OWNED BY public.user_entity.id;

          ALTER TABLE ONLY public.user_entity ALTER COLUMN id SET DEFAULT nextval('public.user_entity_id_seq'::regclass);

      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`
        DROP TABLE public.user_entity;
      `)
    }

}
