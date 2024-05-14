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
        validation.touched.countryId && validation.errors.countryId
          ? "red"
          : styles.borderColor,
      "&:hover": {
        borderColor:
          validation.touched.countryId && validation.errors.countryId
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
        name="countryId"
        id="countryId"
        value={validation.values.countryId || {}}
        placeholder="Select country"
        onChange={(value) => {
          validation.setFieldValue("countryId", value);
          // Reset the error when a value is selected
          validation.setFieldError("countryId", "");
        }}
        options={countryOptions}
        onBlur={() => validation.setFieldTouched("countryId", true)}
        className={
          validation.touched.countryId && validation.errors.countryId
            ? "is-invalid"
            : ""
        }
        styles={customSelectStyles}
      />
      <FormFeedback>{validation.errors.countryId?.value}</FormFeedback>
    </FormGroup>
  );
};

CountryOfOrigin.propTypes = {
  validation: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default CountryOfOrigin;
