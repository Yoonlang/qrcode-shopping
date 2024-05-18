import { AppBar, Drawer, List, Modal, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { MutableRefObject } from "react";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  &.MuiAppBar-root {
    display: flex;
    flex-direction: row;
    background-color: #323232;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: bold;
    height: 71px;
    position: fixed;
    z-index: 1300;

    & div {
      margin: 0 2px;
    }
  }
`;

const StyledDrawer = styled(Drawer)`
  &.MuiDrawer-root .MuiPaper-root {
    width: 200px;
  }
`;

const StyledList = styled(List)`
  &.MuiList-root {
    width: 100%;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  margin-top: 70px;
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductAddModal = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 530px;
  height: 650px;
  overflow: scroll;

  & h2 {
    margin: 0px;
    margin-bottom: 10px;
  }

  & .MuiFormControl-root {
    margin: 10px 0px;
  }
`;

const StyledFlexDiv = styled.div`
  display: flex;
`;

const ProductInput = ({
  label,
  name,
  formik,
  type = "text",
  inputRef = undefined,
}: {
  label: string;
  name: string;
  formik: FormikProps<any>;
  type?: string;
  inputRef?: MutableRefObject<HTMLInputElement | undefined>;
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && !!formik.errors[name]}
      autoComplete="off"
      type={type}
      margin="dense"
      fullWidth
      inputRef={(el) => {
        if (inputRef) {
          inputRef.current = el;
        }
      }}
    />
  );
};

export {
  StyledAppBar,
  StyledDrawer,
  StyledList,
  StyledDiv,
  StyledModal,
  ProductAddModal,
  StyledFlexDiv,
  ProductInput,
};