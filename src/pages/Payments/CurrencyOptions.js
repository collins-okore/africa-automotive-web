import React, { useEffect } from "react";

import { Col, Label, FormFeedback } from "reactstrap";
import PropTypes from "prop-types";
import { getCurrencies as onGetCurrencies } from "../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import Select from "react-select";

const CurrencyOptions = ({ validation }) => {
  const dispatch = useDispatch();

  // Custom styles for react-select
  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      borderColor:
        validation.touched.vehicleMake && validation.errors.vehicleMake
          ? "red"
          : styles.borderColor,
      "&:hover": {
        borderColor:
          validation.touched.vehicleMake && validation.errors.vehicleMake
            ? "red"
            : styles["&:hover"].borderColor,
      },
    }),
  };

  // Dispatch action to get currency list then select from store
  useEffect(() => {
    dispatch(onGetCurrencies());
  }, [dispatch]);

  // Get currency list from store
  const selectCurrencies = createSelector(
    (state) => state.Currency,
    (currency) => ({
      currencies: currency.currency.data,
    })
  );
  const { currencies: currencyList } = useSelector(selectCurrencies);

  // Convert currency list to select options
  const currencyOptions = currencyList.map((currency) => ({
    value: currency?.id,
    label: currency?.name,
  }));

  return (
    <Col md={3} className="mb-3">
      <Label htmlFor="currency-field" className="form-label">
        Currency Paid In
      </Label>
      <Select
        name="currency"
        id="currency"
        value={validation.values.currency || { value: "", label: "" }}
        placeholder="Select currency"
        onChange={(currency) => {
          validation.setFieldValue("currency", currency);
          // Reset the error when a value is selected
          validation.setFieldError("currency", "");
        }}
        options={currencyOptions}
        onBlur={() => validation.setFieldTouched("currency", true)}
        className={
          validation.touched.currency && validation.errors.currency
            ? "is-invalid"
            : ""
        }
        styles={customSelectStyles}
      />
      <FormFeedback>{validation.errors.currency?.value}</FormFeedback>
    </Col>
  );
};

CurrencyOptions.propTypes = {
  validation: PropTypes.object,
};

export default CurrencyOptions;
