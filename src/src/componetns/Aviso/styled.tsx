import styled from 'styled-components';
import backgroundImage from '../../assets/TopBG.svg';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    
    position: relative;
`;

export const Topbar = styled.div`
width: 100%;
background-color: red;
height: 30px;
position: absolute;
top: 0;
left: 0;
background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;



`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
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
  font-weight: 800;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #28a0e1;
  }

  @media (max-width: 968px) {
    width: 100%;
    height: 50px;
    font-size: 16px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding: 0 0 30px 0;

  @media (max-width: 968px) {
    justify-content: center;
    margin-top: 10px;
  }
`;

export const StyText = styled.p`
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #001238;

  @media (max-width: 968px) {
    font-size: 12px;
  }
`;
export const StyTextBold = styled.p`
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  color: #001238;
  margin-top: 40px;

  @media (max-width: 968px) {
    font-size: 16px;
  }
`;