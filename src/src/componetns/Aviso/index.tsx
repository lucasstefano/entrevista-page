import React from "react";
import { ButtonWrapper, CloseButton, ModalContainer, ModalOverlay, StyText, StyTextBold, SubmitButton, Topbar } from "./styled";

interface ModalProps {
    onClose: () => void;   
}

export default function WarnignModal ({ onClose }:ModalProps) {
    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}> {/* Impede o fechamento ao clicar dentro do modal */}
              <Topbar/>
              <StyTextBold>Atenção!</StyTextBold>
              <StyText>Não leia o texto em vermelho para o candidato! Ele indica as diretrizes de avaliação da pergunta, os pontos aos quais você deve ficar mais atento.</StyText>
              <StyText>O tempo de tolerância é de 15 minutos. Caso o candidato ultrapasse esse tempo, avise na planilha e no grupo de Senseis,  GP manterá o contato com o candidato para remarcar.</StyText>
              <StyText>Faça as perguntas que são sequenciais pausadamente, dando tempo para o entrevistado responder uma antes de responder a próxima. Não pergunte tudo de uma vez.</StyText>
              <StyText>Caso o entrevistado não saiba responder, ofereça mais tempo e assegure-o que pode responder com calma ou pular a questão e voltar a ela mais tarde, antes de terminar a entrevista.</StyText>
              <StyText>Se o entrevistado for muito vago e superficial, pergunte se ele pode explicar um pouco melhor. Caso continue sendo vago, anote a dificuldade no desenvolvimento, e então siga para a próxima pergunta.</StyText>
              <StyText>Não fuja do assunto (falar sobre filmes, animes, jogos, etc). Seja educado e gentil mas permaneça sério e profissional, para manter a avaliação focada no interesse em entrar na EJCM, não por você ser legal.</StyText>
              <StyText>Seja crítico e incisivo nas perguntas sobre D&I, resuma o que foi dito pelo candidato na planilha de avaliação e fique atento se o candidato é tolerante e está alinhado com os nossos valores (descreva se foi superficial, impressões, etc).</StyText>
        <ButtonWrapper>
        <SubmitButton onClick={onClose}>Prosseguir</SubmitButton>
        </ButtonWrapper>
            </ModalContainer>

        </ModalOverlay>
    );
};
