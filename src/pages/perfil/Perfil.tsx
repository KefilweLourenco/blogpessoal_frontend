import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { UserCircle } from "@phosphor-icons/react";

function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const [mostrarFoto, setMostrarFoto] = useState<boolean>(true);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Voce precisa estar logado", "info");
      navigate("/login");
    }
  }, [usuario.token, navigate]);

  useEffect(() => {
    setMostrarFoto(true);
  }, [usuario.foto]);

  return (
    <div className="mx-auto my-4 flex max-w-6xl flex-col overflow-hidden rounded-2xl">
      <img
        className="h-72 w-full object-cover"
        src="https://i.imgur.com/ZZFAmzo.jpg"
        alt="Capa da pagina de perfil"
      />

      <div className="flex w-full flex-col items-center bg-sky-500 px-8 pb-20 pt-8">
        <div className="-mt-28 flex h-44 w-44 items-center justify-center rounded-full border-8 border-white bg-white">
          {usuario.foto && mostrarFoto ? (
            <img
              className="h-full w-full rounded-full object-cover"
              src={usuario.foto}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                setMostrarFoto(false);
              }}
              alt={`Foto de perfil de ${usuario.nome}`}
            />
          ) : (
            <UserCircle size={132} weight="fill" className="text-slate-500" />
          )}
        </div>
        <h1 className="mt-4 text-center text-2xl text-white">Nome: {usuario.nome}</h1>
        <p className="text-center text-2xl text-white">Email: {usuario.usuario}</p>
      </div>
    </div>
  );
}

export default Perfil;
