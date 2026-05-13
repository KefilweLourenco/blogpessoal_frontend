import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FormPostagem from "../formpostagem/FormPostagem";

function ModalPostagem() {
  return (
    <Popup
      trigger={
        <button
          className="rounded text-white bg-indigo-800 
                    hover:bg-indigo-600 px-4 py-2"
        >
          Nova Postagem
        </button>
      }
      modal
      contentStyle={{
        borderRadius: "1rem",
        paddingBottom: "2rem",
      }}
    >
      <FormPostagem />
    </Popup>
  );
}

export default ModalPostagem;
