import { Controller, Get, Post, Query, Param, Body, Put, Delete, DefaultValuePipe, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreatedEpisodeDto } from './dto/create.episode.dto';
import { IsPositivePipe } from 'src/pipes/is-positive.pipe';

@Controller('episodes')
export class EpisodesController {
    constructor(private episodesService: EpisodesService){}

    @Get()
    async findall(
        @Query('sort') sort: 'asc' | 'desc' = 'desc',
        @Query('limit', new DefaultValuePipe(100), ParseIntPipe,IsPositivePipe) limit: number
    ){
        return await this.episodesService.findAll(sort);
    }

    @Get('featured')
    async findFeatured(){
        return await this.episodesService.findFeatured();
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        return await this.episodesService.findOne(id);
    }

    @Post()
    async create(@Body(ValidationPipe) input: CreatedEpisodeDto){
        return await this.episodesService.create(input);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() input: {title: string; description: string; }){
        return await this.episodesService.update(id, input);
    }

    @Delete(':id')
    async remove(@Param('id') id: string){
        return await this.episodesService.remove(id);
    }

}
