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
      transmission: state?.transmission?.data,
    })
  );

  const { transmission: transmissionList } = useSelector(
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
        name="transmission"
        type="select"
        className="form-select"
        id="choices-publish-body-input"
        onChange={(e) => {
          validation.setFieldValue("transmission", e.target.value);
          // Reset the error when a value is selected
          validation.setFieldError("transmission", "");
        }}
        onBlur={() => validation.setFieldTouched("transmission", true)}
        value={validation.values.transmission || ""}
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {transmissionOptions.map((transmission) => (
          <option value={transmission.label} key={transmission.value}>
            {transmission.label}
          </option>
        ))}
      </Input>
      {validation.touched.transmission && validation.errors.transmission ? (
        <FormFeedback type="invalid">
          {validation.errors.transmission}
        </FormFeedback>
      ) : null}
    </>
  );
};

Transmission.propTypes = {
  validation: PropTypes.object.isRequired,
};

export default Transmission;
