import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    ToastAlerta("O usuario foi desconectado com sucesso!", "info");
    navigate("/login");
  }

  let component = null;

  if (usuario.token !== "") {
    component = (
      <div className="w-full bg-indigo-900 py-4 text-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <Link to="/home" className="text-3xl font-bold">
            Blog Pessoal
          </Link>

          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <Link to="/postagens" className="hover:underline">
              Postagens
            </Link>
            <Link to="/temas" className="hover:underline">
              Temas
            </Link>
            <Link to="/cadastrartema" className="hover:underline">
              Cadastrar tema
            </Link>
            <Link to="/perfil" className="hover:underline">
              Perfil
            </Link>
            <Link to="" onClick={logout} className="hover:underline">
              Sair
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{component}</>;
}

export default Navbar;
