import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addNewVehicleMake as onAddNewVehicleMake } from "../../../slices/thunks";
import PropTypes from "prop-types";
import { Form, Label, Input, Row } from "reactstrap";

const InspectionFormMuted = ({ inspection }) => {
  return (
    <Row>
      <Form
        className="tablelist-form"
        onSubmit={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        <div className="mb-3">
          <Label htmlFor="choices-publish-status-input" className="form-label">
            RWI Sheet
          </Label>
          <div>
            <button type="submit" className="btn btn-primary">
              View RWI Sheet
            </button>
          </div>
        </div>
        <div className="mb-3">
          <Label htmlFor="choices-publish-status-input" className="form-label">
            Dropbox Link
          </Label>
          <div>
            <button type="submit" className="btn btn-primary">
              View Dropbox Files
            </button>
          </div>
        </div>
        <div className="mb-3">
          <Label htmlFor="result-field" className="form-label">
            Inspection Result
          </Label>
          <div className="form-check mb-2">
            <Input
              disabled
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              defaultChecked
            />
            <Label className="form-check-label" htmlFor="flexRadioDefault1">
              Inspection Passed
            </Label>
          </div>
          <div className="form-check">
            <Input
              disabled
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
            />
            <Label className="form-check-label" htmlFor="flexRadioDefault2">
              Inspection Failed
            </Label>
          </div>
        </div>
        <div className="mb-3">
          <Label htmlFor="customername-field" className="form-label">
            Remarks
          </Label>
          <Input
            disabled
            name="remarks"
            id="remarks"
            className="form-control"
            placeholder="Enter remarks"
            type="textarea"
            validate={{
              required: { value: true },
            }}
            value={""}
          />
        </div>
      </Form>
    </Row>
  );
};

InspectionFormMuted.propTypes = {
  inspection: PropTypes.object,
};

export default InspectionFormMuted;
