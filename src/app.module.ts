import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EpisodesModule } from './episodes/episodes.module';
import { TopicsModule } from './topics/topics.module';
import { EpisodesController } from './episodes/episodes.controller';
import { EpisodesService } from './episodes/episodes.service';

@Module({
  imports: [EpisodesModule, TopicsModule],
  controllers: [AppController, EpisodesController],
  providers: [AppService, EpisodesService],
})
export class AppModule {}
