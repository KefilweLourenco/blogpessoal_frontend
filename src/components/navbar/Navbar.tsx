function Navbar() {
  return (
    <div className="w-full bg-indigo-900 py-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="text-3xl font-bold">Blog Pessoal</div>

        <div className="flex gap-4 text-lg">
          <span>Home</span>
          <span>Postagens</span>
          <span>Temas</span>
          <span>Cadastrar tema</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
