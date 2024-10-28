import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
    AppScreen,
    LeftSidebar,
    RightSidebar,
    ContentContainer,
    SectionHeader,
    HorizontalDivider,
    QuestionBlock,
    QuestionTextWrapper,
    CandidateNameContainer,
    TextInput,
    TextAreaInput,
    HeaderContainer,
    BoldHeaderText,
    RegularHeaderText,
    HeaderTextWrapper,
    IndicatorDot,
    QuestionText,
    CandidateNameText,
    SubmitButton,
    ButtonWrapper,
    InfoButton,
    TextInputSecond,
    SenseiNameContainer,
    IntroduceText,
    IntroduceTextRed,
    IntroduceContainer,
    SubTextAreaInput,
    InfoText,
    ImportText,
} from './styled';
import WarnignModal from '../../componetns/Aviso';
import Modal from '../../componetns/Modal';

interface SubQuestion {
    text: string;
    subinfo: string
}

type Question = {
    text: string;
    section: string;
    info: string;
    subQuestions?: { text: string, subinfo: string }[];
};

const questions: Question[] = [
    {
        text: "Pergunta 1) Se apresenta pra gente, me conta um pouco sobre você.",
        section: "FIT CULTURAL",
        info: "(comunicação, raciocínio lógico, visão sistêmica, persuasão) [Identifique na fala do candidato e pergunte se for preciso se ele aparenta ter boa gestão das atividades e se tem disponibilidade de 20h semanais para dedicação na EJCM]",
    },
    {
        text: "Pergunta 2) O que você achou de participar do dia de dinâmicas?",
        section: "FIT CULTURAL",
        info: "",
        subQuestions: [
            { text: "* Qual foi sua maior dificuldade e facilidade?", subinfo: '' },
            { text: "* Como foi escrever a resolução de case?", subinfo: '' },
            { text: "* Você usou alguma ferramenta para te auxiliar?", subinfo: '' },
        ],
    },
    {
        text: "Pergunta 3) Qual sua motivação para fazer parte da EJCM?",
        section: "FIT CULTURAL",
        info: "",
    },
    {
        text: "Pergunta 4) Você já conhecia a EJCM ou o Movimento Empresa Júnior, o MEJ?",
        section: "FIT CULTURAL",
        info: "",
        subQuestions: [
            { text: "* Qual a ideia que você tem da EJCM e do Movimento Empresa Júnior?", subinfo: '' },
        ],
    },
    {
        text: "Pergunta 5) Quais são seus objetivos de vida em longo e curto prazo?",
        section: "FIT CULTURAL",
        info: "",
        subQuestions: [
            { text: "* Como a EJCM te ajudaria com esses objetivos?", subinfo: '(Foco no resultado)' },
        ],
    },
    {
        text: "Pergunta 6) Descreva um momento em que você teve que tomar uma decisão rápida para resolver uma situação.",
        section: "TEAM BUILDING",
        info: "(Análise e solução de problemas, visão sistêmica)",
    },
    {
        text: "Pergunta 7) Quais são seus objetivos de vida?",
        section: "TEAM BUILDING",
        info: "",
        subQuestions: [
            { text: "* Como a EJCM te ajudaria com esses objetivos?", subinfo: '' },
        ],
    },
    {
        text: "Pergunta 8) Como as pessoas te enxergam?",
        section: "TEAM BUILDING",
        info: "(Comunicação, habilidade para ouvir, pedir feedback)",
        subQuestions: [
            { text: "* Você concorda com essa percepção?", subinfo: '' },
            { text: "* Por que?", subinfo: '' },
            { text: "* Como isso te afeta?", subinfo: '' },
        ],
    },
    {
        text: "Pergunta 9) Qual foi o melhor chefe/professor/figura de autoridade que você já teve?",
        section: "TEAM BUILDING",
        info: "",
        subQuestions: [{ text: "* Como ele(a) era?", subinfo: '(Percepção sobre liderança)' }],
    },
    {
        text: "Pergunta 10) Conte-me uma situação em que você contribuiu com suas próprias ideias ou atitudes, sem receber instruções.",
        section: "TEAM BUILDING",
        info: "(Proatividade, atitude empreendedora)",
    },
    {
        text: "Pergunta 11) O que diversidade e inclusão significam para você e qual a importância disso?",
        section: "DIVERSIDADE E INCLUSÃO",
        info: "",
    },
    {
        text: "Pergunta 12) Qual sua opinião sobre trabalhar em um ambiente diversificado?",
        section: "DIVERSIDADE E INCLUSÃO",
        info: "",
    },
    {
        text: "Pergunta 13) Diante de um comentário racista ou homofóbico dentro da empresa, qual é a sua reação?",
        section: "DIVERSIDADE E INCLUSÃO",
        info: "",
    },
    {
        text: "Pergunta 14) Por que você acha que deveria ser aprovado?",
        section: "PARA FINALIZAR",
        info: "(Persuasão, autoconfiança)",
    },
];


