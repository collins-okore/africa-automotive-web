import React, { useEffect, useMemo } from "react";
import { Label, FormFeedback, Input } from "reactstrap";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { createSelector } from "reselect";
import { getFuelTypes as onGetFuelTypes } from "../../../slices/thunks";

const VehicleFuelType = ({ validation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      onGetFuelTypes({
        pagination: {
          page: 1,
          pageSize: 10000,
        },
      })
    );
  }, [dispatch]);

  const selectLayoutState = (state) => state.FuelType;
  const selectVehicleFuelTypeProperties = createSelector(
    selectLayoutState,
    (state) => ({
      vehicleFuelType: state?.vehicleFuelType?.data,
    })
  );

  const { vehicleFuelType: fuelTypeList } = useSelector(
    selectVehicleFuelTypeProperties
  );

  const fuelTypeOptions = useMemo(() => {
    return fuelTypeList.map((el) => {
      return {
        value: el?.id,
        label: el?.name,
      };
    });
  }, [fuelTypeList]);

  return (
    <>
      <Label htmlFor="choices-publish-status-input" className="form-label">
        Fuel Type
      </Label>
      <Input
        name="vehicleFuelType"
        type="select"
        className="form-select"
        id="choices-publish-body-input"
        onChange={(e) => {
          validation.setFieldValue("vehicleFuelType", e.target.value);
          // Reset the error when a value is selected
          validation.setFieldError("vehicleFuelType", "");
        }}
        onBlur={() => validation.setFieldTouched("vehicleFuelType", true)}
        value={validation.values.vehicleFuelType || ""}
        invalid={
          validation.touched.vehicleFuelType &&
          validation.errors.vehicleFuelType
            ? true
            : false
        }
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {fuelTypeOptions.map((vehicleFuelType) => (
          <option value={vehicleFuelType.value} key={vehicleFuelType.value}>
            {vehicleFuelType.label}
          </option>
        ))}
      </Input>
      {validation.touched.vehicleFuelType &&
      validation.errors.vehicleFuelType ? (
        <FormFeedback type="invalid">
          {validation.errors.vehicleFuelType}
        </FormFeedback>
      ) : null}
    </>
  );
};

VehicleFuelType.propTypes = {
  validation: PropTypes.object.isRequired,
};

export default VehicleFuelType;
