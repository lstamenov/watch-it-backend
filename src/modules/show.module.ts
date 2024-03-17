import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ShowController from 'src/controllers/show.controller';
import { Show } from 'src/entities';
import ShowRepository from 'src/repositories/show.repository';
import ShowService from 'src/services/show.service';

@Module({
  imports: [TypeOrmModule.forFeature([Show])],
  controllers: [ShowController],
  providers: [ShowService, ShowRepository],
  exports: [ShowService],
})
class ShowModule {}

export default ShowModule;
