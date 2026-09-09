# MedClinic API - Etapa 2: Banco de Dados, Migrations e Entidade User

## Objetivo
Configurar a conexão com o PostgreSQL usando o TypeORM DataSource preparado para suportar Migrations, e criar a entidade de Usuário usando decorators do TypeORM 1.x.

## Nível do Desenvolvedor (Persona)
- **Perfil:** Desenvolvedor Júnior.
- **Estilo de Código:** Funcional, explícito e muito bem comentado. Evite truques de sintaxe avançados. O código deve mapear as colunas de forma simples e didática.

## 🚨 REGRAS DE SINTAXE E CONFIGURAÇÃO (CRÍTICO)
1. **Formatação Humana:** Todos os códigos gerados devem conter quebras de linha e indentação limpa de 2 espaços. Nunca gere códigos compactados em linha única.
2. **Localização das Migrations:** As migrations devem ser configuradas para serem salvas estritamente dentro do diretório `src/database/migrations/`.
3. **Tipagem Estrita e Conversão:** Não utilize `any`. Lembre-se de que variáveis vindas do `process.env` são strings. A porta do banco de dados no DataSource DEVE ser convertida explicitamente para número usando `Number()` ou `parseInt()`.
4. **Prevenção de Erros de Importação:** Para evitar erros de compilação enquanto os arquivos estão sendo criados, a propriedade `entities` no DataSource DEVE apontar para o caminho de texto `"src/entities/*.ts"` em vez de importar a classe diretamente.

## Configuração do CLI do TypeORM para Migrations
Para que os comandos de migration do TypeORM 1.x funcionem via terminal lendo nativamente as variáveis do ambiente, o `package.json` deve possuir exatamente os seguintes scripts:
```json
"scripts": {
  "migration:generate": "tsx watch --env-file=.env ./node_modules/typeorm/cli-tsnode-commonjs.js migration:generate src/database/migrations/CreateUserTable -d src/database/data-source.ts",
  "migration:run": "tsx watch --env-file=.env ./node_modules/typeorm/cli-tsnode-commonjs.js migration:run -d src/database/data-source.ts",
  "migration:revert": "tsx watch --env-file=.env ./node_modules/typeorm/cli-tsnode-commonjs.js migration:revert -d src/database/data-source.ts"
}
```

## Arquivos a serem criados nesta etapa:

### 1. `src/database/data-source.ts`
Deve exportar uma constante chamada `AppDataSource` que seja uma instância de `DataSource`.
- **Configurações obrigatórias:**
    - `type`: "postgres"
    - `host`: process.env.DB_HOST
    - `port`: convertido para number
    - `username`: process.env.DB_USERNAME
    - `password`: process.env.DB_PASSWORD
    - `database`: process.env.DB_DATABASE
    - `synchronize`: false (Obrigatório manter false para não apagar dados e forçar o uso de migrations)
    - `entities`: ["src/entities/*.ts"]
    - `migrations`: ["src/database/migrations/*.ts"]

### 2. `src/entities/User.ts`
Classe da entidade de usuário utilizando decorators nativos do TypeORM com os seguintes campos:
- `id`: string, decorada com `@PrimaryGeneratedColumn("uuid")` para gerar IDs seguros.
- `name`: string, decorada com `@Column()` simples.
- `email`: string, decorada com `@Column({ unique: true })` para garantir e-mails únicos no banco.
- `password`: string, decorada com `@Column()` para guardar o hash criptografado.
- `role`: string, decorada com `@Column({ type: "varchar", default: "ATTENDANT" })` (aceita os valores textuais "ADMIN" ou "ATTENDANT").
- `createdAt`: Date, decorada com `@CreateDateColumn()` para salvar o momento exato de criação automaticamente.

## Atualização do Servidor (`src/server.ts`)
O agente deve modificar o arquivo `src/server.ts` existente para que ele inicialize o banco de dados antes de escutar a porta HTTP.
- Importe o `AppDataSource` de `./database/data-source`.
- Execute `AppDataSource.initialize()` que retorna uma Promise.
- Use `.then(() => { ... colocar o app.listen aqui dentro ... })`.
- Use `.catch((error) => console.error("Erro ao conectar no banco:", error))` para capturar falhas.

## Instrução para o Agente
Gere o código funcional para o arquivo `src/database/data-source.ts` e para a entidade `src/entities/User.ts`. Adicione comentários em formato de desenvolvedor júnior explicando didaticamente por que usamos `synchronize: false` e como o fluxo do banco de dados depende do comando `initialize`.
