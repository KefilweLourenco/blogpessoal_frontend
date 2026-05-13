import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar } from "../../../services/Service";
import CardTema from "../cardtema/CardTema";

function ListaTemas() {
  const navigate = useNavigate();

  const [temas, setTemas] = useState<Tema[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      alert("Erro ao buscar os temas.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token !== "") {
      buscarTemas();
    }
  }, [token]);

  return (
    <>
      {isLoading && (
        <div className="flex w-full items-center justify-center py-8">
          <ClipLoader color="#312e81" size={48} />
        </div>
      )}

      {!isLoading && temas.length === 0 && (
        <div className="flex justify-center py-10">
          <p className="text-2xl font-bold text-indigo-900">Nenhum tema foi encontrado.</p>
        </div>
      )}

      <div className="container mx-auto grid grid-cols-1 gap-4 px-4 py-8 md:grid-cols-2 lg:grid-cols-3">
        {temas.map((tema) => (
          <CardTema key={tema.id} tema={tema} />
        ))}
      </div>
    </>
  );
}

export default ListaTemas;
