import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class ListPokemonQuery {
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  offset?: number;

  @IsString()
  @IsOptional()
  name?: string;
}

export class GetPokemonParams {
  @IsNumber()
  id!: number;
}
