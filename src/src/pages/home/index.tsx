import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
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
} from './styled';
import WarnignModal from '../../componetns/Aviso';
import Modal from '../../componetns/Modal';

interface SubQuestion {
    text: string;
}

interface Question {
    text: string;
    section: number;
    info: string;
    subQuestions?: SubQuestion[];
}

// Dados das perguntas
const questions: Question[] = [
    { text: "Se apresenta pra gente, me conta um pouco sobre você.", section: 1, info: 'Identifique na fala do candidato e pergunte se for preciso se ele aparenta ter boa gestão das atividades e se tem disponibilidade de 20h semanais para dedicação na EJCM' },
    {
        text: "O que você achou de participar do dia de dinâmicas?",
        section: 1,
        info: '',
        subQuestions: [
            { text: "Qual foi sua maior dificuldade e facilidade?" },
            { text: "Como foi escrever a resolução de case?" }
        ]
    },
    { text: "Descreva um momento em que você teve que tomar uma decisão rápida para resolver uma situação.", section: 2, info: 'Análise e solução de problemas, visão sistêmica', },
    { text: "Quais são seus objetivos de vida?", section: 3, info: '', },
    { text: "Como as pessoas te enxergam?", section: 3, info: '', },
];

// Função para agrupar perguntas por seção
const groupQuestionsBySection = (questions: Question[]) => {
    return questions.reduce((acc, question) => {
        const section = question.section || 1;
        if (!acc[section]) acc[section] = [];
        acc[section].push(question);
        return acc;
    }, {} as { [key: number]: Question[] });
};

// Componente principal
export default function Questionnaire() {
    const [userName, setUserName] = useState<string>('');
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


    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        let verticalPosition = 10;
        const margin = 10;
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth() - 2 * margin;

        doc.setFontSize(10);

        // Nome do usuário no PDF
        doc.setFont("helvetica", "bold");
        doc.text(`Nome: ${userName}`, margin, verticalPosition);
        verticalPosition += 10;

        questions.forEach((question, index) => {
            if (verticalPosition + 40 > pageHeight) {
                doc.addPage();
                verticalPosition = 10;
            }

            const questionLines = doc.splitTextToSize(`Pergunta ${index + 1}: ${question.text}`, pageWidth);
            doc.setFont("helvetica", "bold");

            questionLines.forEach((line: string, lineIndex: number) => {
                doc.text(line, margin, verticalPosition + (lineIndex * 7.5));
            });

            doc.setFont("helvetica", "normal");
            verticalPosition += questionLines.length * 7.5 + 2;

            const responseLines = doc.splitTextToSize(`Resposta: ${responses[index]}`, pageWidth);
            responseLines.forEach((line: string, lineIndex: number) => {
                doc.text(line, margin, verticalPosition + (lineIndex * 7.5));
            });
            verticalPosition += responseLines.length * 7.5 + 2;

            if (question.subQuestions) {
                question.subQuestions.forEach((subQuestion, subIndex) => {
                    if (verticalPosition + 30 > pageHeight) {
                        doc.addPage();
                        verticalPosition = 10;
                    }

                    verticalPosition += 5;
                    doc.setFont("helvetica", "bold");
                    const subQuestionLines = doc.splitTextToSize(`  Subpergunta ${subIndex + 1}: ${subQuestion.text}`, pageWidth);
                    subQuestionLines.forEach((line: string, lineIndex: number) => {
                        doc.text(line, margin + 10, verticalPosition + (lineIndex * 7.5));
                    });
                    verticalPosition += subQuestionLines.length * 7.5 + 5;

                    doc.setFont("helvetica", "normal");
                    const subResponseLines = doc.splitTextToSize(`  Resposta: ${subResponses[index]?.[subIndex] || ''}`, pageWidth);
                    subResponseLines.forEach((line: string, lineIndex: number) => {
                        doc.text(line, margin + 10, verticalPosition + (lineIndex * 7.5));
                    });
                    verticalPosition += subResponseLines.length * 7.5 + 5;
                });
            }

            verticalPosition += 10;
        });

        doc.save('respostas.pdf');
    };

    const groupedQuestions = groupQuestionsBySection(questions);

    return (
        <AppScreen>
            <LeftSidebar />
            <RightSidebar />
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
                    <CandidateNameText>Nome do Candidato:</CandidateNameText>
                    <TextInput type="text" value={userName} onChange={handleNameChange} />
                </CandidateNameContainer>

                {Object.entries(groupedQuestions).map(([section, questions], sectionIndex) => (
                    <div key={section}>
                        <SectionHeader>Seção {section}</SectionHeader>
                        {questions.map((question, questionIndex) => (
                            <QuestionBlock key={questionIndex}>
                                <QuestionTextWrapper>
                                    <QuestionText>
                                        {question.text}
                                        {question.info !== '' ? (
                                            <InfoButton onClick={() => handleOpenModal(`${question.info}`)}>i</InfoButton>) : (null)}
                                    </QuestionText>
                                </QuestionTextWrapper>
                                <TextAreaInput
                                    value={responses[sectionIndex][questionIndex] || ''}
                                    onChange={(e) => handleChange(sectionIndex, questionIndex, e.target.value)}
                                />
                                {question.subQuestions && question.subQuestions.map((subQuestion, subIndex) => (
                                    <div key={subIndex}>
                                        <QuestionText>{subQuestion.text}</QuestionText>
                                        <TextAreaInput
                                            value={subResponses[sectionIndex]?.[subIndex] || ''}
                                            onChange={(e) => handleSubChange(sectionIndex, subIndex, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </QuestionBlock>
                        ))}
                    </div>
                ))}

                <ButtonWrapper>
                    <SubmitButton onClick={handleGeneratePDF}>Gerar PDF</SubmitButton>
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
