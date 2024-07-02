import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRef, useState } from "react";
import { styled } from "styled-components";

import { StyledModal } from "@/components/Manager/DashboardItems";

const tableColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 120 },
  { field: "name", headerName: "Name", width: 107 },
  {
    field: "company",
    headerName: "Company",
    width: 107,
  },
  {
    field: "email",
    headerName: "E-mail",
    width: 200,
  },
  {
    field: "contactNumber",
    headerName: "Contact Number",
    width: 150,
  },
  {
    field: "submissionTime",
    headerName: "Submission Time",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
];

const personalInfoColumns1: GridColDef[] = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "company", headerName: "Company", width: 150 },
];

const personalInfoColumns2: GridColDef[] = [
  { field: "email", headerName: "E-mail", width: 300 },
  { field: "contactNumber", headerName: "Contact Number", width: 150 },
  { field: "businessType", headerName: "Business Type", width: 150 },
];

const companyAddressColumns: GridColDef[] = [
  { field: "postalCode", headerName: "Postal Code", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "detailAddress", headerName: "Detail Address", width: 250 },
];

const shippingAddressColumns: GridColDef[] = [
  { field: "postalCode", headerName: "Postal Code", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "detailAddress", headerName: "Detail Address", width: 250 },
];

const productListColumns: GridColDef[] = [
  { field: "productId", headerName: "Product ID", width: 150 },
  { field: "type", headerName: "구분", width: 250 },
  { field: "quantity", headerName: "개수", width: 200 },
];

const handleUserInfoListForTable = (userInfoList) => {
  return (
    userInfoList?.map((userInfo) => {
      const {
        submissionTime,
        personalInfo: {
          name,
          companyName,
          contactInfo: { email, phoneNumber },
          businessType,
        },
        documentId,
      } = userInfo;

      return {
        id: documentId,
        name,
        company: companyName,
        email: email,
        contactNumber: `${phoneNumber.countryCode}${phoneNumber.number}`,
        submissionTime,
        type: businessType,
        __user_info__: userInfo,
      };
    }) ?? []
  );
};

const StyledModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 740px;
  height: 650px;
  background-color: #fff;
  overflow: scroll;
  padding: 30px;

  > div {
    width: 100%;
  }

  h4 {
    margin: 10px 0;
    color: #3da3f5;
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

const handleUserInfoForOrder = (hopeProducts) => {
  return hopeProducts
    .map((product) => {
      const { colorCardQuantity, productId, sampleYardages } = product;
      const res: any[] = [];
      if (colorCardQuantity > 0) {
        res.push({
          productId,
          type: "Color Card",
          quantity: colorCardQuantity,
        });
      }

      sampleYardages.forEach((sy) => {
        const { colorId, colorName, yardageQuantity } = sy;
        res.push({
          productId,
          type: `S/Y ${colorId} ${colorName}`,
          quantity: yardageQuantity,
        });
      });

      return res;
    })
    .flat();
};

const UserInfoDetailModal = ({
  isModalOpen,
  closeModal,
  modalUserInfoData,
}) => {
  const {
    documentId,
    submissionTime,
    productLengthUnit,
    hopeProducts,
    personalInfo: {
      name,
      companyName,
      businessType,
      contactInfo: { email, phoneNumber },
      companyAddress,
      shippingAddress,
    },
  } = modalUserInfoData;

  const orderRows = handleUserInfoForOrder(hopeProducts);
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
    <StyledModal open={isModalOpen} onClose={closeModal}>
      <StyledModalContainer>
        <h2>User Info - {submissionTime ?? ""}</h2>
        <h4>Personal Info</h4>
        <div>
          <DataGrid
            rows={[
              {
                id: documentId,
                name,
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
            getRowId={() => documentId}
            rows={[
              {
                email,
                contactNumber: `${phoneNumber.countryCode}${phoneNumber.number}`,
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
            getRowId={() => documentId}
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
            getRowId={() => documentId}
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

const UserInfoTable = ({ userInfoList, setSelectedUserList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserInfoData, setModalUserInfoData] = useState(null);
  const tableRows = handleUserInfoListForTable(userInfoList);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={tableRows}
          columns={tableColumns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection
          onRowSelectionModelChange={(selectedList) => {
            setSelectedUserList(selectedList);
          }}
          onCellClick={(cell, e) => {
            if (cell.field !== "__check__") {
              e.stopPropagation();
              setIsModalOpen(true);
              setModalUserInfoData(cell.row.__user_info__);
            }
          }}
        />
      </div>
      {isModalOpen && (
        <UserInfoDetailModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          modalUserInfoData={modalUserInfoData}
        />
      )}
    </>
  );
};

export default UserInfoTable;
