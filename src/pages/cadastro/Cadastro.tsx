import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
        alert("Usuário cadastrado com sucesso");
      } catch (error) {
        alert("Erro ao cadastrar o Usuário");
      }
    } else {
      alert("Dados do usuário inconsistentes! Verifique as informações do cadastro.");
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }

    setIsLoading(false);
  }

  return (
    <div className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center bg-indigo-900 py-10">
        <form className="flex w-2/3 flex-col gap-4 text-white" onSubmit={cadastrarNovoUsuario}>
          <h2 className="text-center text-4xl font-bold">Cadastrar</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="rounded border-2 border-white bg-transparent p-2 placeholder-white"
              value={usuario.nome}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="rounded border-2 border-white bg-transparent p-2 placeholder-white"
              value={usuario.usuario}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="rounded border-2 border-white bg-transparent p-2 placeholder-white"
              value={usuario.foto}
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
              value={usuario.senha}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="rounded border-2 border-white bg-transparent p-2 placeholder-white"
              value={confirmarSenha}
              onChange={handleConfirmarSenha}
            />
          </div>

          <div className="flex justify-around gap-4">
            <button
              type="reset"
              className="w-1/2 rounded bg-red-400 py-2 font-bold text-white hover:bg-red-700"
              onClick={retornar}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="flex w-1/2 items-center justify-center rounded bg-lime-400 py-2 font-bold text-indigo-900 hover:bg-lime-300"
            >
              {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Cadastrar</span>}
            </button>
          </div>
        </form>
      </div>

      <div className="hidden bg-[url('https://i.imgur.com/ZZFAmzo.png')] bg-cover bg-center lg:block"></div>
    </div>
  );
}

export default Cadastro;
