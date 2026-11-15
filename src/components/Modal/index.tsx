import ExternalModal from "react-modal"
import { useContext } from "react"
import { ThemeContextInstance } from "../../contexts/themeContextInstance"

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10,
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '90vh',
    },
};

const darkStyles = {
    backgroundColor: '#2b2b36',
    color: '#f1f1f1',
    border: '1px solid #44444f',
};

ExternalModal.setAppElement('#root')

interface ExternalModalProps {
    closeModal: () => void;
    modalIsOpen: boolean;
    children: React.ReactNode;
}

export default function Modal({ closeModal, modalIsOpen, children }: ExternalModalProps) {

    const { theme } = useContext(ThemeContextInstance)

    const content = theme === "dark" ? { ...customStyles.content, ...darkStyles } : customStyles.content

    return (
        <ExternalModal onRequestClose={closeModal} isOpen={modalIsOpen} style={{ overlay: customStyles.overlay, content: content }}>
            {children}
        </ExternalModal>
    )
}