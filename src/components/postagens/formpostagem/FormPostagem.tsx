import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, buscarPorId, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);
  const [tema, setTema] = useState<Tema>({} as Tema);
  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    texto: "",
    data: "",
    tema: null,
    usuario: null,
  });

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(idPostagem: string) {
    try {
      await buscarPorId(`/postagens/${idPostagem}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarTemaPorId(idTema: string) {
    try {
      await buscarPorId(`/temas/${idTema}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Voce precisa estar logado!", "info");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token !== "") {
      buscarTemas();

      if (id !== undefined) {
        buscarPostagemPorId(id);
      }
    }
  }, [id, token]);

  useEffect(() => {
    if (postagem.tema !== null) {
      setTema(postagem.tema);
    }
  }, [postagem.tema]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar("/postagens", postagem, setPostagem, {
          headers: { Authorization: token },
        });
        ToastAlerta("Postagem atualizada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar a postagem.", "erro");
        }
      }
    } else {
      try {
        await cadastrar("/postagens", postagem, setPostagem, {
          headers: { Authorization: token },
        });
        ToastAlerta("Postagem cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar a postagem.", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.id === undefined || tema.id === 0;

  return (
    <div className="container mx-auto flex justify-center px-4 py-8">
      <form className="flex w-full max-w-2xl flex-col gap-4" onSubmit={gerarNovaPostagem}>
        <h1 className="my-4 text-center text-4xl">
          {id === undefined ? "Cadastrar Postagem" : "Editar Postagem"}
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da postagem</label>
          <input
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="rounded border-2 border-slate-700 p-2"
            value={postagem.titulo}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="texto">Texto da postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="rounded border-2 border-slate-700 p-2"
            value={postagem.texto}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Tema da postagem</p>
          <select
            name="tema"
            id="tema"
            className="rounded border border-slate-800 p-2"
            value={tema.id ?? ""}
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" disabled>
              Selecione um Tema
            </option>

            {temas.map((itemTema) => (
              <option key={itemTema.id} value={itemTema.id}>
                {itemTema.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          disabled={carregandoTema}
          className="mx-auto flex w-1/2 justify-center rounded bg-indigo-400 py-2 text-slate-100 hover:bg-indigo-800"
          type="submit"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={24} />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;
