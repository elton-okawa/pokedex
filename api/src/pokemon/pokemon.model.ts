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
export class PokemonEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;
}

export class Pokemon {
  id!: number;
  name!: string;
  height!: number;
  weight!: number;
  stats!: {
    base: number;
    name: string;
  }[];
  types!: string[];
  sprites!: {
    default: {
      front: string;
      back: string;
    };
  };
  image!: {
    default: string;
  };
}
