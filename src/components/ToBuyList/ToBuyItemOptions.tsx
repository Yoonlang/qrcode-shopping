import { Button, Collapse, Divider, IconButton } from "@mui/material";
import { useState } from "react";

import { IS_USING_SY } from "@/components/const";
import Icons from "@/components/Icons";
import { SELECTED_OPTIONS_TEXT } from "@/components/ToBuyList/const";
import {
  Counter,
  SelectedOption,
  StyledBottom,
  StyledInput,
} from "@/components/ToBuyList/styled";
import { Product } from "@/const";
import useSelectedInfoList from "@/hooks/useSelectedInfoList";
import useSelectedOptionCounter from "@/hooks/useSelectedOptionCounter";

const ToBuyItemOptions = ({
  product,
  selected,
}: {
  product: Product;
  selected: string[];
}) => {
  const { productId } = product;
  const [isOptionListExpanded, setIsOptionListExpanded] =
    useState<boolean>(true);
  const {
    handleCountChange,
    handleCountAddButtonClick,
    handleCountSubtractButtonClick,
  } = useSelectedOptionCounter();
  const { selectedInfoList, setSelectedInfoList } = useSelectedInfoList();

  const handleOptionDelete = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    name: string
  ) => {
    const temp = { ...selectedInfoList[productId] };
    delete temp[name];
    setSelectedInfoList({ ...selectedInfoList, [productId]: temp });
  };

  return (
    <>
      {IS_USING_SY && selected?.length > 0 && (
        <>
          <Collapse in={isOptionListExpanded}>
            <Divider />
            <StyledBottom>
              <p>{SELECTED_OPTIONS_TEXT}</p>
              {selected?.map((select) => (
                <div key={select}>
                  <SelectedOption>
                    <div>{select}</div>
                    <Counter>
                      <Button
                        onClick={(e) =>
                          handleCountSubtractButtonClick(e, productId, select)
                        }
                      >
                        -
                      </Button>
                      <StyledInput
                        value={selectedInfoList[productId][select]}
                        onChange={(e) =>
                          handleCountChange(e, productId, select)
                        }
                        size="small"
                      />
                      <Button
                        onClick={(e) =>
                          handleCountAddButtonClick(e, productId, select)
                        }
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
    </>
  );
};

export default ToBuyItemOptions;
