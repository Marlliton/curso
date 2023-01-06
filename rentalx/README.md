# Requisitos

## 1. Cadastro de carros
**Requisitos funcionais**
- [ ] Deve ser possível cadastrar um carro.
- [ ] Deve ser possível listar todas as categorias.

**Regras de negócio**
- [ ] Semente um usuário administrador pode fazer o cadastro de carros.
- [ ] Não deve ser possível cadastrar um carro com a placa já existente.
- [ ] Não deve ser possível alterar a placa já cadastrado.
- [ ] Um carro recém cadastrado deve está disponível para ser alugado.

## 2. Listagem de carros
**Requisitos funcionais**
- [ ] Deve ser possível listar todos os carros que estão disponíveis.
- [ ] Deve ser possível listar todos os carros que estão disponíveis filtrando pelo nome da categoria.
- [ ] Deve ser possível listar todos os carros que estão disponíveis filtrando pelo nome da marca.
- [ ] Deve ser possível listar todos os carros que estão disponíveis filtrando pelo nome do carro.

**Regras de negócio**
- [ ] O usuário não precisa se logar para ver os carros disponíveis.

## 3. Cadastro de especificação do veiculo
**Requisitos funcionais**
- [ ] deve ser possível cadastra uma especificação para um carro.
- [ ] deve ser possível listar todas as especificação.
- [ ] deve ser possível listar todos os carros.

**Regras de negócio**
- [ ] Não deve ser possível cadastrar uma especificação para um carro insistente.
- [ ] 

## 4. Cadastro de imagens do veiculo
**Requisitos funcionais**
- [ ] Deve ser possível cadastrar as imagens do carro.
- [ ] Deve ser possível listar todos os carros.

**Requisitos não funcionais**
- [x] Usar o multer para upload de imagens.

**Regras de negócio**
- [ ] O usuário deve pode cadastrar mais de uma imagem para o mesmo carro.
- [ ] Somente usuários administradores podem fazer essas operações.

## Aluguel do veiculo
**Requisitos funcionais**
- [ ] Deve ser possível cadastrar um aluguel.

**Regras de negócio**
- [ ] O aluguel deve ter uma duração minima de 24 horas.
- [ ] Não deve ser possível um usuário ter dois alugueis simultaneamente.


### Resumo sobre os requisitos

**Requisitos funcionais**
São as funcionalidades que nossa aplicação vai prover para o usuário.
Por exemplo:

- O usuário deve cadastrar uma categoria
- O usuário deve poder recuperar sua senha por email
- O usuário deve poder

**Requisitos não funcionais**
São os requisitos que não estão relacionados com as regras de negócio, por exemplo:

- Deve-se usar banco de dados postgres
- Deve-se usar docker

**Regras de negócio**
São as restrições impostas sobre os _requisitos funcionais_, por exemplo, o usuário deve cadastrar uma categoria.
Esse é um requisito funcional, a regra de negócio é:

- Não deve ser possível cadastrar uma categoria já existente.
- Não deve ser possível cadastrar uma categoria com nome menor que 4 caracteres.
