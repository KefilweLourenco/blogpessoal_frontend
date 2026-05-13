# Implementação 20 a 25

## Contexto

Neste bloco, foi desenvolvido o CRUD de temas.

## O que foi implementado

- criação dos componentes de tema:
  - `CardTema`
  - `ListaTemas`
  - `FormTema`
  - `DeletarTema`
- estilização dos componentes com Tailwind
- listagem de temas vindos do backend
- cadastro de novos temas
- edição de tema por id
- exclusão de tema por id
- validação de usuário autenticado antes das ações protegidas

## Rotas criadas

- `/temas`
- `/cadastrartema`
- `/editartema/:id`
- `/deletartema/:id`

## Resultado no projeto

- o usuário autenticado passou a conseguir listar, criar, editar e deletar temas
- o projeto ganhou o primeiro CRUD completo no front-end

## Arquivos principais envolvidos

- `src/components/tema/cardtema/CardTema.tsx`
- `src/components/tema/listatemas/ListaTemas.tsx`
- `src/components/tema/formtema/FormTema.tsx`
- `src/components/tema/deletartema/DeletarTema.tsx`
- `src/services/Service.ts`
- `src/App.tsx`
