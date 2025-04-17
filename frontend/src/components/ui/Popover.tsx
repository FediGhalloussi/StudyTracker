import React, { ReactNode } from 'react';

interface PopoverProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-10">
            <button onClick={onClose} className="absolute top-0 right-0 mt-1 mr-1 text-gray-500">
                &times;
            </button>
            {children}
        </div>
    );
};

export default Popover;
