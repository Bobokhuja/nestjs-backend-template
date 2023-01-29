import {Controller, Get, HttpCode} from '@nestjs/common'

@Controller()
export class AppController {
  @HttpCode(404)
  @Get('404')
  notFound() {
    return {
      "statusCode": 404,
      "message": "Not Found",
      "error": "Not Found"
    }
  }
}
