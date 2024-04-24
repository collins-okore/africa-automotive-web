import React, { useMemo } from "react";
import { Label, FormFeedback, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import Select from "react-select";

const ChassisNumber = ({ validation, inspection }) => {
  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      borderColor:
        validation.touched.chassisNumber && validation.errors.chassisNumber
          ? "red"
          : styles.borderColor,
      "&:hover": {
        borderColor:
          validation.touched.chassisNumber && validation.errors.chassisNumber
            ? "red"
            : styles["&:hover"].borderColor,
      },
    }),
  };

  console.log("Chassis Number Validation Errors", validation.errors);
  console.log("Chassis Number Validation Values", validation.values);
  console.log("Chassis Number Inspection", inspection);

  const chassisNumberOptions = useMemo(() => {
    if (inspection?.payment?.VehiclePayment) {
      return inspection?.payment?.VehiclePayment.filter((el) => {
        // filter out vehicles that have already been added
        if (
          inspection?.vehicles?.find((vehicle) => {
            console.log("Vehicle", vehicle.chassisNumber);
            console.log("El", el.chassisNumber);
            return vehicle.chassisNumber.value === el.chassisNumber;
          })
        ) {
          console.log("Exists", el.chassisNumber);
          return false;
        } else {
          console.log("Does not exist", el.chassisNumber);
          return true;
        }
      }).map((el) => {
        return {
          value: el?.chassisNumber,
          label: el?.chassisNumber,
        };
      });
    }
  }, [inspection?.payment, inspection?.vehicles]);

  return (
    <FormGroup>
      <Label htmlFor="chassisNumber-field" className="form-label">
        Chassis Number
      </Label>
      <Select
        name="chassisNumber"
        id="chassisNumber"
        value={validation.values.chassisNumber || { label: "", value: "" }}
        placeholder="Select chassis number"
        onChange={(value) => {
          validation.setFieldValue("chassisNumber", value);
          // Reset the error when a value is selected
          validation.setFieldError("chassisNumber", "");
        }}
        options={chassisNumberOptions}
        onBlur={() => validation.setFieldTouched("chassisNumber", true)}
        className={
          validation.touched.chassisNumber && validation.errors.chassisNumber
            ? "is-invalid"
            : ""
        }
        styles={customSelectStyles}
      />
      <FormFeedback>{validation.errors.chassisNumber?.value}</FormFeedback>
    </FormGroup>
  );
};

ChassisNumber.propTypes = {
  validation: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  setLoading: PropTypes.func,
  inspection: PropTypes.object,
};

export default ChassisNumber;
