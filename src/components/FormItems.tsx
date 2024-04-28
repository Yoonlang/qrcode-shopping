import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Stepper,
  TextField,
} from "@mui/material";
import { FormikProps } from "formik";
import styled from "styled-components";
import Icons from "./Icons";

const StyledBox = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  > div:first-child {
    margin-right: 10px;
  }
`;

const AddressBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StyledStepper = styled(Stepper)({
  padding: "20px",
  paddingBottom: "85px",
  "& .MuiSvgIcon-root": {
    width: "15.6px",
    marginLeft: "5px",
  },
  "& .MuiStepIcon-root.Mui-active": {
    color: "#000",
  },
  "& .MuiStepLabel-label": {
    fontSize: "17px",
    fontWeight: "700",
    color: "#000",
  },
  "& .MuiStepIcon-text": {
    fontSize: "7.8px",
  },
  "& .Mui-completed": {
    color: "#000",
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root.MuiOutlinedInput-root fieldSet": {
    borderRadius: "6px",
    borderColor: "rgba(0,0,0,0.1)",
  },
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
});

const StyledMenuItem = styled(MenuItem)({
  "&.Mui-selected": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  "&:focus": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  "&:selected": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

const StyledFormControlLabel = styled(FormControlLabel)({
  marginRight: "8px",
  "& .MuiCheckbox-root": {
    color: "#000",
    paddingLeft: "0",
  },
  "& .MuiFormControlLabel-label": {
    fontSize: "12px",
    color: "rgba(0,0,0,0.87)",
  },
});

const AddressCheckbox = ({
  name,
  formik,
}: {
  name: string;
  formik: FormikProps<any>;
}) => {
  return (
    <StyledFormControlLabel
      control={<Checkbox />}
      label="회사 주소와 동일"
      labelPlacement="start"
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
    />
  );
};

const UserInput = ({
  label,
  name,
  formik,
  type = "text",
}: {
  label: string;
  name: string;
  formik: FormikProps<any>;
  type?: string;
}) => {
  return (
    <StyledTextField
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
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {!formik.errors[name] && formik.touched[name] && (
              <>{Icons["select"]}</>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

const UserSelect = ({
  label,
  name,
  items,
  formik,
}: {
  label: string;
  name: string;
  items: string[];
  formik: FormikProps<any>;
}) => {
  return (
    <StyledTextField
      select
      label={label}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && !!formik.errors[name]}
      autoComplete="off"
      margin="dense"
      fullWidth
    >
      {items.map((item, index) => (
        <StyledMenuItem key={item} value={item}>
          {item}
          {formik.values.business === item && (
            <IconButton>{Icons["select"]}</IconButton>
          )}
        </StyledMenuItem>
      ))}
    </StyledTextField>
  );
};

export {
  StyledBox,
  AddressBox,
  StyledStepper,
  AddressCheckbox,
  UserInput,
  UserSelect,
};
