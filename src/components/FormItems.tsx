import { MenuItem, Stepper, TextField } from "@mui/material";
import { FormikProps } from "formik";
import styled from "styled-components";

const StyledStepper = styled(Stepper)({
  "& .MuiSvgIcon-root": {
    width: "15.6px",
    marginLeft: "5px",
  },
  "& .MuiStepIcon-root.Mui-active": {
    color: "#000",
  },
  "& .MuiStepLabel-label": {
    fontSize: "17px",
  },
  "& .MuiStepIcon-text": {
    fontSize: "7.8px",
  },
  "& .Mui-completed": {
    color: "#000",
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root.MuiOutlinedInput-root": {
    borderRadius: "6px",
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
        </StyledMenuItem>
      ))}
    </StyledTextField>
  );
};

export { StyledStepper, UserInput, UserSelect };
