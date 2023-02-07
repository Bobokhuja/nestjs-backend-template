import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Role} from './entities/role.entity'
import {Repository} from 'typeorm'
import {CreateRoleDto} from './dto/create-role.dto'
import {UpdateRoleDto} from './dto/update-role.dto'

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find()
  }

  async findById(id: number): Promise<Role | null> {
    return this.roleRepository.findOne({
      where: {id}
    })
  }

  async findByValue(value: string): Promise<Role | null> {
    return this.roleRepository.findOne({
      where: {value}
    })
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    await this.checkCandidate(dto.value)

    return this.roleRepository.save(dto)
  }

  async update(id: number, dto: UpdateRoleDto): Promise<Role> {
    const role = await this.isExist(id)

    await this.checkCandidate(dto.value, id)

    return this.roleRepository.save({
      ...role,
      ...dto
    })
  }

  async remove(id: number): Promise<Role> {
    const role = await this.isExist(id)

    await this.roleRepository.delete({id})
    return role
  }


  async checkCandidate(value, id?: number) {
    const candidate = await this.findByValue(value)

    if (id) {
      if (candidate && candidate.id !== id) {
        throw new BadRequestException('Роль с таким значением (value) уже есть')
      }
    } else {
      if (candidate) {
        throw new BadRequestException('Роль с таким значением (value) уже есть')
      }
    }
  }

  async isExist(id: number): Promise<Role> {
    const role = await this.findById(id)

    if (!role) {
      throw new NotFoundException('Роль не существует')
    }
    return role
  }

}
