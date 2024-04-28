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
const ALERT_MESSAGE = "숫자만 입력해 주세요.";

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

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;

    setSelected(value as string[]);

    let sortedValue = (value as string[]).sort();
    let sortedSelected = selected.sort();

    if (sortedValue.length > sortedSelected.length) {
      for (let i = 0; i < sortedValue.length; i++) {
        if (
          i === sortedValue.length - 1 ||
          sortedValue[i] !== sortedSelected[i]
        ) {
          setCount({ ...count, [sortedValue[i]]: 1 });
          break;
        }
      }
    } else if (sortedValue.length < sortedSelected.length) {
      for (let i = 0; i < sortedSelected.length; i++) {
        if (
          i === sortedSelected.length - 1 ||
          sortedValue[i] !== sortedSelected[i]
        ) {
          const newCount = { ...count };
          delete newCount[sortedSelected[i]];
          setCount(newCount);
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
      setCount({
        ...count,
        [name]: e.target.value.length < 1 ? 0 : +e.target.value + "",
      });
    } else {
      alert(ALERT_MESSAGE);
    }
  };

  const handleClickAdd = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    setCount({ ...count, [name]: +count[name] + 1 });
  };

  const handleClickSubtract = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    if (count[name] <= 1) {
      const newCount = { ...count };
      delete newCount[name];
      setSelected(selected.filter((item) => item !== name));
      setCount(newCount);
    } else {
      setCount({ ...count, [name]: count[name] - 1 });
    }
  };

  const handleDeleteOption = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number
  ) => {
    setSelected(selected.filter((_, idx) => idx !== index));
  };

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
                      <IconButton onClick={(e) => handleDeleteOption(e, index)}>
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
