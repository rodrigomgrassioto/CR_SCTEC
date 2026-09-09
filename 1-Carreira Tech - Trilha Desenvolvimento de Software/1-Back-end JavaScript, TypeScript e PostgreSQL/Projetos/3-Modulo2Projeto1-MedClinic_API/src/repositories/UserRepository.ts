import { getRepository } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';

/**
 * Repositório customizado para a entidade User
 */
export const UserRepository = getRepository(User, AppDataSource);

/**
 * Busca um usuário pelo e-mail
 * @param email - E-mail do usuário
 * @returns Promise<User | null>
 */
export async function findByEmail(email: string): Promise<User | null> {
  return await UserRepository.findOne({ where: { email } });
}