import {
  Box,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { styled } from "styled-components";

const StyledWrapper = styled.div`
  border: 0.5px solid var(--color-gray-40);
  border-radius: 12px;
  background-color: var(--color-white);
  box-shadow: 0px 1px 2px 0px var(--color-gray-40);
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  > p {
    margin: 0 0 5px 0;
    font-size: 16px;
    font-weight: bold;
  }

  hr {
    border-color: var(--color-divider-primary);
  }
`;

const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  & > div {
    width: 100%;
  }

  & > img {
    margin-right: 20px;
    border-radius: 2px;
    min-height: 71px;
    min-width: 71px;
  }

  & .MuiInputBase-root {
    color: var(--color-primary);
    font-size: 12px;

    & fieldset {
      border: 1px solid var(--color-text-field-primary);
    }
  }

  & .Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid var(--color-text-field-primary);
  }
`;

const StyledRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledNameDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > p {
    font-size: 16px;
    font-weight: bold;
    font-color: var(--color-primary);
    margin: 0;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  background-color: var(--color-li-tertiary);
  font-size: 12px;
  border-bottom: 0.46px solid var(--color-li-secondary);

  &:hover {
    background-color: var(--color-li-tertiary);
  }

  &.Mui-selected {
    background-color: var(--color-li-tertiary);

    &:hover {
      background-color: var(--color-li-tertiary);
    }
  }

  &:focus {
    background-color: var(--color-li-tertiary);
  }

  & span {
    font-size: 12px;
  }
`;

const MenuItemDivider = styled(Divider)`
  &.MuiDivider-root {
    margin: 0px;
    border-width: 3px;
  }
`;

const StyledBottom = styled.div`
  padding: 10px 20px 0 20px;

  > p {
    font-size: 9px;
    color: var(--color-gray-80);
  }
`;

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin: 15px 0px;
  font-size: 10px;
  color: var(--color-gray-80);

  > img {
    width: 8px;
    height: 8px;
  }
`;

const StyledInput = styled(TextField)`
  width: 60px;

  & .MuiInputBase-root.MuiOutlinedInput-root {
    height: 100%;

    & input {
      text-align: center;
      font-size: 9px;
    }

    & fieldset {
      border: 0.6px solid var(--color-text-field-primary);
      border-left: 0px;
      border-right: 0px;
      border-radius: 0px;

      &:hover {
        border: 0.6px solid var(--color-text-field-primary);
      }
    }

    &.Mui-focused fieldset {
      border: 0.6px solid var(--color-text-field-primary);
      border-left: 0px;
      border-right: 0px;
      border-radius: 0px;
    }
  }
`;

const Counter = styled.div`
  display: flex;

  > button:first-child,
  button:nth-of-type(2) {
    min-width: 30px;
    font-size: 10px;
    color: var(--color-black);
    border: solid 0.6px var(--color-counter-primary);

    &:hover {
      background-color: var(--color-white);
    }
  }

  > button:first-child {
    border-right: 0px;
    border-radius: 4px 0px 0px 4px;
  }

  > button:nth-of-type(2) {
    border-left: 0px;
    border-radius: 0px 4px 4px 0px;
  }

  > button:last-child img {
    width: 8px;
  }
`;

const StyledInputLabel = styled(InputLabel)`
  background-color: var(--color-input-label-primary);
  font-size: 12px;
  padding: 10px 0 0 10px;
  color: var(--color-input-label-secondary);
`;

const StyledBox = styled(Box)`
  border-radius: 20px;
  position: relative;
  background: var(--color-gray-40);
`;

const SelectedBox = styled(Box)`
  width: 60px;
  height: 23px;
  border-radius: 20px;
  background: var(--color-primary);
  position: absolute;
  transition: all 0.5s ease;
  top: 3px;
  left: 3px;
`;

const StyledButton = styled(Button)`
  font-size: 10px;

  & .MuiButton-root {
    border-radius: 20px;
    width: 60px;
    height: 30px;
    font-weight: bold;
    transition: all 0.2s 0.1s ease;
    color: var(--color-button-primary);

    &:hover {
      opacity: 0.8;
    }
  }
`;

export {
  Counter,
  MenuItemDivider,
  SelectedBox,
  SelectedOption,
  StyledBottom,
  StyledBox,
  StyledButton,
  StyledInput,
  StyledInputLabel,
  StyledMenuItem,
  StyledNameDiv,
  StyledRight,
  StyledTop,
  StyledWrapper,
};
