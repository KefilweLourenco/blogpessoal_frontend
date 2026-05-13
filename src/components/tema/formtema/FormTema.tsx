import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormTema() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      alert("Erro ao buscar tema.");
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (id !== undefined) {
      buscarTemaPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/temas");
  }

  async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar("/temas", tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        alert("Tema atualizado com sucesso");
      } catch (error) {
        alert("Erro ao atualizar o tema.");
      }
    } else {
      try {
        await cadastrar("/temas", tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        alert("Tema cadastrado com sucesso");
      } catch (error) {
        alert("Erro ao cadastrar o tema.");
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container mx-auto flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border-2 border-slate-200 p-8">
        <h1 className="text-center text-4xl font-bold text-indigo-900">
          {id === undefined ? "Cadastrar Tema" : "Editar Tema"}
        </h1>

        <form className="mt-8 flex flex-col gap-4" onSubmit={gerarNovoTema}>
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao" className="text-lg font-semibold text-indigo-900">
              Descrição do Tema
            </label>
            <input
              type="text"
              placeholder="Descreva aqui seu tema"
              name="descricao"
              required
              className="rounded border-2 border-slate-300 p-2"
              value={tema.descricao}
              onChange={atualizarEstado}
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="w-1/2 rounded bg-slate-400 py-2 font-semibold text-white hover:bg-slate-700"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex w-1/2 items-center justify-center rounded bg-indigo-900 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Confirmar</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormTema;
