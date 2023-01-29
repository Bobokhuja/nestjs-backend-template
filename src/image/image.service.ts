import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from "@nestjs/typeorm"
import {Image} from "./entity/image.entity"
import {Repository} from "typeorm"
import {CreateImageDto} from "./dto/create-image.dto"
import {FilesService} from "../files/files.service"
import {UpdateImageDto} from "./dto/update-image.dto"

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
    private readonly filesService: FilesService
    ) {}

  async create(createImageDto: CreateImageDto) {
    let jpgFileName: string | undefined, webpFileName: string | undefined
    if (createImageDto.jpg) {
      jpgFileName = await this.filesService.createFile(createImageDto.jpg)
    }
    if (createImageDto.webp) {
      webpFileName = await this.filesService.createFile(createImageDto.webp)
    }
    const result: any = {}

    if (jpgFileName) {
      result.jpg = jpgFileName
    }

    if (webpFileName) {
      result.webp = webpFileName
    }

    if (createImageDto.width) {
      result.width = createImageDto.width
    }

    if (createImageDto.height) {
      result.height = createImageDto.height
    }

    const image = this.imageRepository.save(result)

    return image
  }

  async delete(id: number) {
    const image = await this.imageRepository.findOneBy({id})

    if (!image) {
      throw new NotFoundException()
    }

    if (image.jpg) {
      await this.filesService.deleteFile(image.jpg)
    }
    if (image.webp) {
      await this.filesService.deleteFile(image.webp)
    }

    await this.imageRepository.delete({id: image.id})

    return image
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    let jpgFileName: string | undefined, webpFileName: string | undefined

    const image = await this.imageRepository.findOne({
      where: {id}
    })
    if (!image) throw new NotFoundException()
    const result: any = {}

    if (updateImageDto.jpg) {
      jpgFileName = await this.filesService.createFile(updateImageDto.jpg)
      if (image.webp) {
        await this.filesService.deleteFile(image.jpg)
      }
    }
    if (updateImageDto.webp) {
      webpFileName = await this.filesService.createFile(updateImageDto.webp)
      if (image.webp) {
        await this.filesService.deleteFile(image.webp)
      }
    }


    if (jpgFileName) {
      result.jpg = jpgFileName
    }

    if (webpFileName) {
      result.webp = webpFileName
    }

    if (updateImageDto.width) {
      result.width = updateImageDto.width
    }

    if (updateImageDto.height) {
      result.height = updateImageDto.height
    }

    const updatedImage = this.imageRepository.save({
      ...image,
      ...result,
    })

    return updatedImage
  }

  async deleteWebp(id: number) {
    const image = await this.imageRepository.findOne({
      where: {id}
    })

    if (!image) throw new NotFoundException()

    if (image.webp) {
      await this.filesService.deleteFile(image.webp)
    }

    return this.imageRepository.save({
      ...image,
      webp: null
    })
  }
}
