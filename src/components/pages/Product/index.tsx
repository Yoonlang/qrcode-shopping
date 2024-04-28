import Icons from "@/components/Icons";
import {
  Button,
  Collapse,
  Divider,
  IconButton,
  ListItemText,
  Select,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
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

type ProductType = {
  id: number;
  name: string;
  options: string[];
};

const COLOR_CARD_TEXT = "Color Card";
const OPTION_TEXT = "Option";
const SELECTED_OPTIONS_TEXT = "Selected Options";
const IMG_SIZE = 71;

const Product = ({
  product,
  handleDelete,
}: {
  product: ProductType;
  handleDelete: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => void;
}) => {
  const { id, name, options } = product;
  const [selected, setSelected] = useState<string[]>([]);
  const [count, setCount] = useState<object>({});
  const [open, setOpen] = useState<boolean>(true);

  const handleChange = () => {};

  const handleChangeCount = () => {};

  const handleClickAdd = () => {};

  const handleClickSubtract = () => {};

  const handleDeleteOption = () => {};

  return (
    <StyledWrapper>
      <StyledTop>
        <Image width={IMG_SIZE} height={IMG_SIZE} src="" alt={name} />
        <StyledRight>
          <StyledNameDiv>
            <p>{name}</p>
            <IconButton onClick={(e) => handleDelete(e, id)}>
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
              {selected.findIndex((item) => item === COLOR_CARD_TEXT) > -1 && (
                <IconButton>{Icons["select"]}</IconButton>
              )}
            </StyledMenuItem>
            <MenuItemDivider />
            {options.map((option, index) => (
              <StyledMenuItem key={option} value={option}>
                <ListItemText primary={option} />
                {selected.findIndex((item) => item === option) > -1 && (
                  <IconButton>{Icons["select"]}</IconButton>
                )}
              </StyledMenuItem>
            ))}
          </Select>
        </StyledRight>
      </StyledTop>
      {selected.length > 0 && (
        <>
          <Collapse in={open}>
            <Divider />
            <StyledBottom>
              <p>{SELECTED_OPTIONS_TEXT}</p>
              {selected.map((select, index) => (
                <div key={select}>
                  <SelectedOption>
                    <div>{select}</div>
                    <Counter>
                      <Button onClick={handleClickSubtract}>-</Button>
                      <StyledInput
                        value={count[select]}
                        onChange={handleChangeCount}
                        size="small"
                      />
                      <Button onClick={handleClickAdd}>+</Button>
                      <IconButton onClick={handleDeleteOption}>
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
