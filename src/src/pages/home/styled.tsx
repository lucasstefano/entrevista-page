import styled from "styled-components";
import backgroundImage from '../../assets/BG.svg';
import '@fontsource/poppins';

export const AppScreen = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  height: 100vh;
  position: relative;
`;

export const LeftSidebar = styled.div`
  width: 60px;
  height: 100vh;
  background-color: #22A2F2;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  position: fixed;
  left: 0;
  top: 0;
`;

export const RightSidebar = styled.div`
  width: 60px;
  height: 100vh;
  background: linear-gradient(to top, #22A2F2, #001238);
  position: fixed;
  right: 0;
  top: 0;
`;

export const ContentContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  width: 900px;
`;

export const SectionHeader = styled.h2`
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
  color: #22A2F2;
  font-weight: 700;
`;

export const HorizontalDivider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #22A2F2;
`;

export const QuestionBlock = styled.div`
  margin-bottom: 20px;
`;

export const QuestionTextWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const CandidateNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 20px 0;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 20px;
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f4f4f4;
  border-radius: 5px;
  outline: none;
  border: none;
`;

export const TextAreaInput = styled.textarea`
  width: 100%;
  height: 180px;
  margin-top: 5px;
  border: none;
  background-color: #f4f4f4;
  resize: none;
  outline: none;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 20px 20px;
`;

export const BoldHeaderText = styled.text`
  font-size: 28px;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  color: #001238;
`;

export const RegularHeaderText = styled.text`
  font-size: 28px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #001238;
`;

export const HeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
`;

export const IndicatorDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: #22A2F2;
`;

export const QuestionText = styled.p`
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #001238;
`;

export const CandidateNameText = styled.p`
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #001238;
  width: 300px;
`;

export const SubmitButton = styled.button`
  width: 148px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #34A9F2;
  color: #f4f4f4;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  margin-top: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding: 0 0 30px 0;
`;

export const InfoButton = styled.button`
  width: 18px;
  height: 18px;
  background-color: #d1d1d1;
  color: #ffffff;
  border-radius: 100%;
  margin-left: 10px;
  border: none;
  cursor: pointer;
`;
