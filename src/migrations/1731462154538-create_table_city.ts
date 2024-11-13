import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCity1731462154538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`
        CREATE TABLE public.city_entity (
          id integer NOT NULL,
          state_entity_id integer NOT NULL,
          name character varying NOT NULL,
          created_at timestamp without time zone DEFAULT now() NOT NULL,
          updated_at timestamp without time zone DEFAULT now() NOT NULL,
          primary key (id),
          foreign key (id) references public.state_entity(id)
        );
        CREATE SEQUENCE public.city_entity_id_seq
          AS integer
          START WITH 1
          INCREMENT BY 1
          NO MINVALUE
          NO MAXVALUE
          CACHE 1;
          
        ALTER SEQUENCE public.city_entity_id_seq OWNED BY public.city_entity.id;
        ALTER TABLE ONLY public.city_entity ALTER COLUMN id SET DEFAULT nextval('public.city_entity_id_seq'::regclass);
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`
        DROP TABLE public.city_entity;
      `)
    }

}
