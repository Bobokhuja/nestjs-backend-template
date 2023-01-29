import {Module} from '@nestjs/common'
import {ImageService} from './image.service'
import {FilesModule} from "../files/files.module"
import {TypeOrmModule} from "@nestjs/typeorm"
import {Image} from "./entity/image.entity"

@Module({
  providers: [ImageService],
  imports: [
    TypeOrmModule.forFeature([Image]),
    FilesModule,
  ],
  exports: [ImageService]
})
export class ImageModule {
}
