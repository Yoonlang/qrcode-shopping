import {
  Button,
  Checkbox,
  DialogActions,
  FormControlLabel,
  Modal,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

import { handleUserInfoForOrder } from "@/components/Manager/User/util";
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

interface OptionsToCopy {
  label: string;
  value: string;
}

const initialSelectedOptionObj = {
  userId: true,
  name: true,
  companyName: true,
  businessType: true,
  phoneNumber: true,
  weChatId: true,
  email: true,
  companyAddress: true,
  shippingAddress: true,
  hopeProducts: true,
  productLengthUnit: true,
  remark1: true,
  remark2: true,
};

const optionsToCopyList: OptionsToCopy[] = [
  { label: "USER ID", value: "userId" },
  { label: "NAME", value: "name" },
  { label: "COMPANY NAME", value: "companyName" },
  { label: "BUSINESS TYPE", value: "businessType" },
  { label: "PHONE NUMBER", value: "phoneNumber" },
  { label: "WECHAT ID", value: "weChatId" },
  { label: "EMAIL", value: "email" },
  { label: "COMPANY ADDRESS", value: "companyAddress" },
  { label: "SHIPPING ADDRESS", value: "shippingAddress" },
  { label: "SELECTED ARTICLE LIST", value: "hopeProducts" },
  { label: "LENGTH UNIT", value: "productLengthUnit" },
  { label: "REMARK 1", value: "remark1" },
  { label: "REMARK 2", value: "remark2" },
];

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
  const [selectedOptionObj, setSelectedOptionObj] = useState<object>(
    initialSelectedOptionObj
  );
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const allSelected = Object.values(selectedOptionObj).every(
      (value) => value
    );
    setIsSelectedAllOptions(allSelected);
  }, [selectedOptionObj]);

  const handleSelectAllChange = () => {
    const newSelectedOptionObj = Object.keys(initialSelectedOptionObj).reduce(
      (acc, key) => {
        acc[key] = !isSelectedAllOptions;
        return acc;
      },
      {}
    );

    setSelectedOptionObj(newSelectedOptionObj);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedOptionObj({
      ...selectedOptionObj,
      [value]: !selectedOptionObj[value],
    });
  };

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

  const handleUserInfoCopy = async () => {
    const clipboardData: string[] = [];
    const selectedOptionList = Object.keys(selectedOptionObj).filter(
      (key) => selectedOptionObj[key]
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
                Object.keys(selectedOptionObj).filter(
                  (key) => selectedOptionObj[key]
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
                  checked={selectedOptionObj[option.value]}
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
