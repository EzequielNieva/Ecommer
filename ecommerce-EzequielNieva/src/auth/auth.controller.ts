import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserDto) {
    const { password, confirmPassword } = signUpDto;
    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden.');
    }
    const newUser = await this.authService.signUp(signUpDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword };
  }
  
  @Post('singin')
  singIn(@Body() credentials:LoginUserDto){
    const{email,password} = credentials
    return this.authService.singIn(email,password);
  }


}
