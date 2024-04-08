import React, { useEffect, useMemo } from "react";
import { Label, FormFeedback, Input } from "reactstrap";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { createSelector } from "reselect";
import { getVehicleBodyTypes as onGetBodyTypes } from "../../../slices/thunks";

const VehicleBodyType = ({ validation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      onGetBodyTypes({
        pagination: {
          page: 1,
          pageSize: 10000,
        },
      })
    );
  }, [dispatch]);

  const selectLayoutState = (state) => state.VehicleBodyType;
  const selectTransmissionProperties = createSelector(
    selectLayoutState,
    (state) => ({
      vehicleBodyType: state?.vehicleBodyType?.data,
    })
  );

  const { vehicleBodyType: bodyTypeList } = useSelector(
    selectTransmissionProperties
  );

  const bodyTypeOptions = useMemo(() => {
    return bodyTypeList.map((el) => {
      return {
        value: el?.name,
        label: el?.name,
      };
    });
  }, [bodyTypeList]);

  return (
    <>
      <Label htmlFor="choices-publish-status-input" className="form-label">
        Body Type
      </Label>
      <Input
        name="bodyType"
        type="select"
        className="form-select"
        id="choices-publish-body-input"
        onChange={(e) => {
          validation.setFieldValue("bodyType", e.target.value);
          // Reset the error when a value is selected
          validation.setFieldError("bodyType", "");
        }}
        onBlur={() => validation.setFieldTouched("bodyType", true)}
        value={validation.values.bodyType || ""}
        defaultValue={validation.values.bodyType || ""}
        invalid={
          validation.touched.bodyType && validation.errors.bodyType
            ? true
            : false
        }
      >
        <option value="" disabled>
          Select an option
        </option>
        {bodyTypeOptions.map((bodyType) => (
          <option value={bodyType.value} key={bodyType.value}>
            {bodyType.label}
          </option>
        ))}
      </Input>
      {validation.touched.color && validation.errors.color ? (
        <FormFeedback type="invalid">{validation.errors.color}</FormFeedback>
      ) : null}
    </>
  );
};

VehicleBodyType.propTypes = {
  validation: PropTypes.object.isRequired,
};

export default VehicleBodyType;
