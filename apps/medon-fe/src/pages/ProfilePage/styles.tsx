import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-top: 10px;
  background-color: #fafaff;
`;

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
`;

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  background-color: #e6e6e6;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  flex: 1;
  /* height: 100vh; //add or not, it depends. */
`;
