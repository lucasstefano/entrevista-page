import React, { useEffect, useState } from "react";
import { ButtonWrapper, CloseButton, InputBase, ModalContainer, ModalOverlay, StyText, StyTextBold, SubmitButton, Topbar } from "./styled";

interface ModalProps {
    onClose: () => void;
}

const TELEGRAM_BOT_TOKEN = '7063417234:AAHnnl3Qbibq3p9DHHj9PY9sXGlvwsn_E_c';
const CHAT_ID = '1554233523'; // Substitua pelo seu chat_id ou ID de grupo



const sendMessageToTelegram = async (message: string, date:any) => {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const data = {
        chat_id: CHAT_ID,
        text: `${message} Acessou o Forms agr ${date}`,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
        } else {
            alert('Erro ao enviar mensagem.');
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem para o Telegram:', error);
        alert('Erro de conexão.');
    }
};



export default function WarnignModal({ onClose }: ModalProps) {

    const [message, setMessage] = useState<string>('');

    const [dateTime, setDateTime] = useState('');

    useEffect(() => {
        const getCurrentDateTime = () => {
            const now = new Date();
            const formattedDate = now.toLocaleString(); // Exibe data e hora no formato local
            setDateTime(formattedDate);
        };

        getCurrentDateTime();

        // Atualiza a cada minuto
        const intervalId = setInterval(getCurrentDateTime, 60000);

        // Limpeza do intervalo ao desmontar o componente
        return () => clearInterval(intervalId);
    }, []);

    const handleSendMessage = () => {
        if (message.trim()) {
            if (message === 'EJCM2025'){
                sendMessageToTelegram(message,dateTime);
                setMessage(''); // Limpa o campo de mensagem após o envio
                onClose()

            }
            else{
                alert('Não Autorizado')
            }

        } else {
            alert('Digite uma mensagem para enviar.');
        }
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}> {/* Impede o fechamento ao clicar dentro do modal */}
                <StyTextBold>Atenção!</StyTextBold>
                <StyText>Não leia o texto em vermelho para o candidato! Ele indica as diretrizes de avaliação da pergunta, os pontos aos quais você deve ficar mais atento.</StyText>
                <StyText>O tempo de tolerância é de 15 minutos. Caso o candidato ultrapasse esse tempo, avise na planilha e no grupo de Senseis,  GP manterá o contato com o candidato para remarcar.</StyText>
                <StyText>Faça as perguntas que são sequenciais pausadamente, dando tempo para o entrevistado responder uma antes de responder a próxima. Não pergunte tudo de uma vez.</StyText>
                <StyText>Caso o entrevistado não saiba responder, ofereça mais tempo e assegure-o que pode responder com calma ou pular a questão e voltar a ela mais tarde, antes de terminar a entrevista.</StyText>
                <StyText>Se o entrevistado for muito vago e superficial, pergunte se ele pode explicar um pouco melhor. Caso continue sendo vago, anote a dificuldade no desenvolvimento, e então siga para a próxima pergunta.</StyText>
                <StyText>Não fuja do assunto (falar sobre filmes, animes, jogos, etc). Seja educado e gentil mas permaneça sério e profissional, para manter a avaliação focada no interesse em entrar na EJCM, não por você ser legal.</StyText>
                <StyText>Seja crítico e incisivo nas perguntas sobre D&I, resuma o que foi dito pelo candidato na planilha de avaliação e fique atento se o candidato é tolerante e está alinhado com os nossos valores (descreva se foi superficial, impressões, etc).</StyText>
                <ButtonWrapper>
                    <InputBase
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Insira seu Nome"
                    />
                    <SubmitButton onClick={handleSendMessage}>Prosseguir</SubmitButton>
                </ButtonWrapper>
            </ModalContainer>

        </ModalOverlay>
    );
};
