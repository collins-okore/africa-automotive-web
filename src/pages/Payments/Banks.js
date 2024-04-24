import React, { useEffect } from "react";

import { Col, Label, FormFeedback, Input } from "reactstrap";
import PropTypes from "prop-types";
import { getBanks as onGetBanks } from "../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const Banks = ({ validation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Dispatched banks");
    dispatch(onGetBanks());
  }, [dispatch]);

  const selectBanks = createSelector(
    (state) => state.Bank,
    (bank) => ({
      banks: bank.bank.data,
    })
  );

  const { banks } = useSelector(selectBanks);

  const bankOptions = banks.map((bank) => ({
    value: bank?.id,
    label: bank?.bankName,
    code: bank?.bankName,
  }));

  return (
    <Col md={6} className="mb-3">
      <Label htmlFor="choices-publish-status-input" className="form-label">
        Bank/Telco
      </Label>
      <Input
        name="bankId"
        type="select"
        className="form-select"
        id="choices-publish-bankId-input"
        onChange={(e) => {
          validation.setFieldValue("bankId", e.target.value);
        }}
        onBlur={validation.handleBlur}
        value={validation.values.bankId || ""}
      >
        <option value="" key="XXX">
          Select Bank/Telco
        </option>
        {bankOptions.map((bank) => (
          <option value={bank.value} key={bank.value}>
            {bank.label}
          </option>
        ))}
      </Input>
      {validation.touched.bankId && validation.errors.bankId ? (
        <FormFeedback type="invalid">{validation.errors.bankId}</FormFeedback>
      ) : null}
    </Col>
  );
};

Banks.propTypes = {
  validation: PropTypes.object,
};

export default Banks;
