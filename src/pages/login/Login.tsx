import { type ChangeEvent, type FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {
  const navigate = useNavigate();

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await handleLogin(usuarioLogin);
  }

  return (
    <div className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-2">
      <div className="hidden bg-[url('https://i.imgur.com/fyfri1v.png')] bg-cover bg-center lg:block"></div>

      <div className="flex items-center justify-center bg-indigo-900 py-10">
        <form className="flex w-2/3 flex-col gap-4 text-white" onSubmit={login}>
          <h2 className="text-center text-4xl font-bold">Entrar</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="rounded border-2 border-white bg-transparent p-2 placeholder-white"
              value={usuarioLogin.usuario}
              onChange={atualizarEstado}
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
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center rounded bg-lime-400 py-2 font-bold text-indigo-900 hover:bg-lime-300"
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Entrar</span>}
          </button>

          <hr className="border-slate-500" />

          <p className="text-center">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="font-bold hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
