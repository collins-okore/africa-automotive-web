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
        name="vehicleBodyType"
        type="select"
        className="form-select"
        id="choices-publish-body-input"
        onChange={(e) => {
          validation.setFieldValue("vehicleBodyType", e.target.value);
          // Reset the error when a value is selected
          validation.setFieldError("vehicleBodyType", "");
        }}
        onBlur={() => validation.setFieldTouched("vehicleBodyType", true)}
        value={validation.values.vehicleBodyType || ""}
        defaultValue={validation.values.vehicleBodyType || ""}
        invalid={
          validation.touched.vehicleBodyType &&
          validation.errors.vehicleBodyType
            ? true
            : false
        }
      >
        <option value="" disabled>
          Select an option
        </option>
        {bodyTypeOptions.map((vehicleBodyType) => (
          <option value={vehicleBodyType.value} key={vehicleBodyType.value}>
            {vehicleBodyType.label}
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
