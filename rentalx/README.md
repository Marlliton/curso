**Requisitos funcionais**
São as funcionalidades que nossa aplicação vai prover para o usuário.
Por exemplo:
* O usuário deve cadastrar uma categoria
* O usuário deve poder recuperar sua senha por email
* O usuário deve poder

**Requisitos não funcionais**
São os requisitos que não estão relacionados com as regras de negócio, por exemplo:
* Deve-se usar banco de dados postgres
* Deve-se usar docker

**Regras de negócio**
São as restrições impostas sobre os *requisitos funcionais*, por exemplo, o usuário deve cadastrar uma categoria.
Esse é um requisito funcional, a regra de negócio é: 
* Não deve ser possível cadastrar uma categoria já existente. 
* Não deve ser possível cadastrar uma categoria com nome menor que 4 caracteres. 