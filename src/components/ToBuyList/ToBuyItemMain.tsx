import {
  Button,
  IconButton,
  ListItemText,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { IS_USING_SY } from "@/components/const";
import Icons from "@/components/Icons";
import {
  COLOR_CARD_TEXT,
  IMG_SIZE,
  OPTION_TEXT,
  SAMPLE_YARDAGE_TEXT,
} from "@/components/ToBuyList/const";
import {
  Counter,
  MenuItemDivider,
  SelectedOption,
  StyledImageWithFallback,
  StyledInput,
  StyledInputLabel,
  StyledMenuItem,
  StyledNameDiv,
  StyledRight,
  StyledTop,
} from "@/components/ToBuyList/styled";
import { Product } from "@/const";
import useSelectedInfoList from "@/hooks/useSelectedInfoList";
import useSelectedOptionCounter from "@/hooks/useSelectedOptionCounter";

const ToBuyItemMain = ({
  product,
  selected,
  handleDelete,
}: {
  product: Product;
  selected: string[];
  handleDelete: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: string
  ) => void;
}) => {
  const { t } = useTranslation();
  const { selectedInfoList, setSelectedInfoList } = useSelectedInfoList();
  const {
    handleCountChange,
    handleCountAddButtonClick,
    handleCountSubtractButtonClick,
  } = useSelectedOptionCounter();
  const { productId, image, colors } = product;
  const name = productId;

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

  return (
    <StyledTop>
      <StyledImageWithFallback
        src={image}
        width={IMG_SIZE}
        height={IMG_SIZE}
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
                  handleCountSubtractButtonClick(e, productId, COLOR_CARD_TEXT)
                }
              >
                -
              </Button>
              <StyledInput
                value={selectedInfoList[productId][COLOR_CARD_TEXT]}
                onChange={(e) =>
                  handleCountChange(e, productId, COLOR_CARD_TEXT)
                }
                size="small"
              />

              <Button
                onClick={(e) =>
                  handleCountAddButtonClick(e, productId, COLOR_CARD_TEXT)
                }
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
          </Select>
        )}
      </StyledRight>
    </StyledTop>
  );
};

export default ToBuyItemMain;