// Função para agrupar perguntas por seção
const groupQuestionsBySection = (questions: Question[]) => {
    return questions.reduce((acc, question) => {
        const section = question.section;
        if (!acc[section]) acc[section] = [];
        acc[section].push(question);
        return acc;
    }, {} as { [key: string]: Question[] });
};


// Componente principal
export default function Questionnaire() {
    const [candidato, setUserName] = useState<string>('');
    const [entrevistador, setEntrevistador] = useState<string>('');
    const [observador, setObservador] = useState<string>('');
    const [responses, setResponses] = useState<string[][]>(questions.map(() => ['']));
    const [subResponses, setSubResponses] = useState<string[][]>(questions.map(() => []));
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [warningOpen, setWarningOpen] = useState<boolean>(true);
    const [modalContent, setModalContent] = useState<string>('');


    const handleOpenModal = (content: string) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setModalContent('');
    };

    const handleCloseWarning = () => {
        setWarningOpen(false);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };
    const handleEntrevistadorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEntrevistador(e.target.value);
    };
    const handleObservadorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setObservador(e.target.value);
    };

    const handleChange = (sectionIndex: number, questionIndex: number, value: string) => {
        const updatedResponses = [...responses];
        if (!updatedResponses[sectionIndex]) updatedResponses[sectionIndex] = [];
        updatedResponses[sectionIndex][questionIndex] = value;
        setResponses(updatedResponses);
    };

    const handleSubChange = (questionIndex: number, subIndex: number, value: string) => {
        const updatedSubResponses = [...subResponses];

        // Inicializa o array da pergunta, se ainda não existir
        if (!updatedSubResponses[questionIndex]) {
            updatedSubResponses[questionIndex] = [];
        }

        // Inicializa a subpergunta como uma string vazia se ainda não existir
        if (typeof updatedSubResponses[questionIndex][subIndex] === 'undefined') {
            updatedSubResponses[questionIndex][subIndex] = '';
        }

        // Atribui o valor da resposta da subpergunta
        updatedSubResponses[questionIndex][subIndex] = value;
        setSubResponses(updatedSubResponses);
    };
    const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false); // Novo estado

    const handleButton = () => {
        if(candidato !== ''){
        setIsGeneratingPdf(true); // Inicia a geração do PDF
        }else(
            alert('Preencha o Nome do Candidato')
        )   
    }

    useEffect(() => {
        if (isGeneratingPdf) {
            generatePdf()
        }
    }, [isGeneratingPdf]);

    const generatePdf = async () => {
        const element = document.body; // ou qualquer outro elemento que você queira capturar
        const canvas = await html2canvas(element, {
            scale: 2, // Aumentar a escala para melhor resolução
            useCORS: true, // Permite capturar imagens externas
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190; // Largura da imagem no PDF
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth + 20) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Adiciona a imagem ao PDF e divide em páginas se necessário
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 40) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        const today = new Date();
        const formattedDate = today.toLocaleDateString('pt-BR');

        pdf.save(`EntrevistaPSE-${candidato}-${formattedDate}.pdf`);
        setIsGeneratingPdf(false)
    };



    const groupedQuestions = groupQuestionsBySection(questions);

    return (
        <AppScreen>
            {isGeneratingPdf ? (
                null
            ) : (<>
                <LeftSidebar />
                <RightSidebar />
            </>)}
            <ContentContainer>
                <HeaderContainer>
                    <img src={require('../../assets/Logo.svg').default} alt="Logo" />
                    <HeaderTextWrapper>
                        <BoldHeaderText>Roteiro de Entrevista</BoldHeaderText>
                        <IndicatorDot />
                        <RegularHeaderText>Processo Seletivo Externo</RegularHeaderText>
                    </HeaderTextWrapper>
                </HeaderContainer>
                <HorizontalDivider />

                <CandidateNameContainer>
                    <CandidateNameText>Nome do Candidato</CandidateNameText>
                    <TextInput type="text" value={candidato} onChange={handleNameChange} />
                </CandidateNameContainer>
                <SenseiNameContainer>
                    <CandidateNameText>Entrevistador</CandidateNameText>
                    <TextInputSecond type="text" value={entrevistador} onChange={handleEntrevistadorChange} />
                    <CandidateNameText>Observador</CandidateNameText>
                    <TextInputSecond type="text" value={observador} onChange={handleObservadorChange} />
                </SenseiNameContainer>

                <IntroduceContainer>
                    <IntroduceText>
                        Oi, <IntroduceTextRed>{candidato === '' ? ('XXXXXXX') : (candidato)}</IntroduceTextRed>! Tudo bem? Bem-vinda(o) à entrevista. Pode ficar à vontade.
                        Eu me chamo <IntroduceTextRed>{entrevistador === '' ? ('XXXXXX') : (entrevistador)}</IntroduceTextRed> e vou ser seu(sua) entrevistador(a) hoje. Esse(a) é <IntroduceTextRed>{observador === '' ? ('XXXXXX') : (observador)}</IntroduceTextRed>, o(a) observador(a) que vai ajudar a fazer anotações.
                        <br /> <br />
                        A gente vai começar a entrevista, então pode ficar tranquila(o)! É pra gente levar como se fosse uma conversa. Essa é uma oportunidade para você mostrar um pouco sobre você. Agora que você já conhece a gente, é a nossa vez de te conhecer melhor. Podemos começar?
                    </IntroduceText>
                </IntroduceContainer>


                {Object.entries(groupedQuestions).map(([section, questions], sectionIndex) => (
                    <div key={section}>
                        <SectionHeader>{section}</SectionHeader>
                        {questions.map((question, questionIndex) => (
                            <QuestionBlock key={questionIndex}>
                                <QuestionTextWrapper>
                                    <QuestionText>
                                        {question.text}
                                        {question.info !== '' ? (
                                            <InfoText>{question.info}</InfoText>
                                        ) : (null)}
                                    </QuestionText>
                                </QuestionTextWrapper>
                                {isGeneratingPdf ? ( // Verifica se está gerando PDF
                                    <div style={{ width: '100%', marginBottom: '10px' }}>
                                        <QuestionText>{responses[sectionIndex][questionIndex]}</QuestionText>
                                    </div>
                                ) : (
                                    <TextAreaInput
                                        value={responses[sectionIndex][questionIndex] || ''}
                                        onChange={(e) => handleChange(sectionIndex, questionIndex, e.target.value)}
                                    />
                                )}
                                {question.text === "Pergunta 5) Quais são seus objetivos de vida em longo e curto prazo?" && (
                                    <div style={{ marginBottom: '10px' }}>
                                        <ImportText>Pontos Principais:<br />
                                            •RG toda sexta 15h - 17h (inegociável), tem que ter um horário disponível na agenda<br />
                                            •Os horários são flexíveis, cada membro faz sua carga horária da forma que preferir<br />
                                            •A dinâmica de reuniões de cada squad é combinada dentro do próprio squad<br />
                                            •Política de avisar se for dar ruim</ImportText>
                                    </div>
                                )}
                                {question.subQuestions && question.subQuestions.map((subQuestion, subIndex) => (
                                    <div key={subIndex}>
                                        <QuestionText>{subQuestion.text}
                                            {subQuestion.subinfo !== '' ? (
                                                <InfoText>{subQuestion.subinfo}</InfoText>
                                            ) : (null)}
                                        </QuestionText>
                                        {isGeneratingPdf ? ( // Verifica se está gerando PDF
                                            <div style={{ width: '100%', marginBottom: '10px' }}>
                                                <QuestionText>{subResponses[sectionIndex][questionIndex]}</QuestionText>
                                            </div>
                                        ) : (
                                            <SubTextAreaInput
                                                value={subResponses[sectionIndex]?.[subIndex] || ''}
                                                onChange={(e) => handleSubChange(sectionIndex, subIndex, e.target.value)}
                                            />)}
                                    </div>
                                ))}
                            </QuestionBlock>
                        ))}
                        {sectionIndex < Object.keys(groupedQuestions).length - 1 && <HorizontalDivider />}
                    </div>
                ))}

                <ImportText>Aviso Final:<br />
                    •Os resultados da entrevista saem até dia 12/07/2024 (sexta-feira)<br />
                    •Lembrar de sempre olhar o spam<br />
                    •Perguntar se o candidato tem alguma dúvida<br />
                    •Qualquer problema que ele tiver mandar email para gp: equipe.gp@ejcm.com.br<br />
                    Boa sorte!
                </ImportText>
                <ButtonWrapper>
                    <SubmitButton onClick={handleButton}>Gerar PDF</SubmitButton>
                </ButtonWrapper>
            </ContentContainer>

            {warningOpen && (
                <WarnignModal onClose={handleCloseWarning} />
            )}
            {modalOpen && (
                <Modal onClose={handleCloseModal} content={modalContent} />
            )}
        </AppScreen>
    );
}
