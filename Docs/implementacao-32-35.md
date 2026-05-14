# Implementação 32 a 35

## Contexto

Neste bloco, o projeto recebeu a página de perfil, ajustes finais de autenticação e feedback visual, além da preparação necessária para o deploy na Vercel.

## O que foi implementado

- criação da página de perfil
- exibição da capa fixa do perfil
- exibição do avatar do usuário com fallback visual quando a foto não carrega
- exibição de nome e email do usuário autenticado
- adição da rota de perfil
- ajuste da navegação autenticada na navbar
- renderização condicional de navbar e footer com base no token
- substituição de alerts por notificações com `react-toastify`
- criação do utilitário `ToastAlerta`
- preparação do projeto para deploy com `VITE_API_URL`
- atualização do `Service.ts` para usar variável de ambiente
- inclusão de `.env` no `.gitignore`

## Rotas criadas ou ajustadas

- `/perfil`

## Resultado no projeto

- o usuário autenticado passou a visualizar uma página de perfil integrada ao contexto de autenticação
- a aplicação ganhou mensagens visuais mais consistentes com toast
- o projeto ficou preparado para publicação na Vercel

## Arquivos principais envolvidos

- `src/pages/perfil/Perfil.tsx`
- `src/utils/ToastAlerta.ts`
- `src/App.tsx`
- `src/components/navbar/Navbar.tsx`
- `src/components/footer/Footer.tsx`
- `src/contexts/AuthContext.tsx`
- `src/services/Service.ts`
- `.env`
- `.gitignore`
