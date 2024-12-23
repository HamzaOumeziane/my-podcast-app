import { Controller, Get, Post, Query, Param, Body, Put, Delete } from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
    private episodes = [
        { id: '1', title: 'Episode 1', description: 'Description 1', featured: true},
        { id: '2', title: 'Episode 2', description: 'Description 2', featured: false},
        { id: '3', title: 'Episode 3', description: 'Description 3', featured: false},
    ]

    findEpisodeById(id: string){
        return this.episodes.find(e => e.id === id);
    }

    @Get()
    findall(@Query('sort') sort: 'asc' | 'desc' = 'desc'){
        console.log(`Sorting episodes in ${sort} order.`);
        const sortedEpisodes = this.episodes.sort((a: any, b: any) => 
            sort === 'asc' ? a.id - b.id : b.id - a.id
        )
        return sortedEpisodes;
    }

    @Get('featured')
    findFeatured(){
        const featuredEpisodes = this.episodes.filter(episode => episode.featured);
        if(featuredEpisodes.length === 0) return 'No featured episodes found.';
        
        console.log('Found:', featuredEpisodes);
        return featuredEpisodes;
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        const episode = this.findEpisodeById(id);
        if(!episode) return `Episode #${id} not found.`;

        console.log('Found:', episode);
        return episode;
    }

    @Post()
    create(@Body() input: {title: string; description: string;  }){
        const newEpisode = {
            id: (Math.floor(Math.random() * 100) + 1).toString(),
            title: input.title,
            description: input.description, 
            featured: false,
        }
        this.episodes.push(newEpisode);

        console.log('Created:', newEpisode);
        return newEpisode;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() input: {title: string; description: string; }){
        const episodeUpdated = this.findEpisodeById(id);
        if(!episodeUpdated) return `Episode #${id} not found.`;
        if (input.title) episodeUpdated.title = input.title;
        if (input.description) episodeUpdated.description = input.description;

        console.log('Updated:', episodeUpdated);
        return episodeUpdated;
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        const episodeDeleted = this.findEpisodeById(id);
        if(!episodeDeleted) return `Episode #${id} not found.`;
        const index = this.episodes.indexOf(episodeDeleted);
        this.episodes.splice(index, 1);

        console.log('Deleted:', episodeDeleted);
        return episodeDeleted;
    }

}
