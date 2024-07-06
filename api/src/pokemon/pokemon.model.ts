import { Column, Entity, PrimaryColumn } from "typeorm";

export type ListParams = {
  limit: number;
  offset: number;
  name?: string;
};

export class PokemonList {
  count!: number;
  results!: {
    id: number;
    name: string;
  }[];
}

@Entity()
export class Pokemon {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;
}
