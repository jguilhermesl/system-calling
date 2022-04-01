import './style.css'
import { FiX } from 'react-icons/fi'
import fotoModal from '../../assets/fotoModal.svg'

export default function Modal({ conteudo, close }) {
    return (
        <div className="modal">
            <div className="containerModal">
                <div className="titleModal">
                    <h2>Detalhes do chamado</h2>
                    <button className="close" onClick={close}>
                        <FiX />
                    </button>
                </div>
                <div className="contentModal">
                    <div className="textsModal">
                        <p>Cliente:</p>
                        <span>{conteudo.cliente}</span>
                        <p>Assunto:</p>
                        <span>{conteudo.assunto}</span>
                        <p>Cadastrado em:</p>
                        <span>{conteudo.createdFormated}</span>
                        <p>Status:</p>
                        <span className="badge" style={{backgroundColor: conteudo.status === 'Aberto' ? '#5cb85c' : '#999'}}>{conteudo.status}</span>
                        {conteudo.complemento !== '' && (
                            <div className="boxComplemento">
                                <p>Complemento:</p>
                                <span>{conteudo.complemento}</span>
                            </div>
                        )}
                    </div>
                    <div className="imageModal">
                        <img src={fotoModal} alt="Foto SVG, Mulher" />
                    </div>
                </div>
            </div>
        </div>
    )
}