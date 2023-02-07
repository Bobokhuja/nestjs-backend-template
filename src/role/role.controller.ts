import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common'
import {RoleService} from './role.service'
import {CreateRoleDto} from './dto/create-role.dto'
import {UpdateRoleDto} from './dto/update-role.dto'

@Controller('roles')
export class RoleController {

  constructor(private readonly roleService: RoleService) {
  }

  @Get()
  getAll() {
    return this.roleService.findAll()
  }

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto
  ) {
    return this.roleService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(id)
  }
}
