import { createPortal } from 'react-dom';

const portal = document.createElement('div');
portal.classList.add('drag-portal');
document.body.appendChild(portal);

export const DraggablePortal = ({ children, snapshot }) => {
    if (snapshot.isDragging) {
        return createPortal(children, portal);
    }
    return children;
};

export default DraggablePortal;
