import React, { useEffect } from "react";
import { Label, Input, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import PropTypes from "prop-types";
import { getPaymentModes as onGetPaymentModes } from "../../slices/thunks";

const PaymentModes = ({ validation }) => {
  const dispatch = useDispatch();
  // Fetch Payment Modes
  useEffect(() => {
    dispatch(onGetPaymentModes());
  }, [dispatch]);

  // Get Payment Modes from store
  const selectPaymentModes = createSelector(
    (state) => state.PaymentMode,
    (paymentMode) => ({
      paymentModes: paymentMode.paymentModes.data,
    })
  );
  const { paymentModes } = useSelector(selectPaymentModes);

  // Convert Payment Modes to Select Options
  const paymentModesOptions = paymentModes.map((paymentMode) => ({
    value: paymentMode.id,
    label: paymentMode?.name,
    code: paymentMode?.code,
  }));
  console.log("paymentModesOptions", validation.values.paymentMode);

  return (
    <Row className="g-4 mb-3 ">
      {
        // Loop through payment modes and display them
        paymentModesOptions.map((paymentMode) => {
          if (paymentMode.code === "CHEQUE_DEPOSIT") {
            return null;
          }
          let icon = "";
          switch (paymentMode.code) {
            case "MOBILE_MONEY":
              icon = "ri-cellphone-fill";
              break;
            case "BANK_DEPOSIT":
              icon = "ri-bank-card-fill";
              break;
            case "BANK_TRANSFER":
              icon = "ri-bank-card-fill";
              break;
            case "CHEQUE_DEPOSIT":
              icon = "ri-money-dollar-box-fill";
              break;
            case "CASH":
              icon = "ri-hand-coin-fill";
              break;
            default:
              icon = "ri-hand-coin-fill";
              break;
          }
          return (
            <Col lg={3} sm={6} key={paymentMode.value}>
              <div>
                <div className="form-check card-radio">
                  <Input
                    id={`paymentMethod${paymentMode.value}`}
                    name="paymentMode"
                    type="radio"
                    className="form-check-input"
                    onChange={() => {
                      validation.setFieldValue("paymentMode", paymentMode.code);
                      validation.setFieldError("paymentMode", "");
                    }}
                    defaultChecked={
                      validation.values.paymentMode === paymentMode.code
                    }
                    checked={validation.values.paymentMode === paymentMode.code}
                  />
                  <Label
                    className="form-check-label"
                    htmlFor={`paymentMethod${paymentMode.value}`}
                  >
                    <span className="fs-16 text-muted me-2">
                      <i className={`${icon} align-bottom`}></i>
                    </span>
                    <span className="fs-14 text-wrap">{paymentMode.label}</span>
                  </Label>
                </div>
              </div>
            </Col>
          );
        })
      }
    </Row>
  );
};

PaymentModes.propTypes = {
  validation: PropTypes.object,
};

export default PaymentModes;
