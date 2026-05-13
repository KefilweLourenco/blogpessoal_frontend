import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemaProps {
  tema: Tema;
}

function CardTema({ tema }: CardTemaProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-slate-200">
      <header className="bg-indigo-900 px-6 py-4 text-2xl font-bold text-white">
        Tema
      </header>

      <p className="p-8 text-3xl bg-slate-200 h-full">{tema.descricao}</p>

      <div className="flex">
        <Link
          to={`/editartema/${tema.id}`}
          className="w-full bg-indigo-400 py-2 text-center font-semibold text-white hover:bg-indigo-800"
        >
          Editar
        </Link>

        <Link
          to={`/deletartema/${tema.id}`}
          className="w-full bg-red-400 py-2 text-center font-semibold text-white hover:bg-red-700"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardTema;
