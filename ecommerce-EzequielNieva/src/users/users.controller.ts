import { BadRequestException, Controller, Get, Param, Query, Body, UseGuards, Put, Delete, ParseUUIDPipe, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from '../dtos/createUser.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getUsers(@Query('page') page = '1', @Query('limit') limit = '5') {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
      throw new BadRequestException('Los parámetros "page" y "limit" deben ser números positivos.');
    }

    return this.usersService.getUsers(pageNumber, limitNumber);
  }


  @Get(':id')
  async getUserById(@Param('id',ParseUUIDPipe) id: string,@Req() req:any) {
    const usuarioAutenticado = req.user as { id: string};
    if (usuarioAutenticado.id !== id) {
      throw new UnauthorizedException('No puede acceder a este usuario. Verifique su Id');
    }
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id',ParseUUIDPipe) id: string, @Body() updateUserDto: CreateUserDto,@Req() req:any) {
    const usuarioAutenticado = req.user as { id: string};
    if (usuarioAutenticado.id !== id) {
      throw new UnauthorizedException('No puedes modificar otro usuario. Verifique su Id');
    }
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id',ParseUUIDPipe) id: string,@Req() req:any) {
    const usuarioAutenticado = req.user as { id: string};
    if (usuarioAutenticado.id !== id) {
      throw new UnauthorizedException('No puedes eliminar otro usuario. Verifique su Id');
    }
    return this.usersService.delete(id);
  }
}

