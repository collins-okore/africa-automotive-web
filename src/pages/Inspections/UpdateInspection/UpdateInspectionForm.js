import React, { useState } from "react";
import {
  Form,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Spinner,
} from "reactstrap";
import PropTypes from "prop-types";

import VehicleMake from "../../NewInspection/VehicleInfo/VehicleMake";
import VehicleModel from "../../NewInspection/VehicleInfo/VehicleModel";
import VehicleBodyColor from "../../NewInspection/VehicleInfo/VehicleBodyColor";
import years from "../../../common/lib/listOfYears";
import VehicleBodyType from "../../NewInspection/VehicleInfo/VehicleBodyType";

const UpdateInspectionForm = ({ validation, toggle, isUpdate }) => {
  const [loading, setLoading] = useState(false);

  console.log("Form Errors", validation.errors);

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
          <VehicleMake
            validation={validation}
            loading={loading}
            setLoading={setLoading}
          />
        </div>

        <div className="mb-3">
          <VehicleModel
            validation={validation}
            loading={loading}
            setLoading={setLoading}
          />
        </div>

        <div className="row gy-4 mb-3">
          <div className="col-md-6">
            <VehicleBodyType validation={validation} />
          </div>
          <div className="col-md-6">
            <Label
              htmlFor="choices-publish-status-input"
              className="form-label"
            >
              Year of Manufacture
            </Label>
            <Input
              name="yearOfManufacture"
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              placeholder="Select year of manufacture"
              onChange={(e) => {
                validation.setFieldValue("yearOfManufacture", e.target.value);
              }}
              onBlur={() =>
                validation.setFieldTouched("yearOfManufacture", true)
              }
              value={validation.values.yearOfManufacture || ""}
            >
              <option value="" disabled selected>
                Select an option
              </option>
              {years.map((yearOfManufacture) => (
                <option value={yearOfManufacture} key={yearOfManufacture}>
                  {yearOfManufacture}
                </option>
              ))}
            </Input>
            {validation.touched.yearOfManufacture &&
            validation.errors.yearOfManufacture ? (
              <FormFeedback type="invalid">
                {validation.errors.yearOfManufacture}
              </FormFeedback>
            ) : null}
          </div>
        </div>

        <div className="row gy-4 mb-3">
          <div className="col-md-6">
            <Label
              htmlFor="choices-publish-status-input"
              className="form-label"
            >
              Year of First Registration
            </Label>
            <Input
              name="yearOfRegistration"
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              onChange={(e) => {
                validation.setFieldValue("yearOfRegistration", e.target.value);
              }}
              onBlur={() =>
                validation.setFieldTouched("yearOfRegistration", true)
              }
              value={validation.values.yearOfRegistration || ""}
            >
              <option value="" disabled selected>
                Select an option
              </option>
              {years.map((yearOfRegistration) => (
                <option value={yearOfRegistration} key={yearOfRegistration}>
                  {yearOfRegistration}
                </option>
              ))}
            </Input>
            {validation.touched.yearOfRegistration &&
            validation.errors.yearOfRegistration ? (
              <FormFeedback type="invalid">
                {validation.errors.yearOfRegistration}
              </FormFeedback>
            ) : null}
          </div>
          <div className="col-md-6">
            <Label htmlFor="customername-field" className="form-label">
              Chasis Number
            </Label>
            <Input
              name="chasisNumber"
              id="chasisNumber"
              className="form-control"
              placeholder="Enter chasis number"
              type="text"
              validate={{
                required: { value: true },
              }}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.chasisNumber || ""}
              invalid={
                validation.touched.chasisNumber &&
                validation.errors.chasisNumber
                  ? true
                  : false
              }
            />
            {validation.touched.chasisNumber &&
            validation.errors.chasisNumber ? (
              <FormFeedback type="invalid">
                {validation.errors.chasisNumber}
              </FormFeedback>
            ) : null}
          </div>
        </div>
        <div className="row gy-4 mb-3">
          <div className="col-md-6">
            <VehicleBodyColor validation={validation} />
          </div>
          <div className="col-md-6">
            <Label
              htmlFor="choices-publish-status-input"
              className="form-label"
            >
              Customs Reference Number
            </Label>
            <Input
              name="customsReferenceNumber"
              id="customsReferenceNumber"
              className="form-control"
              placeholder="Enter customs reference number"
              type="text"
              validate={{
                required: { value: true },
              }}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.customsReferenceNumber || ""}
              invalid={
                validation.touched.customsReferenceNumber &&
                validation.errors.customsReferenceNumber
                  ? true
                  : false
              }
            />
            {validation.touched.customsReferenceNumber &&
            validation.errors.customsReferenceNumber ? (
              <FormFeedback type="invalid">
                {validation.errors.customsReferenceNumber}
              </FormFeedback>
            ) : null}
          </div>
        </div>
        <div className="row gy-4 mb-3">
          <div className="col-md-8">
            <Label
              htmlFor="choices-publish-status-input"
              className="form-label"
            >
              Odometer
            </Label>
            <Input
              name="odometer"
              id="odometer"
              className="form-control"
              placeholder="Odometer"
              type="text"
              validate={{
                required: { value: true },
              }}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.odometer || ""}
              invalid={
                validation.touched.odometer && validation.errors.odometer
                  ? true
                  : false
              }
            />
            {validation.touched.odometer && validation.errors.odometer ? (
              <FormFeedback type="invalid">
                {validation.errors.odometer}
              </FormFeedback>
            ) : null}
          </div>
          <div className="col-md-4">
            <Label
              htmlFor="choices-publish-status-input"
              className="form-label"
            >
              {"Distance Unit"}
            </Label>
            <Input
              name="odometerDistanceUnit"
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              onChange={(e) => {
                validation.setFieldValue(
                  "odometerDistanceUnit",
                  e.target.value
                );
              }}
              onBlur={() =>
                validation.setFieldTouched("odometerDistanceUnit", true)
              }
              value={validation.values.odometerDistanceUnit || ""}
            >
              {["KM"].map((odometerDistanceUnit) => (
                <option value={odometerDistanceUnit} key={odometerDistanceUnit}>
                  {odometerDistanceUnit}
                </option>
              ))}
            </Input>
            {validation.touched.odometerDistanceUnit &&
            validation.errors.odometerDistanceUnit ? (
              <FormFeedback type="invalid">
                {validation.errors.odometerDistanceUnit}
              </FormFeedback>
            ) : null}
          </div>
        </div>

        <div className="row gy-4 mb-3">
          <div className="col-md-12">
            <Label
              htmlFor="choices-publish-status-input"
              className="form-label"
            >
              Odometer on EC
            </Label>
            <Input
              name="odometerOnEC"
              id="odometerOnEc"
              className="form-control"
              placeholder="Odometer On EC"
              type="text"
              validate={{
                required: { value: true },
              }}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.odometerOnEC || ""}
              invalid={
                validation.touched.odometerOnEC &&
                validation.errors.odometerOnEC
                  ? true
                  : false
              }
            />
            {validation.touched.odometerOnEC &&
            validation.errors.odometerOnEC ? (
              <FormFeedback type="invalid">
                {validation.errors.odometerOnEC}
              </FormFeedback>
            ) : null}
          </div>
        </div>

        <div className="row gy-4 mb-3">
          <div className="col-md-6">
            <Label htmlFor="customername-field" className="form-label">
              Engine Number
            </Label>
            <Input
              name="engineNumber"
              id="engineNumber"
              className="form-control"
              placeholder="Enter engineNumber"
              type="text"
              validate={{
                required: { value: true },
              }}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.engineNumber || ""}
              invalid={
                validation.touched.engineNumber &&
                validation.errors.engineNumber
                  ? true
                  : false
              }
            />
            {validation.touched.engineNumber &&
            validation.errors.engineNumber ? (
              <FormFeedback type="invalid">
                {validation.errors.engineNumber}
              </FormFeedback>
            ) : null}
          </div>
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
            {isUpdate ? "Update Inspection" : " Add Inspection"}
          </button>
        </div>
      </div>
    </Form>
  );
};

UpdateInspectionForm.propTypes = {
  validation: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
};

export default UpdateInspectionForm;
