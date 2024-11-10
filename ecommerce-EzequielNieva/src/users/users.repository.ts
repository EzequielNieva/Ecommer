import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from '../dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number): Promise<User[]> {
    try{
      const [users] = await this.userRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        select: ['id', 'name', 'email', 'phone', 'country', 'city', 'address','isAdmin'], 
      });
  
      return users;
    }catch (error) {
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try{
      const user = await this.userRepository.findOne({ where: { email } });
      return user || null;
    }catch (error) {
      throw new InternalServerErrorException('Error al buscar el usuario por email');
    }
  }

  async deleteUser(id: string): Promise<string> {
    try{
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Usuario con id ${id} no existe`);
      }
      return id;
    }catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al eliminar el usuario');
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<Omit<User,'isAdmin'>> {
    try{
      const newUser = this.userRepository.create(createUserDto);
      await this.userRepository.save(newUser); 
      const { isAdmin, ...userWithoutAdmin } = newUser;
      return userWithoutAdmin;
    }catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  

async updateUser(id: string, updateUserDto: CreateUserDto): Promise<string> {
  try {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no existe`);
    }

    if (updateUserDto.password) {
      
      const passwordMatches = await bcrypt.compare(updateUserDto.password, user.password);

      
      if (!passwordMatches) {
        
        if (updateUserDto.password !== updateUserDto.confirmPassword) {
          throw new BadRequestException('Las contraseñas no coinciden');
        }

        const salt = await bcrypt.genSalt(10);
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
      } else {
       
        delete updateUserDto.password;
      }
      delete updateUserDto.confirmPassword;
    }

   
    this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(user);
    return id;
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('Error al actualizar el usuario');
  }
}


  async getUserById(id: string): Promise<User> {
    try{
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['orders'], 
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          country: true,
          city: true,
          address: true,
          orders: {id:true,date:true},
      }});
  
      if (!user) {
        throw new NotFoundException(`Usuario con id ${id} no existe`);
      }
  
  
      return user;

    }catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener el usuario por ID');
    }
  }
}
