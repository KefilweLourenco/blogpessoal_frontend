import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Voce precisa estar logado", "info");
      navigate("/login");
    }
  }, [usuario.token, navigate]);

  return (
    <div className="mx-auto my-4 flex max-w-5xl flex-col rounded-2xl border border-slate-200">
      <img
        className="h-72 w-full rounded-t-2xl object-cover"
        src="https://i.imgur.com/ZZFAmzo.jpg"
        alt="Capa da pagina de perfil"
      />

      <div className="mx-auto flex w-full translate-y-[-5rem] flex-col items-center justify-center px-8">
        <img
          className="h-56 w-56 rounded-full border-8 border-white object-cover"
          src={usuario.foto}
          alt={`Foto de perfil de ${usuario.nome}`}
        />
        <h1 className="mt-4 text-center text-2xl font-bold text-slate-900">{usuario.nome}</h1>
        <p className="text-center text-lg text-slate-700">{usuario.usuario}</p>
      </div>
    </div>
  );
}

export default Perfil;
