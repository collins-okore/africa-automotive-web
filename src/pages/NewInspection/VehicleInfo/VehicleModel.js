import React, { useEffect, useMemo } from "react";
import { Label, FormFeedback, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";

import { getVehicleModels as onGetVehicleModels } from "../../../slices/thunks";

const VehicleModel = ({ validation, setLoading }) => {
  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      borderColor:
        validation.touched.vehicleModel && validation.errors.vehicleModel
          ? "red"
          : styles.borderColor,
      "&:hover": {
        borderColor:
          validation.touched.vehicleModel && validation.errors.vehicleModel
            ? "red"
            : styles["&:hover"].borderColor,
      },
    }),
  };

  const dispatch = useDispatch();
  // Fetch Vehicle Model List
  useEffect(() => {
    setLoading(true);
    if (validation.values?.vehicleMake?.value) {
      dispatch(
        onGetVehicleModels({
          filter: [
            {
              fieldName: "vehicleMakeId",
              value: validation.values?.vehicleMake?.value,
            },
          ],
          pagination: {
            page: 1,
            pageSize: 1000,
          },
        })
      ).then(() => {
        setLoading(false);
      });
    }
  }, [dispatch, setLoading, validation.values?.vehicleMake?.value]);

  const selectLayoutState = (state) => state.VehicleModel;
  const selectVehicleModelProperties = createSelector(
    selectLayoutState,
    (state) => ({
      vehicleModel: state.vehicleModel.data,
    })
  );

  const { vehicleModel: vehicleModelList } = useSelector(
    selectVehicleModelProperties
  );

  const vehicleModelOptions = useMemo(() => {
    return vehicleModelList.map((el) => {
      return {
        value: el?.id,
        label: el?.name,
      };
    });
  }, [vehicleModelList]);

  return (
    <FormGroup>
      <Label htmlFor="vehicleModel-field" className="form-label">
        Vehicle Model
      </Label>
      <Select
        name="vehicleModel"
        id="vehicleModel"
        value={validation.values.vehicleModel || { label: "", value: "" }}
        placeholder="Select vehicle model"
        onChange={(value) => {
          validation.setFieldValue("vehicleModel", value);
          // Reset the error when a value is selected
          validation.setFieldError("vehicleModel", "");
        }}
        options={vehicleModelOptions}
        onBlur={() => validation.setFieldTouched("vehicleModel", true)}
        className={
          validation.touched.vehicleModel && validation.errors.vehicleModel
            ? "is-invalid"
            : ""
        }
        styles={customSelectStyles}
      />
      <FormFeedback>{validation.errors.vehicleModel?.value}</FormFeedback>
    </FormGroup>
  );
};

VehicleModel.propTypes = {
  validation: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
};

export default VehicleModel;
