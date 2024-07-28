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

const FolderActionModal = ({ isModalOpen, onClose, type }) => {
  return (
    <Modal open={isModalOpen} onClose={onClose}>
      <StyledModalContainer>
        {type} 폴더 관리
        <Button>수정</Button>
        <Button>삭제</Button>
        <Button onClick={onClose}>닫기</Button>
      </StyledModalContainer>
    </Modal>
  );
};

export default FolderActionModal;
