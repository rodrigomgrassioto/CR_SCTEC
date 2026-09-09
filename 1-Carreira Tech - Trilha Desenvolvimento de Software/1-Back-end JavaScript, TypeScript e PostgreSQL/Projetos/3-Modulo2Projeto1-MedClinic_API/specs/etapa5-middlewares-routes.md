# MedClinic API - Etapa 5: Middlewares, Rotas e Erros Centralizados

## Objetivo
Finalizar a API criando a proteção de rotas (Autenticação JWT), o controle de perfis (RBAC), o tratamento centralizado de erros e o mapeamento das rotas.

## Nível do Desenvolvedor (Persona)
- **Perfil:** Desenvolvedor Júnior.
- **Estilo de Código:** Tratamento de erros utilizando um middleware do Express clássico com 4 parâmetros `(err, req, res, next)`. Rotas declaradas de forma simples e sequencial no arquivo de rotas.

## Mapeamento de Status HTTP para Erros:
- Dados inválidos/campos faltando: `400 Bad Request`
- Credenciais inválidas ou Token ausente/expirado: `401 Unauthorized`
- Usuário logado mas sem perfil permitido (Ex: Atendente acessando rota Admin): `403 Forbidden`
- E-mail duplicado no cadastro: `409 Conflict`
- Erro inesperado: `500 Internal Server Error`

## Endpoints a Proteger:
- `POST /auth/register` (Público)
- `POST /auth/login` (Público)
- `GET /users/me` (Protegido por Autenticação JWT - retorna dados do token)
- `GET /admin/ping` (Protegido por Autenticação JWT + RBAC exigindo papel 'ADMIN')

## Arquivos a serem criados nesta etapa:
1. `src/middlewares/authMiddleware.ts` - Valida o header 'Authorization: Bearer <token>'.
2. `src/middlewares/roleMiddleware.ts` - Recebe os perfis permitidos e checa se a role do usuário bate com a permissão.
3. `src/middlewares/errorMiddleware.ts` - Captura os erros lançados na aplicação e responde com `{ "success": false, "message": "..." }`.
4. `src/routes/authRoutes.ts` e `src/routes/userRoutes.ts` (ou um arquivo único `src/routes/index.ts`) - Conecta os endpoints aos middlewares e controllers correspondentes.

## Instrução para o Agente
Construa os middlewares de segurança, o arquivo global de tratamento de erro e junte todas as rotas da aplicação, garantindo que o `server.ts` use essas rotas e o middleware de erro no final. O sistema deve estar 100% funcional.
