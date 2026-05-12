import { Link } from "react-router-dom";

function Navbar() {
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
        </div>
      </div>
    </div>
  );
}

export default Navbar;
