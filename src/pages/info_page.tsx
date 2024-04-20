import { useFormik } from "formik";
import { useState } from "react";
import { Box, Step, StepContent, StepLabel, Stepper } from "@mui/material";

import { TitleAppBar } from "@/components/AppBar";
import { StyledStepper, UserInput, UserSelect } from "@/components/FormItems";
import { business, steps, codes } from "@/consts/form";
import styled from "styled-components";

const StyledBox = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const StyledDiv = styled.div`
  margin-right: 10px;
`;

const InfoPage = ({ toNextPage }: { toNextPage: Function }) => {
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
      <TitleAppBar back={true} title="INFO" />
      <StyledStepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <form onSubmit={formik.handleSubmit}>
                <UserInput label="이름" name="userName" formik={formik} />
                <UserInput label="회사명" name="companyName" formik={formik} />
                <UserSelect
                  label="사업종류"
                  name="business"
                  items={business}
                  formik={formik}
                />
                <UserInput label="이메일" name="email" formik={formik} />
                <StyledBox display="flex">
                  <StyledDiv>
                    <UserSelect
                      label="국가번호"
                      name="countryCode"
                      items={codes}
                      formik={formik}
                    />
                  </StyledDiv>
                  <UserInput
                    label="전화번호"
                    name="phoneNumber"
                    formik={formik}
                  />
                </StyledBox>
              </form>
            </StepContent>
          </Step>
        ))}
      </StyledStepper>
    </div>
  );
};

export default InfoPage;
