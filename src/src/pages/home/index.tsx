// Questionnaire.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

interface SubQuestion {
  text: string;
}

interface Question {
  text: string;
  subQuestions?: SubQuestion[];
}
const questions: Question[] = [
    {
      text: "Se apresenta pra gente, me conta um pouco sobre você.",
      subQuestions: [
        { text: "Como é sua rotina no dia a dia? Fale um pouco sobre quais atividades você faz além das aulas na UFRJ e como elas se encaixam na sua rotina." },
        { text: "Identifique na fala do candidato e pergunte se for preciso se ele aparenta ter boa gestão das atividades e se tem disponibilidade de 20h semanais para dedicação na EJCM." }
      ]
    },
    {
      text: "O que você achou de participar do dia de dinâmicas?",
      subQuestions: [
        { text: "Qual foi sua maior dificuldade e qual foi sua maior facilidade?" },
        { text: "Como foi escrever a resolução de case?" },
        { text: "Você usou alguma ferramenta para te auxiliar?" }
      ]
    },
    { text: "Qual sua motivação para fazer parte da EJCM?" },
    {
      text: "Você já conhecia a EJCM ou o Movimento Empresa Júnior, o MEJ?",
      subQuestions: [
        { text: "Qual a ideia que você tem da EJCM e do Movimento Empresa Júnior?" },
        { text: "Explicar um pouco sobre o funcionamento da empresa, ser remoto, os horários flexíveis, quantidade de horas semanais, reuniões necessárias geral e de squad e as atividades." },
        { text: "RG toda sexta 15h - 17h (inegociável), tem que ter um horário disponível na agenda." },
        { text: "Os horários são flexíveis, cada membro faz sua carga horária da forma que preferir." },
        { text: "A dinâmica de reuniões de cada squad é combinada dentro do próprio squad." },
        { text: "Política de avisar se for dar ruim." }
      ]
    },
    {
      text: "Quais são seus objetivos de vida em longo e curto prazo?",
      subQuestions: [
        { text: "Como a EJCM te ajudaria com esses objetivos?" }
      ]
    },
    {
      text: "Dado os nossos valores:",
      subQuestions: [
        { text: "Em qual deles você mais se reconhece?" },
        { text: "Em qual você acha que poderia se desenvolver mais?" },
        { text: "Por que?" }
      ]
    },
    { text: "Descreva um momento em que você teve que tomar uma decisão rápida para resolver uma situação." },
    {
      text: "Como as pessoas te enxergam?",
      subQuestions: [
        { text: "Você concorda com essa percepção?" },
        { text: "Por que?" },
        { text: "Como isso te afeta?" }
      ]
    },
    {
      text: "Qual foi o melhor chefe/professor/figura de autoridade que você já teve?",
      subQuestions: [
        { text: "Como ele(a) era?" }
      ]
    },
    {
      text: "Conte-me uma situação em que você contribuiu com suas próprias ideias ou atitudes, sem receber instruções."
    },
    {
      text: "O que diversidade e inclusão significam para você e qual a importância disso?"
    },
    { text: "Qual sua opinião sobre trabalhar em um ambiente diversificado?" },
    {
      text: "Diante de um comentário racista ou homofóbico dentro da empresa, qual é a sua reação?"
    },
    {
      text: "Por que você acha que deveria ser aprovado?"
    }
  ];
  

const PAGE_HEIGHT = 290; // Altura da página em milímetros, ajuste conforme necessário

