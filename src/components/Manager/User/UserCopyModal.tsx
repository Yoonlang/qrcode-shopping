import {
  Button,
  Checkbox,
  DialogActions,
  FormControlLabel,
  Modal,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

import {
  handleUserInfoForOrder,
  initialSelectedOptionsObj,
  optionsToCopyList,
  SelectedOptions,
} from "@/components/Manager/User/util";
import { OrdererInfo } from "@/const";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 10px;
  width: 400px;
  background-color: var(--color-white);
`;

const getTitleData = (option: string): string[] => {
  const optionData = optionsToCopyList.find((v) => v.value === option);
  if (!optionData) return [option];

  if (option === "companyAddress") {
    return [
      "COMPANY - POSTAL CODE",
      "COMPANY - ADDRESS",
      "COMPANY - DETAIL ADDRESS",
    ];
  } else if (option === "shippingAddress") {
    return [
      "SHIPPING - POSTAL CODE",
      "SHIPPING - ADDRESS",
      "SHIPPING - DETAIL ADDRESS",
    ];
  }
  return [optionData.label];
};

const UserCopyModal = ({
  isModalOpen,
  onModalClose,
  selectedUserList,
}: {
  isModalOpen: boolean;
  onModalClose: () => void;
  selectedUserList: OrdererInfo[];
}) => {
  const [isSelectedAllOptions, setIsSelectedAllOptions] =
    useState<boolean>(true);
  const [selectedOptionsObj, setSelectedOptionsObj] = useState<
    Partial<SelectedOptions>
  >(initialSelectedOptionsObj);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const allSelected = Object.values(selectedOptionsObj).every(
      (value) => value
    );
    setIsSelectedAllOptions(allSelected);
  }, [selectedOptionsObj]);

  const handleSelectAllChange = () => {
    const newSelectedOptionsObj = Object.keys(initialSelectedOptionsObj).reduce(
      (acc, key) => {
        acc[key] = !isSelectedAllOptions;
        return acc;
      },
      {}
    );

    setSelectedOptionsObj(newSelectedOptionsObj);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedOptionsObj({
      ...selectedOptionsObj,
      [value]: !selectedOptionsObj[value],
    });
  };

  const handleUserInfoCopy = async () => {
    const clipboardData: string[] = [];
    const selectedOptionList = Object.keys(selectedOptionsObj).filter(
      (key) => selectedOptionsObj[key]
    );

    const titleData = selectedOptionList.flatMap(getTitleData);
    clipboardData.push(titleData.join("\t"));

    const getRowData = (user: any): string[] => {
      return selectedOptionList
        .map((option) => {
          switch (option) {
            case "phoneNumber": {
              const { countryCode, number } =
                user.personalInfo.contactInfo.phoneNumber;
              return `=${JSON.stringify(countryCode + number)}`;
            }
            case "companyAddress":
            case "shippingAddress": {
              const address = user.personalInfo[option];
              return [
                address.postalCode || " ",
                address.address || " ",
                address.detailAddress || " ",
              ];
            }
            case "hopeProducts":
              return handleUserInfoForOrder(user.hopeProducts)
                .map(
                  (product) =>
                    `${product.productId} : ${product.type}(${product.quantity})`
                )
                .join(" / ");
            default:
              return (
                user[option] ||
                user.personalInfo[option] ||
                user.metadata[option] ||
                " "
              );
          }
        })
        .flat();
    };

    selectedUserList.forEach((user) => {
      const rowData = getRowData(user);
      clipboardData.push(rowData.join("\t"));
    });

    try {
      await navigator.clipboard.writeText(clipboardData.join("\n"));
      if (copyButtonRef.current) copyButtonRef.current.textContent = "복사됨";
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

  return (
    <Modal open={isModalOpen} onClose={onModalClose}>
      <StyledModalContainer>
        <h3>복사할 정보를 선택하세요.</h3>
        <FormControlLabel
          key="전체"
          label="전체"
          control={
            <Checkbox
              value="전체"
              checked={
                Object.keys(selectedOptionsObj).filter(
                  (key) => selectedOptionsObj[key]
                ).length === optionsToCopyList.length
                  ? true
                  : false
              }
              onChange={handleSelectAllChange}
            />
          }
        />
        <div>
          {optionsToCopyList.map((option) => (
            <FormControlLabel
              key={option.value}
              label={option.label}
              control={
                <Checkbox
                  value={option.value}
                  checked={selectedOptionsObj[option.value]}
                  onChange={handleOptionChange}
                />
              }
            />
          ))}
        </div>
        <DialogActions>
          <Button onClick={handleUserInfoCopy} ref={copyButtonRef}>
            복사
          </Button>
          <Button onClick={onModalClose}>닫기</Button>
        </DialogActions>
      </StyledModalContainer>
    </Modal>
  );
};

export default UserCopyModal;
