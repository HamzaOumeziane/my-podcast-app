import { Controller, Get, Post, Query, Param, Body } from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
    @Get()
    findall(@Query('sort') sort: 'asc' | 'desc' = 'desc'){
        console.log(`Sorting episodes in ${sort} order.`);
        return 'This action returns all episodes.';
    }

    @Get('featured')
    findFeatured(){
        return 'This action returns featured episodes.';
    }

    @Get(':id')
    findOne(@Param() id: string){

    }

    @Post()
    create(@Body() input: any){
        return 'This action creates a new episode.';
    }
}
