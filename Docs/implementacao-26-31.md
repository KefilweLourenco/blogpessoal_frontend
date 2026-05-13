# Implementação 26 a 31

## Contexto

Neste bloco, foi desenvolvido o CRUD de postagens, aproveitando a base de autenticação, models e services já existentes.

## O que foi implementado

- criação dos componentes de postagem:
  - `CardPostagem`
  - `ListaPostagens`
  - `FormPostagem`
  - `ModalPostagem`
  - `DeletarPostagem`
- instalação do `reactjs-popup` para abrir o formulário de nova postagem em modal
- listagem de postagens vindas do backend
- exibição das postagens também na `Home`
- cadastro de nova postagem
- edição de postagem por id
- exclusão de postagem por id
- carregamento de temas no formulário da postagem para seleção

## Rotas criadas

- `/postagens`
- `/cadastrarpostagem`
- `/editarpostagem/:id`
- `/deletarpostagem/:id`

## Resultado no projeto

- o usuário autenticado passou a gerenciar postagens completas no front-end
- a Home passou a mostrar a listagem das postagens
- o botão `Nova Postagem` passou a abrir um modal com o formulário

## Arquivos principais envolvidos

- `src/components/postagens/cardpostagens/CardPostagem.tsx`
- `src/components/postagens/listapostagens/ListaPostagens.tsx`
- `src/components/postagens/formpostagem/FormPostagem.tsx`
- `src/components/postagens/modalpostagem/ModalPostagem.tsx`
- `src/components/postagens/deletarpostagem/DeletarPostagem.tsx`
- `src/pages/home/Home.tsx`
- `src/services/Service.ts`
- `src/App.tsx`
