import styled from "@emotion/styled";
import { Modal } from "@mui/material";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  width: 600px;
  background-color: var(--color-white);
`;

const ExcelProductCreateModal = ({
  isModalOpen,
  onModalClose,
}: {
  isModalOpen: boolean;
  onModalClose: () => void;
}) => {
  return (
    <Modal open={isModalOpen} onClose={onModalClose}>
      <StyledModalContainer></StyledModalContainer>
    </Modal>
  );
};

export default ExcelProductCreateModal;
