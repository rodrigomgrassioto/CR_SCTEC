import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';

// Obtém o repositório padrão do User diretamente da nossa instância conectada do DataSource
const baseRepository = AppDataSource.getRepository(User);

/**
 * Repositório customizado para a entidade User
 */
export const UserRepository = {
  ...baseRepository,
  /**
   * Busca um usuário pelo e-mail
   * @param email - E-mail do usuário
   * @returns Promise<User | null>
   */
  async findByEmail(email: string): Promise<User | null> {
    // Usamos o baseRepository interno para buscar no banco de dados
    const user = await baseRepository.findOne({
      where: { email }
    });

    return user;
  }
};