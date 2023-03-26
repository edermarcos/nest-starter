import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto, LogInDto } from './dto';
import { handleDBExceptions, maxPagesPerRequest } from 'src/common/helpers';
import { ERoles, ILogin } from './interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { SeedDto } from './dto/seed.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;
      const entity = this.usersRepository.create({
        ...rest,
        password: bcrypt.hashSync(password, 10),
      });
      await this.usersRepository.save(entity);

      delete entity.password;
      return entity;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async logIn(userLoginDto: LogInDto): Promise<ILogin> {
    const { email, password } = userLoginDto;
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'password', 'email'],
    });

    if (!user) {
      throw new UnauthorizedException(`User or password incorrect`);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(`User or password incorrect`);
    }

    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  testToken(user: User) {
    return user;
  }

  async findAll(pagination: PaginationDto) {
    const { limit = maxPagesPerRequest, offset = 0 } = pagination;
    const [entities, count] = await this.usersRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      pagination: {
        limit,
        offset,
        pages: Math.ceil(count / limit) || 0,
      },
      entities,
    };
  }

  async findOne(id: string) {
    const entity = await this.usersRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return entity;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const entity = await this.usersRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!entity) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(entity);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return entity;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();

      handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    return await this.usersRepository.delete(entity.id);
  }

  private createRandomUser() {
    const roles = Object.keys(ERoles).filter((role) => role !== ERoles.USER);
    return {
      email: faker.internet.email().toLowerCase(),
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      roles: [ERoles.USER, faker.helpers.arrayElement(roles)],
    };
  }

  private async deleteTable() {
    try {
      await this.usersRepository
        .createQueryBuilder()
        .delete()
        .where({})
        .execute();
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async populate(options: SeedDto) {
    await this.deleteTable();

    const { password: pwd } = options;
    const password = bcrypt.hashSync(pwd, 10);
    const randomUsers = Array.from({ length: 15 }).map(() => ({
      ...this.createRandomUser(),
      password,
    }));
    const users = await this.usersRepository.save(randomUsers);
    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
}
