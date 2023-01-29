import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'
import { User } from '../user/entities/user.entity'
import { JwtService } from '@nestjs/jwt'
import { UpdatePasswordDto } from './dto/update-password.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username)

    if (!user) {
      throw new UnauthorizedException('Неправильный логин или пароль')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (user && isMatch) {
      const {password, ...result} = user

      return result
    }

    return null
  }

  async login(user: User) {
    const payload = {id: user.id}

    return {
      access_token: this.jwtService.sign(payload),
      user: user
    }
  }

  async updatePassword(user: User, dto: UpdatePasswordDto) {
    return this.userService.updatePassword(user.id, dto)
  }
}
