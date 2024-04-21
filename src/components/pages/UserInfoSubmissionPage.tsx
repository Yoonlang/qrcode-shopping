import { useFormik } from "formik";
import { useState } from "react";
import { Step, StepContent, StepLabel } from "@mui/material";
import { StyledStepper } from "@/components/FormItems";
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
    },
    onSubmit: (form) => {
      console.log(form);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <StyledStepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} expanded>
              <StepLabel>{step.label}</StepLabel>
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
    </div>
  );
};

export default UserInfoSubmissionPage;
