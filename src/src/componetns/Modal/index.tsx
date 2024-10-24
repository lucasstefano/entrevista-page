import React from 'react';
import { CloseButton, ModalContainer, Overlay } from './styled';

interface ModalProps {
    onClose: () => void;
    content: string;
}

export default function Modal({ onClose, content }:ModalProps) {
    return (
        <Overlay>
            <ModalContainer>
                <CloseButton onClick={onClose}>✖</CloseButton>
                <p>{content}</p>
            </ModalContainer>
        </Overlay>
    );
};

