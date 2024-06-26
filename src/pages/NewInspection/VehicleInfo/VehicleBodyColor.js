import React, { useEffect, useMemo } from "react";
import { Label, FormFeedback, Input } from "reactstrap";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { createSelector } from "reselect";
import { getVehicleBodyColors as onGetBodyColor } from "../../../slices/thunks";

const VehicleBodyColor = ({ validation }) => {
  const dispatch = useDispatch();
  // Fetch Vehicle Body Color List
  useEffect(() => {
    dispatch(
      onGetBodyColor({
        pagination: {
          page: 1,
          pageSize: 10000,
        },
      })
    );
  }, [dispatch]);

  const selectLayoutState = (state) => state.VehicleBodyColor;
  const selectVehicleBodyColorProperties = createSelector(
    selectLayoutState,
    (state) => ({
      vehicleBodyColor: state.vehicleBodyColor.data,
    })
  );

  const { vehicleBodyColor: bodyColorList } = useSelector(
    selectVehicleBodyColorProperties
  );

  const colorOptions = useMemo(() => {
    return bodyColorList.map((el) => {
      return {
        value: el?.name,
        label: el?.name,
      };
    });
  }, [bodyColorList]);
  return (
    <>
      <Label htmlFor="choices-publish-status-input" className="form-label">
        Color
      </Label>
      <Input
        name="vehicleBodyColor"
        type="select"
        className="form-select"
        id="choices-publish-body-input"
        onChange={validation.handleChange}
        onBlur={validation.handleBlur}
        value={validation.values.vehicleBodyColor || ""}
        invalid={
          validation.touched.vehicleBodyColor &&
          validation.errors.vehicleBodyColor
            ? true
            : false
        }
      >
        <option value="" disabled selected>
          Select an option
        </option>
        {colorOptions.map((vehicleBodyColor) => (
          <option value={vehicleBodyColor.value} key={vehicleBodyColor.value}>
            {vehicleBodyColor.label}
          </option>
        ))}
      </Input>
      {validation.touched.vehicleBodyColor &&
      validation.errors.vehicleBodyColor ? (
        <FormFeedback type="invalid">
          {validation.errors.vehicleBodyColor}
        </FormFeedback>
      ) : null}
    </>
  );
};

VehicleBodyColor.propTypes = {
  validation: PropTypes.object.isRequired,
};

export default VehicleBodyColor;
