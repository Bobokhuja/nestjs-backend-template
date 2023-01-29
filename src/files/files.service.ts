import {HttpException, HttpStatus, Injectable} from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {

  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + path.extname(file.originalname)
      const filePath = path.resolve(__dirname, '..', '..', 'static', 'upload')
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer)
      return fileName
    } catch (e) {
      throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteFile(fileName) {
    try {
      const filePath = path.resolve(__dirname, '..', '..', 'static', 'upload', fileName)
      if (!fs.existsSync(filePath)) {
        return false
      }
      return fs.unlinkSync(path.resolve(__dirname, '..', '..', 'static', 'upload', fileName))
    } catch (e) {
      console.log(e)
      // throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}