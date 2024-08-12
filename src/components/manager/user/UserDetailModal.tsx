import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRef } from "react";

import { StyledModal } from "@/components/manager/DashboardItems";
import {
  companyAddressColumns,
  personalInfoColumns1,
  personalInfoColumns2,
  productListColumns,
  shippingAddressColumns,
  userMetadataColumns1,
  userMetadataColumns2,
} from "@/components/manager/user/const";
import { handleUserForOrder } from "@/components/manager/user/util";
import { User } from "@/const";

const StyledModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 740px;
  height: 650px;
  background-color: var(--color-white);
  overflow: scroll;
  padding: 30px;

  > div {
    width: 100%;
  }

  h4 {
    margin: 10px 0;
    color: var(--color-h4-secondary);
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCopyButton = styled(Button)`
  height: 30px;
`;

const UserDetailModal = ({
  isModalOpen,
  onModalClose,
  modalUserData,
}: {
  isModalOpen: boolean;
  onModalClose: () => void;
  modalUserData: User;
}) => {
  const {
    userId,
    productLengthUnit,
    hopeProducts,
    personalInfo: {
      name,
      companyName,
      businessType,
      contactInfo: { email, phoneNumber, weChatId },
      companyAddress,
      shippingAddress,
    },
    remark1,
    remark2,
    metadata: { submissionTime, folderId },
  } = modalUserData;

  const orderRows = handleUserForOrder(hopeProducts);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  const handleCopyClipBoard = async () => {
    const text = hopeProducts.map((product) => product.productId).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      if (copyButtonRef.current) {
        copyButtonRef.current.textContent = "복사됨";
      }
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

  return (
    <StyledModal open={isModalOpen} onClose={onModalClose}>
      <StyledModalContainer>
        <h2>User Info</h2>
        <h4>Personal Info</h4>
        <div>
          <DataGrid
            rows={[
              {
                id: userId,
                name,
                weChatId,
                company: companyName,
              },
            ]}
            columns={personalInfoColumns1}
            autoHeight
            hideFooter
            density="compact"
            sx={{
              borderLeft: "none",
              borderRight: "none",
            }}
          />
        </div>
        <div>
          <DataGrid
            getRowId={() => userId}
            rows={[
              {
                email,
                contactNumber: `${phoneNumber.countryCode} ${phoneNumber.number}`,
                businessType,
              },
            ]}
            columns={personalInfoColumns2}
            autoHeight
            hideFooter
            density="compact"
            sx={{
              borderLeft: "none",
              borderRight: "none",
            }}
          />
        </div>
        <h4>Company Address</h4>
        <div>
          <DataGrid
            getRowId={() => userId}
            rows={[
              {
                postalCode: companyAddress.postalCode,
                address: companyAddress.address,
                detailAddress: companyAddress.detailAddress,
              },
            ]}
            columns={companyAddressColumns}
            autoHeight
            hideFooter
            density="compact"
            sx={{
              borderLeft: "none",
              borderRight: "none",
            }}
          />
        </div>
        <h4>Shipping Address</h4>
        <div>
          <DataGrid
            getRowId={() => userId}
            rows={[
              {
                postalCode: shippingAddress.postalCode,
                address: shippingAddress.address,
                detailAddress: shippingAddress.detailAddress,
              },
            ]}
            columns={shippingAddressColumns}
            autoHeight
            hideFooter
            density="compact"
            sx={{
              borderLeft: "none",
              borderRight: "none",
            }}
          />
        </div>
        <h4>Metadata</h4>
        <div>
          <DataGrid
            getRowId={() => userId}
            rows={[
              {
                folderId,
                submissionTime,
              },
            ]}
            columns={userMetadataColumns1}
            autoHeight
            hideFooter
            density="compact"
            sx={{
              borderLeft: "none",
              borderRight: "none",
            }}
          />
        </div>
        <div>
          <DataGrid
            getRowId={() => userId}
            rows={[
              {
                remark1,
                remark2,
              },
            ]}
            columns={userMetadataColumns2}
            autoHeight
            hideFooter
            density="compact"
            sx={{
              borderLeft: "none",
              borderRight: "none",
            }}
          />
        </div>

        <FlexDiv>
          <h2>Order - {productLengthUnit.toLowerCase()}</h2>
          <StyledCopyButton onClick={handleCopyClipBoard} ref={copyButtonRef}>
            복사
          </StyledCopyButton>
        </FlexDiv>
        <div>
          <DataGrid
            getRowId={({ productId, type }) => `${productId}-${type}`}
            rows={orderRows}
            columns={productListColumns}
            autoHeight
            hideFooter
            density="compact"
            sx={{
              borderLeft: "none",
              borderRight: "none",
            }}
          />
        </div>
      </StyledModalContainer>
    </StyledModal>
  );
};

export default UserDetailModal;
