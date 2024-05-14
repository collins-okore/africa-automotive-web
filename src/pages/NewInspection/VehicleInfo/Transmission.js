import React, { useEffect, useMemo } from "react";
import { Label, FormFeedback, Input } from "reactstrap";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { createSelector } from "reselect";
import { getTransmissions as onGetTransmissions } from "../../../slices/thunks";

const Transmission = ({ validation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      onGetTransmissions({
        pagination: {
          page: 1,
          pageSize: 10000,
        },
      })
    );
  }, [dispatch]);

  const selectLayoutState = (state) => state.Transmission;
  const selectTransmissionProperties = createSelector(
    selectLayoutState,
    (state) => ({
      vehicleTransmission: state?.vehicleTransmission?.data,
    })
  );

  const { vehicleTransmission: transmissionList } = useSelector(
    selectTransmissionProperties
  );

  const transmissionOptions = useMemo(() => {
    return transmissionList.map((el) => {
      return {
        value: el?.id,
        label: el?.name,
      };
    });
  }, [transmissionList]);

  return (
    <>
      <Label htmlFor="choices-publish-status-input" className="form-label">
        Transmission
      </Label>
      <Input
        name="vehicleTransmission"
        type="select"
        className="form-select"
        id="choices-publish-body-input"
        onChange={(e) => {
          validation.setFieldValue("vehicleTransmission", e.target.value);
          // Reset the error when a value is selected
          validation.setFieldError("vehicleTransmission", "");
        }}
        invalid={
          validation.touched.vehicleTransmission &&
          validation.errors.vehicleTransmission
            ? true
            : false
        }
        onBlur={() => validation.setFieldTouched("vehicleTransmission", true)}
        value={validation.values.vehicleTransmission || ""}
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {transmissionOptions.map((vehicleTransmission) => (
          <option
            value={vehicleTransmission.label}
            key={vehicleTransmission.value}
          >
            {vehicleTransmission.label}
          </option>
        ))}
      </Input>

      {validation.touched.vehicleTransmission &&
      validation.errors.vehicleTransmission ? (
        <FormFeedback type="invalid">
          {validation.errors.vehicleTransmission}
        </FormFeedback>
      ) : null}
    </>
  );
};

Transmission.propTypes = {
  validation: PropTypes.object.isRequired,
};

export default Transmission;
