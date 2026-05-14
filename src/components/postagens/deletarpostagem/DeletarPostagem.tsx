import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(idPostagem: string) {
    try {
      await buscar(`/postagens/${idPostagem}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
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
      buscarPorId(id);
    }
  }, [id]);

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Postagem apagada com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/postagens");
  }

  return (
    <div className="container mx-auto w-full max-w-xl px-4 py-8">
      <h1 className="my-4 text-center text-4xl">Deletar Postagem</h1>

      <p className="mb-4 text-center font-semibold">
        Voce tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className="flex flex-col justify-between overflow-hidden rounded-2xl border">
        <header className="bg-indigo-600 px-6 py-2 text-2xl font-bold text-white">Postagem</header>
        <div className="p-4">
          <p className="h-full text-xl">{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className="flex">
          <button
            className="w-full bg-red-400 py-2 text-slate-100 hover:bg-red-600"
            onClick={retornar}
          >
            Nao
          </button>
          <button
            className="flex w-full items-center justify-center bg-indigo-400 text-slate-100 hover:bg-indigo-600"
            onClick={deletarPostagem}
          >
            {isLoading ? <ClipLoader color="#ffffff" size={24} /> : <span>Sim</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarPostagem;
