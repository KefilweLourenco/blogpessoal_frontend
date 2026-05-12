import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

function Footer() {
  return (
    <>
      <div className="flex justify-center bg-indigo-900 text-white">
        <div className="container flex flex-col items-center gap-4 py-4">
          <p className="text-xl font-bold">Blog Pessoal KF | Copyright: 2026</p>
          <div className="flex gap-4">
            <LinkedinLogo size={48} weight="bold" />
            <InstagramLogo size={48} weight="bold" />
            <GithubLogo size={48} weight="bold" />
          </div>
        </div>
      </div>
      <div className="bg-black py-2 text-center text-white">
        <p>Feito com carinho por Kefilwe Lourenço</p>
      </div>
    </>
  );
}

export default Footer;
