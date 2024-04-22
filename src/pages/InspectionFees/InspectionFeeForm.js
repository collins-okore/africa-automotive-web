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
  countryList,
}) => {
  const currencyOptions = useMemo(() => {
    return currencyList.map((el) => {
      return {
        value: el?.id,
        label: el?.name,
      };
    });
  }, [currencyList]);

  const countryOptions = useMemo(() => {
    return countryList.map((el) => {
      return {
        value: el?.id,
        label: el?.name,
      };
    });
  }, [countryList]);

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
            <Label htmlFor="currency-field" className="form-label">
              Currency
            </Label>
            <Select
              name="currency"
              id="currency"
              value={validation.values.currency || {}}
              placeholder="Select currency"
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
          <Label htmlFor="fee-field" className="form-label">
            Inspection Fee
          </Label>
          <Input
            name="amount"
            id="amount"
            className="form-control"
            placeholder="Enter inspection fee"
            type="text"
            validate={{
              required: { value: true },
            }}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.amount || ""}
            invalid={
              validation.touched.amount && validation.errors.amount
                ? true
                : false
            }
          />
          {validation.touched.amount && validation.errors.amount ? (
            <FormFeedback type="invalid">
              {validation.errors.amount}
            </FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <FormGroup>
            <Label htmlFor="country-field" className="form-label">
              Country
            </Label>
            <Select
              name="country"
              id="country"
              value={validation.values.country || {}}
              placeholder="Select country"
              onChange={(value) => {
                validation.setFieldValue("country", value);
                // Reset the error when a value is selected
                validation.setFieldError("country", "");
              }}
              options={countryOptions}
              onBlur={() => validation.setFieldTouched("country", true)}
              className={
                validation.touched.country && validation.errors.country
                  ? "is-invalid"
                  : ""
              }
              styles={customSelectStyles}
            />
            <FormFeedback>{validation.errors.country?.value}</FormFeedback>
          </FormGroup>
        </div>

        <div className="mb-3">
          <FormGroup>
            <Label>Is Default Inspection Fee?</Label>
            <FormGroup check className="d-flex">
              <Label check>
                <Input
                  type="radio"
                  name="default"
                  value="true"
                  checked={validation.values.default === "true"}
                  onChange={() => validation.setFieldValue("default", "true")}
                  onBlur={validation.handleBlur}
                />{" "}
                Yes
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="default"
                  value="false"
                  checked={validation.values.default === "false"}
                  onChange={() => validation.setFieldValue("default", "false")}
                  onBlur={validation.handleBlur}
                />{" "}
                No
              </Label>
            </FormGroup>
            {validation.touched.default && validation.errors.default ? (
              <FormFeedback>{validation.errors.default}</FormFeedback>
            ) : null}
          </FormGroup>
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
  countryList: PropTypes.array.isRequired,
};

export default InspectionFeeForm;
