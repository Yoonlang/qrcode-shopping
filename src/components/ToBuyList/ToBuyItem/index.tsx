import { Button, IconButton, SelectChangeEvent } from "@mui/material";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Icons from "@/components/Icons";
import {
  Counter,
  SelectedOption,
  StyledInput,
  StyledNameDiv,
  StyledRight,
  StyledTop,
  StyledWrapper,
} from "@/components/ToBuyList/ToBuyItem/styled";

interface Color {
  colorId: string;
  colorName: string;
}

interface ProductType {
  productId: string;
  name: string | undefined;
  colors: Color[];
  image: string | null;
}

const COLOR_CARD_TEXT = "Color Card";
const OPTION_TEXT = "Option";
const SELECTED_OPTIONS_TEXT = "Selected Options";
const IMG_SIZE = 71;
const ALERT_MESSAGE = "Please enter only numbers";
const SAMPLE_YARDAGE_TEXT = "Sample Yardage";

const Product = ({
  product,
  selectedInfoList,
  setSelectedInfoList,
  handleDelete,
}: {
  product: ProductType;
  selectedInfoList: Object;
  setSelectedInfoList: Dispatch<SetStateAction<Object>>;
  handleDelete: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => void;
}) => {
  const { t } = useTranslation();
  if (product.name === undefined) {
    product.name = product.productId;
  }
  const { productId, colors, name } = product;
  const [open, setOpen] = useState<boolean>(true);
  const selected: string[] = Object.keys(
    selectedInfoList[productId] || []
  ).sort((a, b) => {
    if (a === COLOR_CARD_TEXT) return -1;
    if (b === COLOR_CARD_TEXT) return 1;
    return +a.split(" ")[0] - +b.split(" ")[0];
  });
  const count = selectedInfoList[productId];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSelectedInfoList((old) => {
      const tempInfos = { ...old };
      if (tempInfos.hasOwnProperty(productId)) {
        return old;
      } else {
        tempInfos[productId] = {
          "Color Card": 1,
        };
        return tempInfos;
      }
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedInfos", JSON.stringify(selectedInfoList));
  }, [selectedInfoList]);

  const handleChange = (event: SelectChangeEvent<typeof selectedInfoList>) => {
    const {
      target: { value },
    } = event;

    const sortedValue = (value as string[]).sort();
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

  const handleChangeCount = (
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
          [name]: `${Number(e.target.value)}`,
        },
      });
    } else {
      alert(t(ALERT_MESSAGE));
    }
  };

  const handleClickAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    setSelectedInfoList({
      ...selectedInfoList,
      [productId]: { ...selectedInfoList[productId], [name]: +count[name] + 1 },
    });
  };

  const handleClickSubtract = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    if (count[name] > 1) {
      setSelectedInfoList({
        ...selectedInfoList,
        [productId]: {
          ...selectedInfoList[productId],
          [name]: count[name] - 1,
        },
      });
    } else {
      // const temp = { ...selectedInfos[productId] };
      // delete temp[name];
      // setSelectedInfos({ ...selectedInfos, [productId]: temp });
    }
  };

  const handleDeleteOption = (
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
          <SelectedOption>
            <div>{t(COLOR_CARD_TEXT)}</div>
            <Counter>
              <Button onClick={(e) => handleClickSubtract(e, COLOR_CARD_TEXT)}>
                -
              </Button>
              {!isLoading && (
                <StyledInput
                  value={count[COLOR_CARD_TEXT]}
                  onChange={(e) => handleChangeCount(e, COLOR_CARD_TEXT)}
                  size="small"
                />
              )}
              <Button onClick={(e) => handleClickAdd(e, COLOR_CARD_TEXT)}>
                +
              </Button>
            </Counter>
          </SelectedOption>
          {/* <Select
            displayEmpty
            multiple
            fullWidth
            value={selected}
            onChange={handleChange}
            renderValue={() => <>{OPTION_TEXT}</>}
            size="small"
          >
            <StyledMenuItem value={COLOR_CARD_TEXT}>
              <ListItemText>{COLOR_CARD_TEXT}</ListItemText>
              {selected?.findIndex((item) => item === COLOR_CARD_TEXT) > -1 && (
                <IconButton>{Icons["select"]}</IconButton>
              )}
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
          </Select> */}
        </StyledRight>
      </StyledTop>
      {/* {selected?.length > 0 && (
        <>
          <Collapse in={open}>
            <Divider />
            <StyledBottom>
              <p>{SELECTED_OPTIONS_TEXT}</p>
              {selected?.map((select, index) => (
                <div key={select}>
                  <SelectedOption>
                    <div>{select}</div>
                    <Counter>
                      <Button onClick={(e) => handleClickSubtract(e, select)}>
                        -
                      </Button>
                      <StyledInput
                        value={count[select]}
                        onChange={(e) => handleChangeCount(e, select)}
                        size="small"
                      />
                      <Button onClick={(e) => handleClickAdd(e, select)}>
                        +
                      </Button>
                      <IconButton
                        onClick={(e) => handleDeleteOption(e, select)}
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
          {open ? (
            <IconButton onClick={() => setOpen(false)}>
              {Icons["close"]}
            </IconButton>
          ) : (
            <IconButton onClick={() => setOpen(true)}>
              {Icons["open"]}
            </IconButton>
          )}
        </>
      )} */}
    </StyledWrapper>
  );
};

export default Product;
