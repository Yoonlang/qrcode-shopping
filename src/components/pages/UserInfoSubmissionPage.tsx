import { useFormik } from "formik";
import { useState } from "react";
import { Checkbox, Step, StepContent, StepLabel } from "@mui/material";
import {
  AddressBox,
  StyledFormControlLabel,
  StyledStepper,
} from "@/components/FormItems";
import { steps } from "@/consts/form";
import OrdererInfo from "../OrdererInfo";
import CompanyAddress from "../CompanyAddress";
import ShippingAddress from "../ShippingAddress";

const UserInfoSubmissionPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const formik = useFormik({
    initialValues: {
      userName: "",
      companyName: "",
      business: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      coZipCode: "",
      coAddress1: "",
      coAddress2: "",
      spZipCode: "",
      spAddress1: "",
      spAddress2: "",
    },
    onSubmit: (form) => {
      console.log(form);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <StyledStepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label} expanded>
            {index !== 2 ? (
              <StepLabel>{step.label}</StepLabel>
            ) : (
              <AddressBox>
                <StepLabel>{step.label}</StepLabel>
                <StyledFormControlLabel
                  control={<Checkbox />}
                  label="회사 주소와 동일"
                  labelPlacement="start"
                />
              </AddressBox>
            )}
            <StepContent>
              {index === 0 ? (
                <OrdererInfo formik={formik} />
              ) : index === 1 ? (
                <CompanyAddress formik={formik} />
              ) : (
                <ShippingAddress formik={formik} />
              )}
            </StepContent>
          </Step>
        ))}
      </StyledStepper>
    </form>
  );
};

export default UserInfoSubmissionPage;
