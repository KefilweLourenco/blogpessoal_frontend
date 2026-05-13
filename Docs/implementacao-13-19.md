# Implementação 13 a 19

## Contexto

Neste bloco, o front-end começou a se comunicar com o backend do Blog Pessoal.

## O que foi implementado

- instalação do `axios`
- criação das models:
  - `Usuario`
  - `UsuarioLogin`
  - `Postagem`
  - `Tema`
- criação do `Service.ts` com a `baseURL` do backend
- integração da página de cadastro com a API
- instalação do `react-spinners`
- criação do `AuthContext`
- encapsulamento da aplicação com `AuthProvider`
- integração da página de login com o contexto de autenticação
- redirecionamento após login e cadastro
- logout pela `Navbar`

## Resultado no projeto

- o cadastro deixou de ser apenas visual e passou a persistir no backend
- o login passou a autenticar e armazenar dados do usuário no contexto
- as requisições autenticadas passaram a usar token

## Arquivos principais envolvidos

- `src/models/Usuario.ts`
- `src/models/UsuarioLogin.ts`
- `src/models/Postagem.ts`
- `src/models/Tema.ts`
- `src/services/Service.ts`
- `src/contexts/AuthContext.tsx`
- `src/pages/cadastro/Cadastro.tsx`
- `src/pages/login/Login.tsx`
