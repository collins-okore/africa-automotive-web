import React, { useMemo, useEffect } from "react";
import { Label, FormFeedback, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { createSelector } from "reselect";

import { getCountries as onGetCountries } from "../../../slices/thunks";

const CountryOfOrigin = ({ validation }) => {
  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      borderColor:
        validation.touched.country && validation.errors.country
          ? "red"
          : styles.borderColor,
      "&:hover": {
        borderColor:
          validation.touched.country && validation.errors.country
            ? "red"
            : styles["&:hover"].borderColor,
      },
    }),
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      onGetCountries({
        pagination: {
          page: 1,
          pageSize: 10000,
        },
      })
    );
  }, [dispatch]);

  const selectLayoutState = (state) => state.Country;
  const selectCountryProperties = createSelector(
    selectLayoutState,
    (state) => ({
      country: state.country.data,
    })
  );

  const { country: countryList } = useSelector(selectCountryProperties);

  const countryOptions = useMemo(() => {
    return countryList.map((el) => {
      return {
        value: el?.id,
        label: el?.name,
      };
    });
  }, [countryList]);

  return (
    <FormGroup>
      <Label htmlFor="country-field" className="form-label">
        Country Of Origin
      </Label>
      <Select
        name="countryOfOrigin"
        id="countryOfOrigin"
        value={validation.values.countryOfOrigin || {}}
        placeholder="Select country"
        onChange={(value) => {
          validation.setFieldValue("countryOfOrigin", value);
          // Reset the error when a value is selected
          validation.setFieldError("countryOfOrigin", "");
        }}
        options={countryOptions}
        onBlur={() => validation.setFieldTouched("countryOfOrigin", true)}
        className={
          validation.touched.countryOfOrigin &&
          validation.errors.countryOfOrigin
            ? "is-invalid"
            : ""
        }
        styles={customSelectStyles}
      />
      <FormFeedback>{validation.errors.countryOfOrigin?.value}</FormFeedback>
    </FormGroup>
  );
};

CountryOfOrigin.propTypes = {
  validation: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default CountryOfOrigin;
