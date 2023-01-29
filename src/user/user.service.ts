import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdatePasswordDto } from '../auth/dto/update-password.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        password: false,
        id: true,
        username: true,
        name: true,
      }
    })
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id})
    if (!user) {
      throw new NotFoundException()
    }

    const {password, ...result} = user
    return result
  }

  async findOneWithoutNotFound(id: number) {
    return this.userRepository.findOneBy({id})
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({username})
    return user
  }

  async create(createUserDto: CreateUserDto) {
    const candidate = await this.userRepository.findOneBy({username: createUserDto.username})

    if (candidate) {
      throw new BadRequestException('Пользователь с таким username-ом уже существует')
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10)

    const user = await this.userRepository.save({
      ...createUserDto,
      password: passwordHash
    })

    const {password, ...result} = user

    return result
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id})
    if (!user) throw new NotFoundException()

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto
    })

    const {password, ...result} = updatedUser

    return result
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const user = await this.findOneWithoutNotFound(id)

    if (!user) throw new NotFoundException()

    const isMatch = await bcrypt.compare(dto.old_password, user.password)

    if (!isMatch) {
      throw new UnauthorizedException('Неправильный пароль')
    }

    const passwordHash = await bcrypt.hash(dto.new_password, 10)

    const updatedUser = await this.userRepository.save({
      ...user,
      password: passwordHash
    })

    const {password, ...result} = updatedUser

    return result
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    await this.userRepository.delete(id)
    return user
  }
}
