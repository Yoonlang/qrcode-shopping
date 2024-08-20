import styled from "@emotion/styled";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stepper,
  TextField,
} from "@mui/material";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Icons from "@/components/common/Icons";
import { UserInfo } from "@/components/const";

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

    &.Mui-completed {
      color: var(--color-black);
    }
  }

  & .MuiStepIcon-root.Mui-active {
    color: var(--color-black);
  }

  & .MuiStepLabel-label {
    font-size: 17px;
    font-weight: 700;
    color: var(--color-black);
  }

  & .MuiStepIcon-text {
    font-size: 7.8px;
  }
`;

const StyledTextField = styled(TextField)`
  &.MuiFormControl-root {
    & label.Mui-error {
      color: var(--color-text-field-error);
    }

    background-color: ${(props) =>
      props.disabled && "var(--color-text-field-disabled)"};
  }

  & .MuiInputBase-root.MuiOutlinedInput-root {
    & .MuiSelect-select {
      display: flex;
      justify-content: space-between;
    }

    &.Mui-focused fieldset {
      border-color: ${(props) =>
        props.required
          ? "var(--color-text-field-required)"
          : "var(--color-black)"};
    }

    & fieldSet {
      border-radius: 6px;
      border-color: ${(props) =>
        props.required
          ? "var(--color-text-field-required)"
          : "var(--color-text-field-primary)"};
    }

    &.Mui-error {
      & fieldSet {
        border-color: var(--color-text-field-error);
      }

      & label {
        color: var(--color-text-field-error);
      }
    }
  }

  & label {
    &.Mui-focused {
      color: ${(props) =>
        props.required
          ? "var(--color-text-field-required)"
          : "var(--color-black)"};
    }
  }

  & .MuiInput-underline:after {
    border-bottom-color: ${(props) =>
      props.required
        ? "var(--color-text-field-required)"
        : "var(--color-black)"};
  }

  & .MuiFormHelperText-root.Mui-error {
    color: var(--color-text-field-error);
  }
`;

const StyledMenuItem = styled(MenuItem)`
  background-color: var(--color-li-primary);
  font-size: 17px;
  border-bottom: 0.5px solid var(--color-li-secondary);
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: var(--color-li-primary);
  }

  &.Mui-selected {
    background-color: var(--color-li-primary);

    &:hover {
      background-color: var(--color-li-primary);
    }
  }

  &:focus {
    background-color: var(--color-li-primary);
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-right: 8px;

  & .MuiCheckbox-root {
    color: var(--color-black);
    padding-left: 0;

    &.Mui-checked {
      color: var(--color-black);
    }
  }

  & .MuiFormControlLabel-label {
    font-size: 12.5px;
    color: var(--color-primary);
  }
`;

const StyledErrorMessage = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  & p {
    margin: 0;
    font-size: 12px;
    color: var(--color-text-field-error);
    margin-left: 5px;
  }
`;

const StyledIconButton = styled(IconButton)`
  padding: 0;
`;

const AddressCheckbox = ({
  name,
  formik,
}: {
  name: string;
  formik: FormikProps<UserInfo>;
}) => {
  const { t } = useTranslation();
  const { values, handleBlur, handleChange } = formik;

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

interface UserInputProps {
  label: string;
  name: string;
  type?: string;
  disable?: boolean;
  required?: boolean;
  formik: FormikProps<UserInfo>;
}

const UserInput = ({
  label,
  name,
  type = "text",
  disable = false,
  required = false,
  formik,
}: UserInputProps) => {
  const { t } = useTranslation();
  const { values, errors, touched, handleBlur, handleChange } = formik;

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

interface UserSelectProps {
  label: string;
  name: string;
  items: string[];
  required?: boolean;
  formik: FormikProps<UserInfo>;
}

const UserSelect = ({
  label,
  name,
  items,
  required = false,
  formik,
}: UserSelectProps) => {
  const { t } = useTranslation();
  const { values, errors, touched, handleBlur, handleChange } = formik;
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
        {items.map((item) => (
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
