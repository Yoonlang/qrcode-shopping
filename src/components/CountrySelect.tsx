import Autocomplete from "@mui/material/Autocomplete";
import { CountryType, countries } from "@/consts/countries";
import {
  StyledErrorMessage,
  StyledIconButton,
  StyledTextField,
} from "./FormItems";
import styled from "styled-components";
import { FormikProps } from "formik";
import { SyntheticEvent } from "react";
import Icons from "./Icons";
import { MenuItem, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

const StyledDiv = styled.div`
  margin-top: 8px;
  margin-bottom: 4px;
`;

const StyledPaper = styled(Paper)`
  background-color: #e7e7e7;
  width: 100%;

  & img {
    margin-right: 8px;
    flex-shrink: 0;
  }

  & ul {
    padding: 0;

    & li.MuiAutocomplete-option {
      white-space: normal;
      display: flex;
      justify-content: space-between;
      background-color: #e7e7e7;
      font-size: 17px;
      border-bottom: 0.5px solid rgba(60, 60, 67, 0.36);

      &.Mui-focused,
      &.Mui-Selected,
      &:hover,
      &:focus {
        background-color: #e7e7e7 !important;
      }

      &[aria-selected="true"] {
        background-color: #e7e7e7 !important;
      }
    }
  }
`;

const CountrySelect = ({ formik }: { formik: FormikProps<any> }) => {
  const { t } = useTranslation();
  const handleChangeCountry = (
    e: SyntheticEvent<Element>,
    option: CountryType | null
  ) => {
    formik.setFieldValue("countryCode", option ? `+${option.phone}` : "");
  };

  return (
    <>
      <StyledDiv>
        <Autocomplete
          options={countries}
          autoHighlight
          getOptionLabel={(option) => `+${option.phone} ${option.label}`}
          renderOption={(props, option) => (
            <MenuItem {...props} key={option.label}>
              <div>
                <img
                  key={option.label}
                  loading="lazy"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt={`${option.label}-flag`}
                />
                {option.label} +{option.phone}
              </div>
              {formik.values.countryCode === `+${option.phone}` && (
                <StyledIconButton disabled>{Icons["select"]}</StyledIconButton>
              )}
            </MenuItem>
          )}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              label={t("Country Code")}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              name="countryCode"
              value={formik.values.countryCode}
              onBlur={formik.handleBlur}
              error={formik.touched.countryCode && !!formik.errors.countryCode}
            />
          )}
          PaperComponent={(props) => <StyledPaper {...props} />}
          onChange={(e, option) => handleChangeCountry(e, option)}
        />
      </StyledDiv>
      {formik.errors.countryCode && formik.touched.countryCode ? (
        <StyledErrorMessage>
          {Icons["error"]}
          <p>{t(formik.errors.countryCode?.toString())}</p>
        </StyledErrorMessage>
      ) : null}
    </>
  );
};

export default CountrySelect;
