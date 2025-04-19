
const Modal = ({ children }) => {
    return (
        <div id="modal" className="fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-50 h-s">
            {children}
        </div>
    )
}

export default Modal