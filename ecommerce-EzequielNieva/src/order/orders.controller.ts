import { Controller, Post, Get, Param, Body, BadRequestException, UsePipes, UseGuards, ParseUUIDPipe, UnauthorizedException, Req, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from '../dtos/createOrder.dto'; 
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('orders')
@Controller('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id',ParseUUIDPipe) id: string,@Req() req:any) {
    try {
      const order =  await this.ordersService.getOrder(id);
      const usuarioAutenticado = req.user as { id: string };
      if (order.user.id !== usuarioAutenticado.id) {
        throw new UnauthorizedException('No puedes acceder a la orden de otro usuario. Verifique su Id');
      }
      return order;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() createOrderDto: CreateOrderDto,@Req() req:any) {
    try {
      const usuarioAutenticado = req.user as { id: string };
      if (usuarioAutenticado.id !== createOrderDto.userId) {
        throw new UnauthorizedException('No puedes crear una orden para otro usuario. Verifique su Id');
      }
      return await this.ordersService.addOrder(createOrderDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


}
