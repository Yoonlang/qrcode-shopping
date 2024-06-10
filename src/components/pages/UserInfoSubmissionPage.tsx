import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { Step, StepContent, StepLabel } from "@mui/material";
import {
  AddressBox,
  AddressCheckbox,
  StyledStepper,
} from "@/components/UserInfoSubmission/FormItems";
import { steps } from "@/components/UserInfoSubmission/const";
import OrdererInfo from "../UserInfoSubmission/OrdererInfo";
import CompanyAddress from "../UserInfoSubmission/CompanyAddress";
import ShippingAddress from "../UserInfoSubmission/ShippingAddress";
import { useTranslation } from "react-i18next";
import { Button, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const UserInfoSubmissionPage = ({ formik, goToNextPage }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    goToNextPage();
  };

  useEffect(() => {
    if (
      !formik.errors["userName"] &&
      !formik.errors["companyName"] &&
      !formik.errors["business"] &&
      !formik.errors["countryCode"] &&
      !formik.errors["phoneNumber"] &&
      !formik.errors["email"]
    ) {
      setActiveStep(1);

      if (
        formik.values.business === "Student" ||
        (!formik.errors["coZipCode"] &&
          !formik.errors["coAddress1"] &&
          !formik.errors["coAddress2"])
      ) {
        setActiveStep(2);

        if (
          formik.values.isSameAddress ||
          (!formik.errors["spZipCode"] &&
            !formik.errors["spAddress1"] &&
            !formik.errors["spAddress2"])
        ) {
          setActiveStep(3);
        }
      }
    } else {
      setActiveStep(0);
    }
  });

  useEffect(() => {
    localStorage.setItem("form", JSON.stringify(formik.values));
  }, [formik.values]);

  useEffect(() => {
    if (formik.isSubmitting) {
      setOpenDialog(true);
    }
  }, [formik.isSubmitting]);

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <DialogContentText>{t("Submission Complete")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            {t("Confirm")}
          </Button>
        </DialogActions>
      </Dialog>

      <form onSubmit={formik.handleSubmit}>
        <StyledStepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} expanded>
              {index !== 2 ? (
                <StepLabel>{t(step.label)}</StepLabel>
              ) : (
                <AddressBox>
                  <StepLabel>{t(step.label)}</StepLabel>
                  {formik.values.businessType !== "Student" && (
                    <AddressCheckbox name="isSameAddress" formik={formik} />
                  )}
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
    </>
  );
};

export default UserInfoSubmissionPage;
