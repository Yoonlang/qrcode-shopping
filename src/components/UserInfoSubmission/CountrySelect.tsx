import { MenuItem, Paper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { FormikContextType, useFormikContext } from "formik";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

import { FormType } from "@/components/const";
import Icons from "@/components/Icons";
import {
  CountryType,
  countries,
} from "@/components/UserInfoSubmission/countries";
import {
  StyledErrorMessage,
  StyledIconButton,
  StyledTextField,
} from "@/components/UserInfoSubmission/FormItems";

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

const CountrySelect = ({ required = false }: { required?: boolean }) => {
  const { t } = useTranslation();
  const {
    values,
    errors,
    touched,
    setValues,
    handleBlur,
  }: FormikContextType<FormType> = useFormikContext();

  const handleChangeCountry = (
    e: SyntheticEvent<Element>,
    option: CountryType
  ) => {
    if (option) {
      setValues({ ...values, countryCode: option });
    }
  };

  return (
    <>
      <StyledDiv>
        <Autocomplete
          defaultValue={values.countryCode}
          options={countries.sort((a, b) => {
            if (a.label < b.label) return -1;
            else return 1;
          })}
          autoHighlight
          getOptionLabel={(option) =>
            values.countryCode.phone !== ""
              ? `${option.label} +${option.phone}`
              : ""
          }
          renderOption={(props, option) => (
            <MenuItem {...props} key={option.label}>
              <div key={props.id}>
                <img
                  key={option.label}
                  loading="lazy"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt={`${option.label}-flag`}
                />
                {option.label} +{option.phone}
              </div>
              {values.countryCode.phone === option.phone && (
                <StyledIconButton disabled>{Icons["select"]}</StyledIconButton>
              )}
            </MenuItem>
          )}
          filterOptions={(options, { inputValue }) => {
            return options.filter(({ label, phone }) =>
              `${label} +${phone}`
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            );
          }}
          renderInput={(params) => {
            return (
              <StyledTextField
                required={required}
                {...params}
                label={t("Country Code")}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
                name="countryCode"
                value={values.countryCode}
                onBlur={handleBlur}
                error={touched.countryCode && !!errors.countryCode}
              />
            );
          }}
          PaperComponent={(props) => <StyledPaper {...props} />}
          onChange={(e, option) => option && handleChangeCountry(e, option)}
        />
      </StyledDiv>
      {errors.countryCode && touched.countryCode && (
        <StyledErrorMessage>
          {Icons["error"]}
          <p>{t(errors.countryCode?.toString())}</p>
        </StyledErrorMessage>
      )}
    </>
  );
};

export default CountrySelect;
