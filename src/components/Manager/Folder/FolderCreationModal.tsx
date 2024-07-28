import { Button, Modal } from "@mui/material";
import { styled } from "styled-components";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background-color: var(--color-white);
`;

const FolderCreationModal = ({ isModalOpen, onClose, type }) => {
  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <StyledModalContainer>
        {type} 폴더 생성
        <Button onClick={onClose}>닫기</Button>
      </StyledModalContainer>
    </Modal>
  );
};

export default FolderCreationModal;
