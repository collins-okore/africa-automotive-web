import React, { useEffect } from "react";

import { Col, Label, FormFeedback, Input } from "reactstrap";
import PropTypes from "prop-types";
import { getPaymentTypes as onGetPaymentTypes } from "../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const PaymentTypes = ({ validation }) => {
  const dispatch = useDispatch();
  // Fetch Payment Types
  useEffect(() => {
    dispatch(onGetPaymentTypes());
  }, [dispatch]);

  // Get Payment Types from store
  const selectPaymentTypes = createSelector(
    (state) => state.PaymentType,
    (paymentType) => ({
      paymentTypes: paymentType.paymentTypes.data,
    })
  );

  const { paymentTypes } = useSelector(selectPaymentTypes);

  // Convert Payment Types to Select Options
  const paymentTypesOptions = paymentTypes.map((paymentType) => ({
    value: paymentType?.code,
    label: paymentType?.name,
    code: paymentType?.code,
  }));

  return (
    <Col md={6} className="mb-3">
      <Label htmlFor="choices-publish-status-input" className="form-label">
        Type of Payment
      </Label>
      <Input
        name="paymentType"
        type="select"
        className="form-select"
        id="choices-publish-paymentType-input"
        onChange={(e) => {
          validation.setFieldValue("paymentType", e.target.value);
        }}
        onBlur={validation.handleBlur}
        value={validation.values.paymentType || ""}
      >
        {
          // Loop through payment types and display them
          paymentTypesOptions.map((paymentType) => (
            <option value={paymentType.value} key={paymentType.value}>
              {paymentType.value}
            </option>
          ))
        }
      </Input>
      {validation.touched.paymentType && validation.errors.paymentType ? (
        <FormFeedback type="invalid">
          {validation.errors.paymentType}
        </FormFeedback>
      ) : null}
    </Col>
  );
};

PaymentTypes.propTypes = {
  validation: PropTypes.object,
};

export default PaymentTypes;
