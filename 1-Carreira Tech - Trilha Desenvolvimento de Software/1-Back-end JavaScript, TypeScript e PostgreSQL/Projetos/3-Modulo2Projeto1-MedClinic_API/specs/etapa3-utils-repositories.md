# MedClinic API - Etapa 3: Utilitários de Segurança e Repositórios

## Objetivo
Criar as funções auxiliares de criptografia, geração de tokens e a camada de persistência de dados (Repository) para o Usuário.

## Nível do Desenvolvedor (Persona)
- **Perfil:** Desenvolvedor Júnior.
- **Estilo de Código:** Simples e linear. Funções utilitárias diretas usando Promises (async/await) com blocos try/catch básicos.

## Requisitos de Segurança (Regras de Negócio Globais)
- A senha nunca pode ser salva em texto puro. Deve-se usar o `bcrypt` com salt de 10.
- O token JWT deve expirar conforme a variável `JWT_EXPIRES_IN` do `.env` e conter o `id` (como sub) e a `role` no payload.

## Arquivos a serem criados nesta etapa:
1. `src/utils/crypto.ts` - Funções `hashPassword(password)` e `comparePassword(password, hash)`.
2. `src/utils/jwt.ts` - Funções `generateToken(payload)` e `verifyToken(token)`.
3. `src/repositories/UserRepository.ts` - Repositório customizado ou estendido usando o DataSource do TypeORM para buscar por e-mail, buscar por ID e salvar usuários.

## Instrução para o Agente
Implemente os arquivos utilitários de criptografia/JWT e a camada de repositório. O código deve ser tipado e totalmente funcional.
