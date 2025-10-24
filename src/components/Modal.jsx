import { useRef } from "react";
import NewBook from "./NewBook";

export default function Modal({ children }) {
    const modalRef = useRef();

    function openModal() {
        modalRef.current.showModal();
    }

    return (
        <>
            <NewBook onClick={openModal} />
            <dialog className="newBookDialog" ref={modalRef}>
                {children}
            </dialog>
        </>
    );
}
