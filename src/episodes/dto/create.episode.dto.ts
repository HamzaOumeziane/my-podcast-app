import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatedEpisodeDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsBoolean()
    @IsOptional()
    featured?: boolean;
}