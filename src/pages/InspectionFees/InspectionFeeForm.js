import React, { useMemo } from "react";
import {
  Form,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Spinner,
  FormGroup,
} from "reactstrap";
import PropTypes from "prop-types";
import Select from "react-select";

const InspectionFeeForm = ({
  validation,
  toggle,
  isUpdate,
  loading,
  currencyList,
}) => {
  const currencyOptions = useMemo(() => {
    return currencyList.map((el) => {
      return {
        value: el?.id,
        label: el?.attributes?.name,
      };
    });
  }, [currencyList]);

  // Custom styles for react-select
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

  console.log("Validation Touched ", validation.touched);
  console.log("Validation Errors ", validation.errors);
  return (
    <Form
      className="tablelist-form"
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      <ModalBody>
        <input type="hidden" id="id-field" />

        <div className="mb-3">
          <FormGroup>
            <Label htmlFor="vehicleMake-field" className="form-label">
              Currency
            </Label>
            <Select
              name="currency"
              id="currency"
              value={validation.values.currency || {}}
              placeholder="Select vehicle make"
              onChange={(value) => {
                validation.setFieldValue("currency", value);
                // Reset the error when a value is selected
                validation.setFieldError("currency", "");
              }}
              options={currencyOptions}
              onBlur={() => validation.setFieldTouched("currency", true)}
              className={
                validation.touched.currency && validation.errors.currency
                  ? "is-invalid"
                  : ""
              }
              styles={customSelectStyles}
            />
            <FormFeedback>{validation.errors.currency?.value}</FormFeedback>
          </FormGroup>
        </div>

        <div className="mb-3">
          <Label htmlFor="id-field" className="form-label">
            Inspection Fee
          </Label>
          <Input
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter inspection fee"
            type="text"
            validate={{
              required: { value: true },
            }}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.name || ""}
            invalid={
              validation.touched.name && validation.errors.name ? true : false
            }
          />
          {validation.touched.name && validation.errors.name ? (
            <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
          ) : null}
        </div>
      </ModalBody>

      <div className="modal-footer">
        <div className="hstack gap-2 justify-content-end">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              toggle();
            }}
          >
            Close
          </button>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading && (
              <Spinner
                color="light"
                size="sm"
                style={{ marginRight: "8px", marginBottom: "-1px" }}
              ></Spinner>
            )}
            {isUpdate ? "Update Fee" : " Add Fee"}
          </button>
        </div>
      </div>
    </Form>
  );
};

InspectionFeeForm.propTypes = {
  validation: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  currencyList: PropTypes.array.isRequired,
};

export default InspectionFeeForm;
