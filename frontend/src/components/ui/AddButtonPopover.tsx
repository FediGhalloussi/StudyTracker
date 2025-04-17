import React, { ReactNode, useState } from 'react';
import AddButton from './AddButton';
import Popover from './Popover';

interface AddButtonPopoverProps {
    children: ReactNode;
}

const AddButtonPopover: React.FC<AddButtonPopoverProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <AddButton onClick={() => setIsOpen(!isOpen)} />
            <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
                {children}
            </Popover>
        </div>
    );
};

export default AddButtonPopover;
