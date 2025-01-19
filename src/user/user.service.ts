import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getUsers(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
        const users = await this.userRepository.findAll(page, limit);
        return users;
    }

    async getUser(userId: string) {
        return this.userRepository.findUserById(userId);
    }

    async researchUsers(paginationDto: PaginationDto, name: string) {
        const { page, limit } = paginationDto;
        const users = await this.userRepository.findUsersByName(name, page, limit);
        return users;
    }
}
