import {
  Button,
  Collapse,
  Divider,
  IconButton,
  ListItemText,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { IS_USING_SY } from "@/components/const";
import Icons from "@/components/Icons";
import {
  ALERT_MESSAGE,
  COLOR_CARD_TEXT,
  IMG_SIZE,
  OPTION_TEXT,
  SAMPLE_YARDAGE_TEXT,
  SELECTED_OPTIONS_TEXT,
} from "@/components/ToBuyList/const";
import {
  Counter,
  MenuItemDivider,
  SelectedOption,
  StyledBottom,
  StyledInput,
  StyledInputLabel,
  StyledMenuItem,
  StyledNameDiv,
  StyledRight,
  StyledTop,
  StyledWrapper,
} from "@/components/ToBuyList/styled";
import { Product } from "@/const";
import useSelectedInfoList from "@/hooks/useSelectedInfoList";

const ToBuyItem = ({
  product,
  handleDelete,
}: {
  product: Product;
  handleDelete: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => void;
}) => {
  const { t } = useTranslation();
  const { selectedInfoList, setSelectedInfoList } = useSelectedInfoList();
  const { productId, colors } = product;
  const name = productId;
  const [isOptionListExpanded, setIsOptionListExpanded] =
    useState<boolean>(true);
  const selected = Object.keys(selectedInfoList[productId] || []).sort(
    (a, b) => {
      if (a === COLOR_CARD_TEXT) return -1;
      if (b === COLOR_CARD_TEXT) return 1;
      return +a.split(" ")[0] - +b.split(" ")[0];
    }
  );

  const handleOptionChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    const sortedValue = (value as unknown as string[]).sort();
    const sortedSelected = selected.sort();

    let colorCardIdx = sortedValue.indexOf(COLOR_CARD_TEXT);
    if (colorCardIdx > -1) {
      [sortedValue[colorCardIdx], sortedValue[0]] = [
        sortedValue[0],
        sortedValue[colorCardIdx],
      ];
    }
    colorCardIdx = sortedSelected.indexOf(COLOR_CARD_TEXT);
    if (colorCardIdx > -1) {
      [sortedSelected[colorCardIdx], sortedSelected[0]] = [
        sortedSelected[0],
        sortedSelected[colorCardIdx],
      ];
    }

    if (sortedValue.length > sortedSelected.length) {
      for (let i = 0; i < sortedValue.length; i++) {
        if (
          i === sortedValue.length - 1 ||
          sortedValue[i] !== sortedSelected[i]
        ) {
          setSelectedInfoList({
            ...selectedInfoList,
            [productId]: {
              ...selectedInfoList[productId],
              [sortedValue[i]]: 1,
            },
          });
          break;
        }
      }
    } else if (sortedValue.length < sortedSelected.length) {
      for (let i = 0; i < sortedSelected.length; i++) {
        if (
          i === sortedSelected.length - 1 ||
          sortedValue[i] !== sortedSelected[i]
        ) {
          const temp = { ...selectedInfoList[productId] };
          delete temp[sortedSelected[i]];
          setSelectedInfoList({ ...selectedInfoList, [productId]: temp });
          break;
        }
      }
    }
  };

  const handleCountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    const value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      setSelectedInfoList({
        ...selectedInfoList,
        [productId]: {
          ...selectedInfoList[productId],
          [name]: Number(value),
        },
      });
    } else {
      alert(t(ALERT_MESSAGE));
    }
  };

  const handleCountAddButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    setSelectedInfoList({
      ...selectedInfoList,
      [productId]: {
        ...selectedInfoList[productId],
        [name]: +selectedInfoList[productId][name] + 1,
      },
    });
  };

  const handleCountSubtractButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    if (selectedInfoList[productId][name] > 1) {
      setSelectedInfoList({
        ...selectedInfoList,
        [productId]: {
          ...selectedInfoList[productId],
          [name]: selectedInfoList[productId][name] - 1,
        },
      });
    } else {
      if (IS_USING_SY) {
        const temp = { ...selectedInfoList[productId] };
        delete temp[name];
        setSelectedInfoList({ ...selectedInfoList, [productId]: temp });
      }
    }
  };

  const handleOptionDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    name: string
  ) => {
    const temp = { ...selectedInfoList[productId] };
    delete temp[name];
    setSelectedInfoList({ ...selectedInfoList, [productId]: temp });
  };

  return (
    <StyledWrapper>
      <StyledTop>
        <Image
          width={IMG_SIZE}
          height={IMG_SIZE}
          src={`${product.image ?? ""}`}
          loading="lazy"
          unoptimized
          alt={name}
        />
        <StyledRight>
          <StyledNameDiv>
            <p>{name}</p>
            <IconButton onClick={(e) => handleDelete(e, productId)}>
              {Icons["delete"]}
            </IconButton>
          </StyledNameDiv>
          {!IS_USING_SY && (
            <SelectedOption>
              <div>{t(COLOR_CARD_TEXT)}</div>
              <Counter>
                <Button
                  onClick={(e) =>
                    handleCountSubtractButtonClick(e, COLOR_CARD_TEXT)
                  }
                >
                  -
                </Button>
                <StyledInput
                  value={selectedInfoList[productId][COLOR_CARD_TEXT]}
                  onChange={(e) => handleCountChange(e, COLOR_CARD_TEXT)}
                  size="small"
                />

                <Button
                  onClick={(e) => handleCountAddButtonClick(e, COLOR_CARD_TEXT)}
                >
                  +
                </Button>
              </Counter>
            </SelectedOption>
          )}
          {IS_USING_SY && (
            <Select
              displayEmpty
              multiple
              fullWidth
              value={selected}
              onChange={handleOptionChange}
              renderValue={() => <>{OPTION_TEXT}</>}
              size="small"
            >
              <StyledMenuItem value={COLOR_CARD_TEXT}>
                <ListItemText>{COLOR_CARD_TEXT}</ListItemText>
                {selected?.findIndex((item) => item === COLOR_CARD_TEXT) >
                  -1 && <IconButton>{Icons["select"]}</IconButton>}
              </StyledMenuItem>
              <MenuItemDivider />
              <StyledInputLabel>{SAMPLE_YARDAGE_TEXT}</StyledInputLabel>
              {colors.map((color) => {
                const { colorId, colorName } = color;
                return (
                  <StyledMenuItem
                    key={colorId}
                    value={`${colorId}. ${colorName}`}
                  >
                    <ListItemText primary={`${colorId}. ${colorName}`} />
                    {selected?.findIndex(
                      (item) => item === `${colorId}. ${colorName}`
                    ) > -1 && <IconButton>{Icons["select"]}</IconButton>}
                  </StyledMenuItem>
                );
              })}
            </Select>
          )}
        </StyledRight>
      </StyledTop>
      {IS_USING_SY && selected?.length > 0 && (
        <>
          <Collapse in={isOptionListExpanded}>
            <Divider />
            <StyledBottom>
              <p>{SELECTED_OPTIONS_TEXT}</p>
              {selected?.map((select, index) => (
                <div key={select}>
                  <SelectedOption>
                    <div>{select}</div>
                    <Counter>
                      <Button
                        onClick={(e) =>
                          handleCountSubtractButtonClick(e, select)
                        }
                      >
                        -
                      </Button>
                      <StyledInput
                        value={selectedInfoList[productId][select]}
                        onChange={(e) => handleCountChange(e, select)}
                        size="small"
                      />
                      <Button
                        onClick={(e) => handleCountAddButtonClick(e, select)}
                      >
                        +
                      </Button>
                      <IconButton
                        onClick={(e) => handleOptionDelete(e, select)}
                      >
                        {Icons["delete"]}
                      </IconButton>
                    </Counter>
                  </SelectedOption>
                  <Divider />
                </div>
              ))}
            </StyledBottom>
          </Collapse>
          {isOptionListExpanded ? (
            <IconButton onClick={() => setIsOptionListExpanded(false)}>
              {Icons["close"]}
            </IconButton>
          ) : (
            <IconButton onClick={() => setIsOptionListExpanded(true)}>
              {Icons["open"]}
            </IconButton>
          )}
        </>
      )}
    </StyledWrapper>
  );
};

export default ToBuyItem;
