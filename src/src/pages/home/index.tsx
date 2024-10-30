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
    SessaoDiv,
    SubQuestionBar,
    SubLeftBar,
    QuestionTextPDF,
    ResponseGenerate,
} from './styled';
import WarnignModal from '../../componetns/Aviso';
import Modal from '../../componetns/Modal';

interface SubQuestion {
    text: string;
    subinfo: string;
    help: string;
}

type Question = {
    text: string;
    section: string;
    info: string;
    help: string;
    subQuestions?: { text: string, subinfo: string, help: string }[];
};

const questions: Question[] = [
    {
        text: "1) Se apresenta pra gente, me conta um pouco sobre você.",
        section: "FIT CULTURAL",
        help: '',
        info: "(comunicação, raciocínio lógico, visão sistêmica, persuasão) [Identifique na fala do candidato e pergunte se for preciso se ele aparenta ter boa gestão das atividades e se tem disponibilidade de 20h semanais para dedicação na EJCM]",
    },
    {
        text: "2) O que você achou de participar do dia de dinâmicas?",
        help: '',
        section: "FIT CULTURAL",
        info: "",
        subQuestions: [
            { text: "a) Qual foi sua maior dificuldade e facilidade?", subinfo: '', help: '' },
            { text: "b) Como foi escrever a resolução de case?", subinfo: '', help: '' },
            { text: "c) Você usou alguma ferramenta para te auxiliar?", subinfo: '', help: '' },
        ],
    },
    {
        text: "3) Qual sua motivação para fazer parte da EJCM?",
        help: '',
        section: "FIT CULTURAL",
        info: "",
    },
    {
        text: "4) Você já conhecia a EJCM ou o Movimento Empresa Júnior, o MEJ?",
        help: '',
        section: "FIT CULTURAL",
        info: "",
        subQuestions: [
            { text: "a) Qual a ideia que você tem da EJCM e do Movimento Empresa Júnior?", subinfo: '', help: '' },
        ],
    },
    {
        text: "5) Quais são seus objetivos de vida em longo e curto prazo?",
        help: '',
        section: "FIT CULTURAL",
        info: "",
        subQuestions: [
            { text: "a) Como a EJCM te ajudaria com esses objetivos?", subinfo: '(Foco no resultado)', help: '', },
        ],
    },
    {
        text: '6)',
        help: 'Ai Papapi',
        section: "FIT CULTURAL",
        info: "",
        subQuestions: [
            { text: "a) Em qual você acha que poderia se desenvolver mais?", subinfo: '', help: '' },
            { text: "b) Por Que?", subinfo: '', help: '' },
        ],
    },
    {
        text: "7) Descreva um momento em que você teve que tomar uma decisão rápida para resolver uma situação.",
        help: '',
        section: "TEAM BUILDING",
        info: "(Análise e solução de problemas, visão sistêmica)",
    },
    {
        text: "8) Quais são seus objetivos de vida?",
        help: '',
        section: "TEAM BUILDING",
        info: "",
        subQuestions: [
            { text: "a) Como a EJCM te ajudaria com esses objetivos?", subinfo: '', help: '' },
        ],
    },
    {
        text: "8) Como as pessoas te enxergam?",
        help: '',
        section: "TEAM BUILDING",
        info: "(Comunicação, habilidade para ouvir, pedir feedback)",
        subQuestions: [
            { text: "a) Você concorda com essa percepção?", subinfo: '', help: '' },
            { text: "b) Por que?", subinfo: '', help: '' },
            { text: "c) Como isso te afeta?", subinfo: '', help: '' },
        ],
    },
    {
        text: "9) Qual foi o melhor chefe/professor/figura de autoridade que você já teve?",
        help: '',
        section: "TEAM BUILDING",
        info: "",
        subQuestions: [{ text: "a) Como ele(a) era?", subinfo: '(Percepção sobre liderança)', help: '', }],
    },
    {
        text: "10) Conte-me uma situação em que você contribuiu com suas próprias ideias ou atitudes, sem receber instruções.",
        help: '',
        section: "TEAM BUILDING",
        info: "(Proatividade, atitude empreendedora) Exemplo: Quando tive q correr atras de onibus",
    },
    {
        text: "11) O que diversidade e inclusão significam para você e qual a importância disso?",
        help: '',
        section: "DIVERSIDADE E INCLUSÃO",
        info: "",
    },
    {
        text: "12) Qual sua opinião sobre trabalhar em um ambiente diversificado?",
        help: '',
        section: "DIVERSIDADE E INCLUSÃO",
        info: "",
    },
    {
        text: "13) Diante de um comentário racista ou homofóbico dentro da empresa, qual é a sua reação?",
        help: '',
        section: "DIVERSIDADE E INCLUSÃO",
        info: "",
    },
    {
        text: "14) Por que você acha que deveria ser aprovado?",
        help: '',
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

    const handleSubChange = (
        questionIndex: number,
        subIndex: number,
        value: string
    ) => {
        setSubResponses((prevResponses) => {
            const updatedResponses = [...prevResponses];

            // Se ainda não existir um array de subrespostas para a pergunta, cria um vazio
            if (!updatedResponses[questionIndex]) {
                updatedResponses[questionIndex] = [];
            }

            // Garante que as outras subperguntas permaneçam inalteradas
            const updatedSubQuestion = [...(updatedResponses[questionIndex] || [])];
            updatedSubQuestion[subIndex] = value;
            updatedResponses[questionIndex] = updatedSubQuestion;

            return updatedResponses;
        });
    };

    const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false); // Novo estado

    const handleButton = () => {
        if (candidato !== '') {
            setIsGeneratingPdf(true); // Inicia a geração do PDF
        } else (
            alert('Preencha o Nome do Candidato')
        )
    }


    useEffect(() => {
        if (isGeneratingPdf) {
            generatePdf()
        }
    }, [isGeneratingPdf]);
    const generatePdf = async () => {
        const element = document.body; // Elemento a ser capturado
        const canvas = await html2canvas(element, {
            scale: 2, // Melhora a qualidade
            useCORS: true, // Permite carregar imagens externas
        });
    
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
    
        const imgWidth = 190; // Largura da imagem no PDF (em mm)
        const pageHeight = pdf.internal.pageSize.height; // Altura da página do PDF (em mm)
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Altura proporcional da imagem
        let heightLeft = imgHeight; // Controle da altura restante para renderizar
        let position = 0; // Controle da posição vertical
    
        // Adicionar a primeira página
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    
        // Adicionar páginas subsequentes (se necessário)
        while (heightLeft > 0) {
            pdf.addPage();
            position = heightLeft - imgHeight; // Define a nova posição no canvas
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
    
        const today = new Date();
        const formattedDate = today.toLocaleDateString('pt-BR');
        pdf.save(`EntrevistaPSE-${formattedDate}.pdf`);
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
                <HorizontalDivider style={{ width: '100%' }} />

                <CandidateNameContainer>

                    {isGeneratingPdf ? ( // Verifica se está gerando PDF
                        <div style={{ width: '100%', marginBottom: '10px' }}>
                            <QuestionText>Nome do Candidato: {candidato}</QuestionText>
                        </div>
                    ) : (
                        <><CandidateNameText>Nome do Candidato</CandidateNameText>
                            <TextInput type="text" value={candidato} onChange={handleNameChange} /></>)}
                </CandidateNameContainer>
                <SenseiNameContainer>
                    {isGeneratingPdf ? ( // Verifica se está gerando PDF
                        <div style={{ width: '100%' }}>
                            <QuestionText>Entrevistador: {entrevistador}</QuestionText>
                        </div>
                    ) : (
                        <> <CandidateNameText>Entrevistador</CandidateNameText>
                            <TextInputSecond type="text" value={entrevistador} onChange={handleEntrevistadorChange} />
                        </>
                    )}
                    {isGeneratingPdf ? ( // Verifica se está gerando PDF
                        <div style={{ width: '100%' }}>
                            <QuestionText>Observador: {observador}</QuestionText>
                        </div>
                    ) : (
                        <> <CandidateNameText>Observador</CandidateNameText>
                            <TextInputSecond type="text" value={observador} onChange={handleObservadorChange} />
                        </>)}
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
                    <SessaoDiv key={section}>
                        <SectionHeader>{section}</SectionHeader>
                        {questions.map((question, questionIndex) => (
                            <QuestionBlock key={questionIndex}>
                                <QuestionTextWrapper>
                                    {isGeneratingPdf ? (

                                        <QuestionText style={{ fontWeight: 700 }}>
                                            {question.text === '6)' ? (
                                                <>Pergunta 6) Dado os nossos valores:<br /><br />•Comprometimento com os resultados<br /> •Entregar soluções de impacto<br /> •Responsabilidade ético-social<br /> •Promover diversidade e inclusão<br /> •Compartilhar conhecimentos<br /> •Crescimento conjunto e empático<br /> •Orgulho de Ser Samurai<br /><br /> Em qual deles você mais se reconhece?</>
                                            ) : (question.text)}
                                        </QuestionText>
                                    ) : (
                                        <QuestionText>
                                            {question.text === '6)' ? (
                                                <>Pergunta 6) Dado os nossos valores:<br /><br />•Comprometimento com os resultados<br /> •Entregar soluções de impacto<br /> •Responsabilidade ético-social<br /> •Promover diversidade e inclusão<br /> •Compartilhar conhecimentos<br /> •Crescimento conjunto e empático<br /> •Orgulho de Ser Samurai<br /><br /> Em qual deles você mais se reconhece?</>
                                            ) : (question.text)}
                                            {question.help === "" ? (null) : (
                                                <InfoButton onClick={() => handleOpenModal(question.help)}>i</InfoButton>
                                            )}
                                            {question.info !== '' ? (
                                                <InfoText>{question.info}</InfoText>
                                            ) : (null)}

                                        </QuestionText>
                                    )}


                                </QuestionTextWrapper>
                                {isGeneratingPdf ? ( // Verifica se está gerando PDF
                                    <ResponseGenerate>
                                        <QuestionTextPDF>{responses[sectionIndex][questionIndex]}</QuestionTextPDF>
                                    </ResponseGenerate>
                                ) : (
                                    <TextAreaInput
                                        placeholder='Responda Aqui...'
                                        value={responses[sectionIndex][questionIndex] || ''}
                                        onChange={(e) => handleChange(sectionIndex, questionIndex, e.target.value)}
                                    />
                                )}
                                <SubQuestionBar>
                                    <SubLeftBar />
                                    <div style={{ width: '100%' }}>
                                        {question.subQuestions && question.subQuestions.map((subQuestion, subIndex) => (
                                            <div key={subIndex} >
                                                {isGeneratingPdf ? (
                                                <QuestionText style={{fontWeight:700}}>
                                                    {subQuestion.text}
                                                </QuestionText>
                                                ):(
                                                    <QuestionText>
                                                    {subQuestion.text}
                                                    {subQuestion.help === "" ? (null) : (
                                                        <InfoButton onClick={() => handleOpenModal(subQuestion.help)}>i</InfoButton>
                                                    )}
                                                    {subQuestion.subinfo !== '' ? (
                                                        <InfoText>{subQuestion.subinfo}</InfoText>
                                                    ) : (null)}
                                                </QuestionText>

                                                )}
                                                {isGeneratingPdf ? ( // Verifica se está gerando PDF
                                                    <div style={{ width: '500px', marginBottom: '10px' }}>
                                                        <QuestionTextPDF>{subResponses[questionIndex][subIndex]}</QuestionTextPDF>
                                                    </div>
                                                ) : (
                                                    <SubTextAreaInput
                                                        value={subResponses[questionIndex]?.[subIndex] || ''}
                                                        placeholder='Responda Aqui...'
                                                        onChange={(e) => handleSubChange(questionIndex, subIndex, e.target.value)}
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
                                            </div>

                                        ))}</div></SubQuestionBar>

                            </QuestionBlock>
                        ))}
                        {sectionIndex < Object.keys(groupedQuestions).length - 1 && <HorizontalDivider />}
                    </SessaoDiv>
                ))}

                <ImportText>Aviso Final:<br />
                    • Os resultados da entrevista saem até dia 12/07/2025 (sexta-feira)<br />
                    • Lembrar de sempre olhar o spam<br />
                    • Perguntar se o candidato tem alguma dúvida<br />
                    • Qualquer problema que ele tiver mandar email para gp: equipe.gp@ejcm.com.br<br />
                    Boa sorte!
                </ImportText>
                {isGeneratingPdf ? (null):(
                <ButtonWrapper>
                    <SubmitButton onClick={handleButton}>Gerar PDF</SubmitButton>
                </ButtonWrapper>
                )}
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
