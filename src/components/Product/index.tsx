import Icons from "@/components/Icons";
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
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Counter,
  MenuItemDivider,
  SelectedOption,
  StyledBottom,
  StyledInput,
  StyledMenuItem,
  StyledNameDiv,
  StyledRight,
  StyledTop,
  StyledWrapper,
} from "./styled";

interface Color {
  colorId: string;
  colorName: string;
}

interface ProductType {
  productId: string;
  name: string | undefined;
  colors: Color[];
}

const COLOR_CARD_TEXT = "Color Card";
const OPTION_TEXT = "Option";
const SELECTED_OPTIONS_TEXT = "Selected Options";
const IMG_SIZE = 71;
const ALERT_MESSAGE = "숫자만 입력해 주세요.";

const Product = ({
  product,
  selectedInfos,
  setSelectedInfos,
  handleDelete,
}: {
  product: ProductType;
  selectedInfos: Object;
  setSelectedInfos: Dispatch<SetStateAction<Object>>;
  handleDelete: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => void;
}) => {
  if (product.name === undefined) {
    product.name = product.productId;
  }
  const { productId, colors, name } = product;
  const [open, setOpen] = useState<boolean>(true);
  const selected = Object.keys(selectedInfos[productId] || []).sort();
  const count = selectedInfos[productId];

  const handleChange = (event: SelectChangeEvent<typeof selectedInfos>) => {
    const {
      target: { value },
    } = event;

    let sortedValue = (value as string[]).sort();
    let sortedSelected = selected.sort();

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
          setSelectedInfos({
            ...selectedInfos,
            [productId]: { ...selectedInfos[productId], [sortedValue[i]]: 1 },
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
          const temp = { ...selectedInfos[productId] };
          delete temp[sortedSelected[i]];
          setSelectedInfos({ ...selectedInfos, [productId]: temp });
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
      setSelectedInfos({
        ...selectedInfos,
        [productId]: {
          [name]: e.target.value.length < 1 ? 0 : +e.target.value + "",
        },
      });
    } else {
      alert(ALERT_MESSAGE);
    }
  };

  const handleClickAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    setSelectedInfos({
      ...selectedInfos,
      [productId]: { ...selectedInfos[productId], [name]: +count[name] + 1 },
    });
  };

  const handleClickSubtract = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    if (count[name] <= 1) {
      const temp = { ...selectedInfos[productId] };
      delete temp[name];
      setSelectedInfos({ ...selectedInfos, [productId]: temp });
    } else {
      setSelectedInfos({
        ...selectedInfos,
        [productId]: { ...selectedInfos[productId], [name]: count[name] - 1 },
      });
    }
  };

  const handleDeleteOption = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    name: string
  ) => {
    const temp = { ...selectedInfos[productId] };
    delete temp[name];
    setSelectedInfos({ ...selectedInfos, [productId]: temp });
  };

  return (
    <StyledWrapper>
      <StyledTop>
        <Image width={IMG_SIZE} height={IMG_SIZE} src="" alt={name} />
        <StyledRight>
          <StyledNameDiv>
            <p>{name}</p>
            <IconButton onClick={(e) => handleDelete(e, productId)}>
              {Icons["delete"]}
            </IconButton>
          </StyledNameDiv>
          <Select
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
        </StyledRight>
      </StyledTop>
      {selected?.length > 0 && (
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
      )}
    </StyledWrapper>
  );
};

export default Product;