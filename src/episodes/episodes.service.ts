import { Injectable } from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { CreatedEpisodeDto } from './dto/create.episode.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class EpisodesService {
    private episodes: Episode[] = [
        {
            id: '1',
            title: 'First Episode',
            description: 'This is the first episode of our podcast.',
            featured: true,
        },
        {
            id: '2',
            title: 'Second Episode',
            description: 'This is the second episode of our podcast.',
            featured: false,
        },
        {
            id: '3',
            title: 'Third Episode',
            description: 'This is the third episode of our podcast.',
            featured: true,
        },
    ];

    async findAll(sort: 'asc' | 'desc' = 'desc'){
        const sortedEpisodes = this.episodes.sort((a: any, b: any) => 
            sort === 'asc' ? a.id - b.id : b.id - a.id
        )
        console.log(`Sorting episodes in ${sort} order.`);
        return sortedEpisodes;
    }

    async findFeatured(){
        const featuredEpisodes = this.episodes.filter(episode => episode.featured);
        if(featuredEpisodes.length === 0) return 'No featured episodes found.';
        
        console.log('Featured:', featuredEpisodes);
        return featuredEpisodes;
    }

    async findOne(id: string){
        const episode = this.episodes.find(e => e.id === id);
        if(!episode) return `Episode #${id} not found.`;

        console.log('Found:', episode);
        return episode;
    }

    async create(createEpisodeDto: CreatedEpisodeDto){
        const newEpisode = { ...createEpisodeDto, id: randomUUID()}
        this.episodes.push(newEpisode);

        console.log('Created:', newEpisode);
        return newEpisode;
    }

    async update(id: string, input: {title: string; description: string; }){
        const episodeUpdated = this.episodes.find(e => e.id === id);
        if(!episodeUpdated) return `Episode #${id} not found.`;
        if (input.title) episodeUpdated.title = input.title;
        if (input.description) episodeUpdated.description = input.description;

        console.log('Updated:', episodeUpdated);
        return episodeUpdated;
    }

    async remove(id: string){
        const episodeIndex = this.episodes.findIndex(e => e.id === id);
        if(episodeIndex === -1) return `Episode #${id} not found.`;

        const deletedEpisode = this.episodes.splice(episodeIndex, 1);
        console.log('Deleted:', deletedEpisode);
        return deletedEpisode;
    }
}
