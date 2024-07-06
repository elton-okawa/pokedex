import { Column, Entity, PrimaryColumn } from "typeorm";

export type PaginationParams = {
  limit: number;
  offset: number;
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
