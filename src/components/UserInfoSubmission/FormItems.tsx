import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stepper,
  TextField,
} from "@mui/material";
import { FormikContextType, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { FormType } from "@/components/const";
import Icons from "@/components/Icons";


const StyledBox = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 10px;
`;

const AddressBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StyledStepper = styled(Stepper)`
  padding: 20px;
  padding-bottom: 85px;
  margin-top: 56px;

  & .MuiSvgIcon-root {
    width: 15.6px;
    margin-left: 5px;
  }

  & .MuiStepIcon-root.Mui-active {
    color: #000;
  }

  & .MuiStepLabel-label {
    font-size: 17px;
    font-weight: 700;
    color: #000;
  }

  & .MuiStepIcon-text {
    font-size: 7.8px;
  }

  & .Mui-completed {
    color: #000;
  }
`;

const BLUE = "#2196f3";

const StyledTextField = styled(TextField)`
  &.MuiFormControl-root {
    & label.Mui-error {
      color: #ff0000;
    }

    background-color: ${(props) => props.disabled && "#f7f7f7"};
  }

  & .MuiInputBase-root.MuiOutlinedInput-root {
    & .MuiSelect-select {
      display: flex;
      justify-content: space-between;
    }

    &.Mui-focused fieldset {
      border-color: ${(props) => (props.required ? BLUE : "#000")};
    }

    & fieldSet {
      border-radius: 6px;
      border-color: ${(props) =>
        props.required ? BLUE : "rgba(0, 0, 0, 0.1)"};
    }

    &.Mui-error {
      & fieldSet {
        border-color: #ff0000;
      }

      & label {
        color: #ff0000;
      }
    }
  }

  & label {
    &.Mui-focused {
      color: ${(props) => (props.required ? BLUE : "#000")};
    }
  }

  & .MuiInput-underline:after {
    border-bottom-color: ${(props) => (props.required ? BLUE : "#000")};
  }

  & .MuiFormHelperText-root.Mui-error {
    color: #ff0000;
  }
`;

const StyledMenuItem = styled(MenuItem)`
  background-color: #e7e7e7;
  font-size: 17px;
  border-bottom: 0.5px solid rgba(60, 60, 67, 0.36);
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: #e7e7e7;
  }

  &.Mui-selected {
    background-color: #e7e7e7;

    &:hover {
      background-color: #e7e7e7;
    }
  }

  &:focus {
    background-color: #e7e7e7;
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-right: 8px;

  & .MuiCheckbox-root {
    color: #000;
    padding-left: 0;
  }

  & .MuiFormControlLabel-label {
    font-size: 12.5px;
    color: rgba(0, 0, 0, 0.87);
  }
`;

const StyledErrorMessage = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  & p {
    margin: 0;
    font-size: 12px;
    color: #ff0000;
    margin-left: 5px;
  }
`;

const StyledIconButton = styled(IconButton)`
  padding: 0;
`;

const AddressCheckbox = ({ name }: { name: string }) => {
  const { t } = useTranslation();
  const { values, handleBlur, handleChange }: FormikContextType<FormType> =
    useFormikContext();

  return (
    <StyledFormControlLabel
      control={<Checkbox />}
      label={t("Same as company address")}
      labelPlacement="start"
      name={name}
      checked={values[name]}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

const UserInput = ({
  label,
  name,
  type = "text",
  disable = false,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  disable?: boolean;
  required?: boolean;
}) => {
  const { t } = useTranslation();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
  }: FormikContextType<FormType> = useFormikContext();

  return (
    <>
      <StyledTextField
        required={required}
        label={label}
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched[name] && !!errors[name]}
        autoComplete="off"
        type={type}
        margin="dense"
        fullWidth
        InputProps={
          {
            // endAdornment: (
            //   <InputAdornment position="end">
            //     {!errors[name] && touched[name] && (
            //       <>{Icons["select"]}</>
            //     )}
            //   </InputAdornment>
            // ),
          }
        }
        disabled={disable}
      />
      {errors[name] && touched[name] ? (
        <StyledErrorMessage>
          {Icons["error"]}
          <p>{t(errors[name]?.toString() ?? "")}</p>
        </StyledErrorMessage>
      ) : null}
    </>
  );
};

const UserSelect = ({
  label,
  name,
  items,

  required = false,
}: {
  label: string;
  name: string;
  items: string[];

  required?: boolean;
}) => {
  const { t } = useTranslation();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
  }: FormikContextType<FormType> = useFormikContext();
  const [v, setV] = useState("");
  useEffect(() => setV(values[name]), [values[name]]);

  return (
    <>
      <StyledTextField
        select
        required={required}
        label={label}
        name={name}
        value={v}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched[name] && !!errors[name]}
        autoComplete="off"
        margin="dense"
        fullWidth
        SelectProps={{
          renderValue: (value: string) => <>{t(value)}</>,
        }}
      >
        {items.map((item, index) => (
          <StyledMenuItem key={item} value={item}>
            {t(item)}
            {values[name] === item && (
              <StyledIconButton disabled>{Icons["select"]}</StyledIconButton>
            )}
          </StyledMenuItem>
        ))}
      </StyledTextField>
      {errors[name] && touched[name] ? (
        <StyledErrorMessage>
          {Icons["error"]}
          <p>{t(errors[name]?.toString() ?? "")}</p>
        </StyledErrorMessage>
      ) : null}
    </>
  );
};

export {
  AddressBox,
  AddressCheckbox,
  StyledBox,
  StyledErrorMessage,
  StyledIconButton,
  StyledStepper,
  StyledTextField,
  UserInput,
  UserSelect,
};
