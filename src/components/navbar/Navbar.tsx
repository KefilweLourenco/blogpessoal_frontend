import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    alert("O Usuário foi desconectado com sucesso!");
    navigate("/login");
  }

  return (
    <div className="w-full bg-indigo-900 py-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <Link to="/home" className="text-3xl font-bold">
          Blog Pessoal
        </Link>

        <div className="flex gap-4 text-lg">
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <Link to="/cadastro" className="hover:underline">
            Cadastrar
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="" onClick={logout} className="hover:underline">
            Sair
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
