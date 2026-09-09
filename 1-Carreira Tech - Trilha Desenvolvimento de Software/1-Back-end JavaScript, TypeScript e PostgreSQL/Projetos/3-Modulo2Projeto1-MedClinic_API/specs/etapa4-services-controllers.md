# MedClinic API - Etapa 4: Camada de Negócio (Services) e Controle (Controllers)

## Objetivo
Implementar as regras de negócio para o Cadastro (`register`) e Login, além de receber e responder as requisições HTTP.

## Nível do Desenvolvedor (Persona)
- **Perfil:** Desenvolvedor Júnior.
- **Estilo de Código:** Sem padrões complexos de injeção de dependência. O controller instancia o service diretamente (ou o service instancia o repository). Validações feitas com `if` tradicionais de forma bem legível.

## Regras de Validação do Service
- **Cadastro (POST /auth/register):** Validar se os campos obrigatórios existem, se o formato do e-mail é válido e se o e-mail já está cadastrado. Se o e-mail existir, lançar um erro customizado ou genérico de conflito. Nunca retornar a senha gerada no JSON de resposta.
- **Login (POST /auth/login):** Validar se o usuário existe e se a senha confere. Se falhar, lançar erro de credenciais inválidas. Nunca dizer se o erro foi especificamente no e-mail ou na senha (mantenha a mensagem genérica: "E-mail ou senha inválidos").

## Arquivos a serem criados nesta etapa:
1. `src/services/AuthService.ts` - Métodos para registrar usuário e realizar login.
2. `src/controllers/AuthController.ts` - Métodos para receber a requisição de registro e login, acionar o service e retornar os dados em formato JSON.

## Instrução para o Agente
Crie as classes de Service e Controller para a autenticação. Lembre-se: nenhuma lógica de banco de dados deve ficar no Controller, e nenhuma lógica HTTP (como `res.status`) deve ficar no Service.
