import React, { useMemo, useEffect } from "react";
import { Label, FormFeedback, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { createSelector } from "reselect";

import { getVehicleMakes as onGetVehicleMakes } from "../../../slices/thunks";

const VehicleMake = ({ validation, setLoading }) => {
  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      borderColor:
        validation.touched.vehicleMake && validation.errors.vehicleMake
          ? "red"
          : styles.borderColor,
      "&:hover": {
        borderColor:
          validation.touched.vehicleMake && validation.errors.vehicleMake
            ? "red"
            : styles["&:hover"].borderColor,
      },
    }),
  };

  const dispatch = useDispatch();
  // Fetch Vehicle Make List
  useEffect(() => {
    setLoading(true);
    dispatch(
      onGetVehicleMakes({
        pagination: {
          page: 1,
          pageSize: 10000,
        },
      })
    ).then(() => {
      setLoading(false);
    });
  }, [dispatch, setLoading]);

  const selectLayoutState = (state) => state.VehicleMake;
  const selectVehicleMakeProperties = createSelector(
    selectLayoutState,
    (state) => ({
      vehicleMake: state.vehicleMake.data,
    })
  );

  const { vehicleMake: vehicleMakeList } = useSelector(
    selectVehicleMakeProperties
  );

  const vehicleMakeOptions = useMemo(() => {
    return vehicleMakeList.map((el) => {
      return {
        value: el?.id,
        label: el?.name,
      };
    });
  }, [vehicleMakeList]);

  return (
    <FormGroup>
      <Label htmlFor="vehicleMake-field" className="form-label">
        Vehicle Make
      </Label>
      <Select
        name="vehicleMake"
        id="vehicleMake"
        value={validation.values.vehicleMake || {}}
        placeholder="Select vehicle make"
        onChange={(value) => {
          validation.setFieldValue("vehicleMake", value);
          validation.setFieldValue("vehicleModel", "");
          validation.setFieldError("vehicleMake", "");
        }}
        options={vehicleMakeOptions}
        onBlur={() => validation.setFieldTouched("vehicleMake", true)}
        className={
          validation.touched.vehicleMake && validation.errors.vehicleMake
            ? "is-invalid"
            : ""
        }
        styles={customSelectStyles}
      />
      <FormFeedback>{validation.errors.vehicleMake?.value}</FormFeedback>
    </FormGroup>
  );
};

VehicleMake.propTypes = {
  validation: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default VehicleMake;
