import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAddress1731462165443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`
        CREATE TABLE public.address_entity (
                id integer NOT NULL,
                user_id integer NOT NULL,
                complement character varying,
                number integer NOT NULL,
                cep character varying NOT NULL,
                city_id integer NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id),
                foreign key (user_id) references public.user_entity(id),
                foreign key (city_id) references public.city_entity(id)
            );
            
            CREATE SEQUENCE public.address_entity_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;
                
            ALTER SEQUENCE public.address_entity_id_seq OWNED BY public.address_entity.id;
            
            ALTER TABLE ONLY public.address_entity ALTER COLUMN id SET DEFAULT nextval('public.address_entity_id_seq'::regclass);
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`
        DROP TABLE public.address_entity;
      `)
    }

}
