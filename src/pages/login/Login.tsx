function Login() {
  return (
    <div className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-2">
      <div className="hidden bg-[url('https://i.imgur.com/fyfri1v.png')] bg-cover bg-center lg:block"></div>

      <div className="flex items-center justify-center bg-indigo-900 py-10">
        <form className="flex w-2/3 flex-col gap-4 text-white">
          <h2 className="text-center text-4xl font-bold">Entrar</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="rounded border-2 border-white bg-transparent p-2 placeholder-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="rounded border-2 border-white bg-transparent p-2 placeholder-white"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-lime-400 py-2 font-bold text-indigo-900 hover:bg-lime-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
