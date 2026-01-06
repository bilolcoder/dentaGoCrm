import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, footer, size = "max-w-md" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex justify-end">
            <div className={`bg-white w-full ${size} h-full shadow-2xl overflow-y-auto transform transition-all duration-300 border-l border-blue-50 dark:border-blue-900/20`}>

                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 md:p-8 border-b border-blue-50 sticky top-0 bg-white backdrop-blur-xl z-20">
                    <h2 className="text-xl md:text-2xl font-black text-[#00BCE4] uppercase tracking-tighter">{title}</h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all active:scale-95">
                        <X className="w-7 h-7" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-5 md:p-8 space-y-6 text-[#00BCE4] bg-white">
                    {children}
                </div>

                {/* Modal Footer */}
                {footer && (
                    <div className="p-6 md:p-8 border-t border-blue-50 sticky bottom-0 bg-white z-10 transition-colors duration-300">
                        {footer}
                    </div>
                )}

            </div>
        </div>

    );
};

export default Modal;
