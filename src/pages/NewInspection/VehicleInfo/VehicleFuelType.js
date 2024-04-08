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
      fuelType: state?.fuelType?.data,
    })
  );

  const { fuelType: fuelTypeList } = useSelector(
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
        name="fuelType"
        type="select"
        className="form-select"
        id="choices-publish-body-input"
        onChange={(e) => {
          validation.setFieldValue("fuelType", e.target.value);
          // Reset the error when a value is selected
          validation.setFieldError("fuelType", "");
        }}
        onBlur={() => validation.setFieldTouched("fuelType", true)}
        value={validation.values.fuelType || ""}
        invalid={
          validation.touched.fuelType && validation.errors.fuelType
            ? true
            : false
        }
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {fuelTypeOptions.map((fuelType) => (
          <option value={fuelType.value} key={fuelType.value}>
            {fuelType.label}
          </option>
        ))}
      </Input>
      {validation.touched.fuelType && validation.errors.fuelType ? (
        <FormFeedback type="invalid">{validation.errors.fuelType}</FormFeedback>
      ) : null}
    </>
  );
};

VehicleFuelType.propTypes = {
  validation: PropTypes.object.isRequired,
};

export default VehicleFuelType;
