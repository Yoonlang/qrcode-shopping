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
  initialSelectedOptionsObj,
  optionsToCopyList,
  SelectedOptions,
} from "@/components/manager/user/util";
import { OverlayControl, User } from "@/const";

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
  } else if (option === "hopeProducts") {
    return ["PRODUCT ID", "NUMBER OF COLOR CARD"];
  }
  return [optionData.label];
};

const UserCopyModal = ({
  overlayControl,
  selectedUserList,
}: {
  overlayControl: OverlayControl;
  selectedUserList: User[];
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

  const handleUserCopy = async () => {
    const clipboardData: string[] = [];
    const selectedOptionList = Object.keys(selectedOptionsObj).filter(
      (key) => selectedOptionsObj[key]
    );

    const titleData = selectedOptionList.flatMap(getTitleData);
    clipboardData.push(titleData.join("\t"));

    const getRowData = (user: User): string[] => {
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
              return `${user.hopeProducts[0].productId}\t${user.hopeProducts[0].colorCardQuantity}`;
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

    const productRowIdx = titleData.indexOf("PRODUCT ID");

    selectedUserList.forEach((user) => {
      const rowData = getRowData(user);
      clipboardData.push(rowData.join("\t"));

      let idx = 1;
      if (productRowIdx !== -1) {
        while (idx < user.hopeProducts.length) {
          clipboardData.push(
            `${"\t".repeat(productRowIdx - 1)}\t${
              user.hopeProducts[idx].productId
            }\t${user.hopeProducts[idx].colorCardQuantity}`
          );
          idx++;
        }
      }
    });

    try {
      await navigator.clipboard.writeText(clipboardData.join("\n"));
      if (copyButtonRef.current) copyButtonRef.current.textContent = "복사됨";
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

  return (
    <Modal open={overlayControl.isOpen} onClose={overlayControl.exit}>
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
          <Button onClick={handleUserCopy} ref={copyButtonRef}>
            복사
          </Button>
          <Button onClick={overlayControl.exit}>닫기</Button>
        </DialogActions>
      </StyledModalContainer>
    </Modal>
  );
};

export default UserCopyModal;
