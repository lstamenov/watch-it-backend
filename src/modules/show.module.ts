import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ShowController from 'src/controllers/show.controller';
import { Show } from 'src/entities';
import ShowService from 'src/services/show.service';

@Module({
  imports: [TypeOrmModule.forFeature([Show])],
  controllers: [ShowController],
  providers: [ShowService],
})
class ShowModule {}

export default ShowModule;
