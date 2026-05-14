import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemaPorId(idTema: string) {
    try {
      await buscar(`/temas/${idTema}`, setTema, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      ToastAlerta("Erro ao buscar tema.", "erro");
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Voce precisa estar logado", "info");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (id !== undefined) {
      buscarTemaPorId(id);
    }
  }, [id]);

  async function deletarTema() {
    try {
      await deletar(`/temas/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      ToastAlerta("Tema apagado com sucesso", "sucesso");
    } catch (error) {
      ToastAlerta("Erro ao apagar o tema.", "erro");
    }

    retornar();
  }

  function retornar() {
    navigate("/temas");
  }

  return (
    <div className="container mx-auto flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200">
        <header className="bg-indigo-900 px-8 py-6 text-center text-2xl font-bold text-white">
          Deletar Tema
        </header>

        <div className="flex flex-col gap-4 p-8">
          <p className="text-center text-3xl font-semibold">
            Voce tem certeza de que deseja apagar o tema a seguir?
          </p>
          <p className="text-center text-2xl">{tema.descricao}</p>

          <div className="flex justify-center gap-4">
            <button
              className="w-1/2 rounded bg-slate-400 py-2 font-semibold text-white hover:bg-slate-700"
              onClick={retornar}
            >
              Nao
            </button>
            <button
              className="w-1/2 rounded bg-red-400 py-2 font-semibold text-white hover:bg-red-700"
              onClick={deletarTema}
            >
              Sim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarTema;
