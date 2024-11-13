import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableState1731462129756 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`
        CREATE TABLE public.state_entity (
          id integer NOT NULL,
          name character varying NOT NULL,
          created_at timestamp without time zone DEFAULT now() NOT NULL,
          updated_at timestamp without time zone DEFAULT now() NOT NULL,
          primary key (id)
        );
        CREATE SEQUENCE public.state_entity_id_seq
          AS integer
          START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          NO MAXVALUE
          CACHE 1;
          
        ALTER SEQUENCE public.state_entity_id_seq OWNED BY public.state_entity.id;
        ALTER TABLE ONLY public.state_entity ALTER COLUMN id SET DEFAULT nextval('public.state_entity_id_seq'::regclass);
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`
        DROP TABLE public.state_entity;
      `)
    }

}
