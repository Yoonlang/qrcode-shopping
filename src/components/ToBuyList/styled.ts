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
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.08);
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
    border-color: #eeeeee;
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
    color: rgba(0, 0, 0, 0.87);
    font-size: 12px;

    & fieldset {
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  & .Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  & > hr {
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
    font-color: rgba(0, 0, 0, 0.87);
    margin: 0;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  background-color: #f7f7f7;
  font-size: 12px;
  border-bottom: 0.46px solid rgba(60, 60, 67, 0.36);

  &:hover {
    background-color: #f7f7f7;
  }

  &.Mui-selected {
    background-color: #f7f7f7;

    &:hover {
      background-color: #f7f7f7;
    }
  }

  &:focus {
    background-color: #f7f7f7;
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
    color: rgba(0, 0, 0, 0.6);
  }
`;

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin: 15px 0px;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.6);

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
      border: 0.6px solid rgba(0, 0, 0, 0.1);
      border-left: 0px;
      border-right: 0px;
      border-radius: 0px;

      &:hover {
        border: 0.6px solid rgba(0, 0, 0, 0.1);
      }
    }

    &.Mui-focused fieldset {
      border: 0.6px solid rgba(0, 0, 0, 0.1);
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
    color: #000;
    border: solid 0.6px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #fff;
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
  background-color: #f7f7f7;
  font-size: 12px;
  padding: 10px 0 0 10px;
  color: rgba(0, 0, 0, 0.6);
`;

const StyledBox = styled(Box)`
  border-radius: 20px;
  position: relative;
  background: rgba(43, 47, 74, 0.12);
`;

const SelectedBox = styled(Box)`
  width: 60px;
  height: 23px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.87);
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
    color: #fbfbfb;

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