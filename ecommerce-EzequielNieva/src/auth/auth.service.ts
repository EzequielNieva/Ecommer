import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { Role } from 'src/enums/role.enum';
import { User } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository,private readonly jwtService:JwtService) {}

  async signUp(signUpDto: CreateUserDto): Promise<Omit<User,'isAdmin'>> {
    const { email, password } = signUpDto;

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está en uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserDto = {
      ...signUpDto,
      password: hashedPassword,
    };

    const newUser = await this.usersRepository.createUser(newUserDto); 

    return newUser;
  }

  async singIn(email:string, password:string){
    if(!email || !password) return 'email y password requeridos'

    const user = await this.usersRepository.findByEmail(email);

    if(!user) throw new BadRequestException('credenciales invalidas');

    const validPassword = await bcrypt.compare(password,user.password);

    if(!validPassword) throw new BadRequestException('credenciales invalidas')
    
    const payload={
      id:user.id,
      email:user.email,
      roles:[user.isAdmin ? Role.Admin : Role.User]
    }

    const token = this.jwtService.sign(payload)
      return{
        message:'login exitosamente',
        token,
      };
  }

  
}
