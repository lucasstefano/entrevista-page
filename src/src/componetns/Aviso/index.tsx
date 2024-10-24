import React from "react";
import { CloseButton, ModalContainer, ModalOverlay } from "./styled";

interface ModalProps {
    onClose: () => void;   
}

export default function WarnignModal ({ onClose }:ModalProps) {
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}> {/* Impede o fechamento ao clicar dentro do modal */}
            <CloseButton onClick={onClose}>✖</CloseButton>
                <ul>
            <li>Atenção! Não leia o texto em vermelho para o candidato, ele é o parâmetro de avaliação que a pergunta representa e as observações que você precisa ficar atento.</li>
            <li>Faça as perguntas que são sequenciais pausadamente e dando tempo para o entrevistado responder uma antes de responder a próxima. Não pergunte tudo de uma vez.</li>
            <li>Caso o entrevistado não saiba responder, ofereça mais tempo e assegure-o que pode responder com calma ou pule a questão e volte depois antes de terminar a entrevista.</li>
            <li>Caso o entrevistado seja muito vago e superficial, pergunte se ele pode explicar um pouco melhor - caso continue sendo vago anote a dificuldade no desenvolvimento e continue para a próxima pergunta.</li>
            <li>Não fuja do assunto (falar sobre filmes, animes, jogos etc…), seja educado e gentil mas permaneça sério e profissional para manter a avaliação focada no interesse em entrar na EJCM, não por você ser legal.</li>
            <li>Seja crítico e incisivo nas perguntas sobre D&I, resuma o que foi dito pelo candidato na planilha de avaliação e fique atento se o candidato é tolerante e está alinhado com os nossos valores (descreva se foi superficial, impressões, etc…).</li>
            <li>O tempo de tolerância é de 15 minutos, após corrido avise na planilha e no grupo de Senseis e GP manterá o contato com o candidato para remarcar.</li>
        </ul>
            </ModalContainer>
        </ModalOverlay>
    );
};