const Questionnaire: React.FC = () => {
  const [responses, setResponses] = useState<string[]>(Array(questions.length).fill(''));
  const [subResponses, setSubResponses] = useState<string[][]>(questions.map(() => [])); // Respostas para subperguntas

  const handleChange = (index: number, value: string) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const handleSubChange = (questionIndex: number, subIndex: number, value: string) => {
    const updatedSubResponses = [...subResponses];
    if (!updatedSubResponses[questionIndex]) {
      updatedSubResponses[questionIndex] = [];
    }
    updatedSubResponses[questionIndex][subIndex] = value;
    setSubResponses(updatedSubResponses);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    let verticalPosition = 10; // Posição inicial na página
    const margin = 10; // Margem para o texto
    const pageHeight = doc.internal.pageSize.getHeight(); // Altura total da página
    const pageWidth = doc.internal.pageSize.getWidth() - 2 * margin; // Largura da página com margens
  
    // Define o tamanho da fonte
    const fontSize = 10; // Tamanho da fonte em milímetros
    doc.setFontSize(fontSize); // Aplica o tamanho da fonte
  
    questions.forEach((question, index) => {
      // Adiciona nova página se necessário
      if (verticalPosition + 40 > pageHeight) { // 40 para permitir perguntas e espaço
        doc.addPage();
        verticalPosition = 10; // Reinicia a posição vertical
      }
  
      // Quebra a pergunta em várias linhas
      const questionLines = doc.splitTextToSize(`Pergunta ${index + 1}: ${question.text}`, pageWidth);
  
      // Define a fonte como negrito para a pergunta
      doc.setFont("helvetica", "bold"); // Altere a fonte para negrito
  
      questionLines.forEach((line: string, lineIndex: number) => {
        doc.text(line, margin, verticalPosition + (lineIndex * (fontSize * 0.75))); // Adiciona cada linha da pergunta
      });
  
      // Define a fonte como normal para a resposta
      doc.setFont("helvetica", "normal"); // Altere a fonte de volta para normal
      verticalPosition += questionLines.length * (fontSize * 0.75) + 2; // Ajuste aqui para diminuir a distância
  
      // Quebra a resposta em várias linhas
      const responseLines = doc.splitTextToSize(`Resposta: ${responses[index]}`, pageWidth);
      responseLines.forEach((line: string, lineIndex: number) => {
        doc.text(line, margin, verticalPosition + (lineIndex * (fontSize * 0.75))); // Adiciona cada linha da resposta
      });
      verticalPosition += responseLines.length * (fontSize * 0.75) + 2; // Ajuste aqui para diminuir a distância
  
      if (question.subQuestions) {
        question.subQuestions.forEach((subQuestion, subIndex) => {
          // Verifica se precisa adicionar uma nova página
          if (verticalPosition + 30 > pageHeight) { // 30 para garantir espaço para a subpergunta
            doc.addPage();
            verticalPosition = 10; // Reinicia a posição vertical
          }
  
          verticalPosition += 5; // Espaço adicional antes da subpergunta
          // Quebra a subpergunta em várias linhas
          doc.setFont("helvetica", "bold");
          const subQuestionLines = doc.splitTextToSize(`  Subpergunta ${subIndex + 1}: ${subQuestion.text}`, pageWidth);
          subQuestionLines.forEach((line: string, lineIndex: number) => {
            doc.text(line, margin + 10, verticalPosition + (lineIndex * (fontSize * 0.75))); // Adiciona cada linha da subpergunta
          });
          verticalPosition += subQuestionLines.length * (fontSize * 0.75) + 5; // Adiciona altura da subpergunta e espaço extra
          doc.setFont("helvetica", "normal");
  
          // Quebra a subresposta em várias linhas
          const subResponseLines = doc.splitTextToSize(`  Resposta: ${subResponses[index]?.[subIndex] || ''}`, pageWidth);
          subResponseLines.forEach((line: string, lineIndex: number) => {
            doc.text(line, margin + 10, verticalPosition + (lineIndex * (fontSize * 0.75))); // Adiciona cada linha da subresposta
          });
          verticalPosition += subResponseLines.length * (fontSize * 0.75) + 5; // Adiciona altura da subresposta e espaço extra
        });
      }
  
      verticalPosition += 10; // Espaço adicional após todas as perguntas e subperguntas
    });
  
    doc.save('respostas.pdf');
  };
  
  
  return (
    <Container>
      <h1>Perguntas</h1>
      {questions.map((question, index) => (
        <QuestionContainer key={index}>
          <label>{question.text}</label>
          <TextArea
            value={responses[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          {/* Renderizar subperguntas sempre, independentemente da resposta */}
          {question.subQuestions && (
            question.subQuestions.map((subQuestion, subIndex) => (
              <QuestionContainer key={subIndex} style={{ marginLeft: '20px' }}>
                <label>{subQuestion.text}</label>
                <TextArea
                  value={subResponses[index][subIndex] || ''}
                  onChange={(e) => handleSubChange(index, subIndex, e.target.value)}
                />
              </QuestionContainer>
            ))
          )}
        </QuestionContainer>
      ))}
      <Button onClick={handleGeneratePDF}>Gerar PDF</Button>
    </Container>
  );
};

export default Questionnaire;
