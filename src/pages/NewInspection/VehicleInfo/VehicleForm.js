import React, { useMemo, useState } from "react";
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
import Flatpickr from "react-flatpickr";

const VehicleForm = ({ validation, toggle, isUpdate, loading }) => {
  const vehicleMakeOptions = useMemo(() => {
    return [].map((el) => {
      return {
        value: el?.id,
        label: el?.attributes?.name,
      };
    });
  }, []);

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

  const dateFormat = () => {
    let d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    let h = d.getHours() % 12 || 12;
    let ampm = d.getHours() < 12 ? "AM" : "PM";
    return (
      d.getDate() +
      " " +
      months[d.getMonth()] +
      ", " +
      d.getFullYear() +
      ", " +
      h +
      ":" +
      d.getMinutes() +
      " " +
      ampm
    ).toString();
  };

  const [date, setDate] = useState(dateFormat());

  console.log("PaymentInfo -> date", date);

  const dateformate = (e) => {
    const dateString = e.toString().split(" ");
    let time = dateString[4];
    let H = +time.substr(0, 2);
    let h = H % 12 || 12;
    h = h <= 9 ? (h = "0" + h) : h;
    let ampm = H < 12 ? "AM" : "PM";
    time = h + time.substr(2, 3) + " " + ampm;

    const date = dateString[2] + " " + dateString[1] + ", " + dateString[3];
    const orderDate = (date + ", " + time).toString();
    setDate(orderDate);
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
                // Reset the error when a value is selected
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
        </div>

        <div className="mb-3">
          <FormGroup>
            <Label htmlFor="vehicleModel-field" className="form-label">
              Vehicle Model
            </Label>
            <Select
              name="vehicleModel"
              id="vehicleModel"
              value={validation.values.vehicleModel || {}}
              placeholder="Select vehicle model"
              onChange={(value) => {
                validation.setFieldValue("vehicleModel", value);
                // Reset the error when a value is selected
                validation.setFieldError("vehicleModel", "");
              }}
              options={vehicleMakeOptions}
              onBlur={() => validation.setFieldTouched("vehicleModel", true)}
              className={
                validation.touched.vehicleModel &&
                validation.errors.vehicleModel
                  ? "is-invalid"
                  : ""
              }
              styles={customSelectStyles}
            />
            <FormFeedback>{validation.errors.vehicleModel?.value}</FormFeedback>
          </FormGroup>
        </div>

        <div className="mb-3">
          <Label htmlFor="customername-field" className="form-label">
            Code
          </Label>
          <Input
            name="code"
            id="code"
            className="form-control"
            placeholder="Enter Code"
            type="text"
            validate={{
              required: { value: true },
            }}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.code || ""}
            invalid={
              validation.touched.code && validation.errors.code ? true : false
            }
          />
          {validation.touched.code && validation.errors.code ? (
            <FormFeedback type="invalid">{validation.errors.code}</FormFeedback>
          ) : null}
        </div>
        <div className="row gy-4 mb-3">
          <div className="col-md-6">
            <Label
              htmlFor="choices-publish-status-input"
              className="form-label"
            >
              Body Type
            </Label>
            <Input
              name="bodyType"
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.bodyType || ""}
            >
              {[].map((bodyType) => (
                <option value={bodyType.value} key={bodyType.value}>
                  {bodyType.label}
                </option>
              ))}
            </Input>
            {validation.touched.bodyType && validation.errors.bodyType ? (
              <FormFeedback type="invalid">
                {validation.errors.bodyType}
              </FormFeedback>
            ) : null}
          </div>
          <div className="col-md-6">
            <Label
              htmlFor="choices-publish-status-input"
              className="form-label"
            >
              Year of Manufacture
            </Label>
            <Input
              name="bodyType"
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.yearOfManufacture || ""}
            >
              {[].map((yearOfManufacture) => (
                <option
                  value={yearOfManufacture.value}
                  key={yearOfManufacture.value}
                >
                  {yearOfManufacture.label}
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
            <Label htmlFor="dateOfPayment-field" className="form-label">
              Year of First Registration
            </Label>
            <Flatpickr
              name="yearOfFirstRegistration"
              id="yearOfFirstRegistration-field"
              className="form-control"
              placeholder="Select a date"
              options={{
                enableTime: true,
                altInput: true,
                altFormat: "d M, Y, G:i K",
                dateFormat: "d M, Y, G:i K",
              }}
              onChange={(e) => dateformate(e)}
              value={validation.values.yearOfFirstRegistration || ""}
            />
            {validation.touched.yearOfFirstRegistration &&
            validation.errors.yearOfFirstRegistration ? (
              <FormFeedback type="invalid">
                {validation.errors.yearOfFirstRegistration}
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
            <Label
              htmlFor="choices-publish-status-input"
              className="form-label"
            >
              Color
            </Label>
            <Input
              name="color"
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.color || ""}
            >
              {[].map((color) => (
                <option value={color.value} key={color.value}>
                  {color.label}
                </option>
              ))}
            </Input>
            {validation.touched.color && validation.errors.color ? (
              <FormFeedback type="invalid">
                {validation.errors.color}
              </FormFeedback>
            ) : null}
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
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.customsReferenceNumber || ""}
            >
              {[].map((customsReferenceNumber) => (
                <option
                  value={customsReferenceNumber.value}
                  key={customsReferenceNumber.value}
                >
                  {customsReferenceNumber.label}
                </option>
              ))}
            </Input>
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
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.odometer || ""}
            >
              {[].map((odometer) => (
                <option value={odometer.value} key={odometer.value}>
                  {odometer.label}
                </option>
              ))}
            </Input>
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
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.odometerDistanceUnit || ""}
            >
              {[].map((odometerDistanceUnit) => (
                <option
                  value={odometerDistanceUnit.value}
                  key={odometerDistanceUnit.value}
                >
                  {odometerDistanceUnit.label}
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
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.odometerOnEC || ""}
            >
              {[].map((odometerOnEC) => (
                <option value={odometerOnEC.value} key={odometerOnEC.value}>
                  {odometerOnEC.label}
                </option>
              ))}
            </Input>
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
          <div className="col-md-6">
            <Label
              htmlFor="choices-publish-status-input"
              className="form-label"
            >
              Country of Origin
            </Label>
            <Input
              name="countryOfOrigin"
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.countryOfOrigin || ""}
            >
              {[].map((countryOfOrigin) => (
                <option
                  value={countryOfOrigin.value}
                  key={countryOfOrigin.value}
                >
                  {countryOfOrigin.label}
                </option>
              ))}
            </Input>
            {validation.touched.countryOfOrigin &&
            validation.errors.countryOfOrigin ? (
              <FormFeedback type="invalid">
                {validation.errors.countryOfOrigin}
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
              Country of Origin
            </Label>
            <Input
              name="fuelType"
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.fuelType || ""}
            >
              {[].map((fuelType) => (
                <option value={fuelType.value} key={fuelType.value}>
                  {fuelType.label}
                </option>
              ))}
            </Input>
            {validation.touched.fuelType && validation.errors.fuelType ? (
              <FormFeedback type="invalid">
                {validation.errors.fuelType}
              </FormFeedback>
            ) : null}
          </div>
          <div className="col-md-6">
            <Label htmlFor="customername-field" className="form-label">
              Fuel Type
            </Label>
            <Input
              name="fuelLimit"
              id="fuelLimit"
              className="form-control"
              placeholder="Enter fuelLimit"
              type="text"
              validate={{
                required: { value: true },
              }}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.fuelLimit || ""}
              invalid={
                validation.touched.fuelLimit && validation.errors.fuelLimit
                  ? true
                  : false
              }
            />
            {validation.touched.fuelLimit && validation.errors.fuelLimit ? (
              <FormFeedback type="invalid">
                {validation.errors.fuelLimit}
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
              Transmission
            </Label>
            <Input
              name="bodyType"
              type="select"
              className="form-select"
              id="choices-publish-body-input"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.yearOfManufacture || ""}
            >
              {[].map((yearOfManufacture) => (
                <option
                  value={yearOfManufacture.value}
                  key={yearOfManufacture.value}
                >
                  {yearOfManufacture.label}
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

          <div className="col-md-6">
            <Label htmlFor="dateOfPayment-field" className="form-label">
              Inspection Date
            </Label>
            <Flatpickr
              name="inspectionDate"
              id="inspectionDate-field"
              className="form-control"
              placeholder="Select a date"
              options={{
                enableTime: true,
                altInput: true,
                altFormat: "d M, Y, G:i K",
                dateFormat: "d M, Y, G:i K",
              }}
              onChange={(e) => dateformate(e)}
              value={validation.values.inspectionDate || ""}
            />
            {validation.touched.inspectionDate &&
            validation.errors.inspectionDate ? (
              <FormFeedback type="invalid">
                {validation.errors.inspectionDate}
              </FormFeedback>
            ) : null}
          </div>
        </div>

        <div className="mb-3">
          <Label htmlFor="customername-field" className="form-label">
            Narration
          </Label>
          <Input
            name="narration"
            id="narration"
            className="form-control"
            placeholder="Enter narration"
            type="textarea"
            validate={{
              required: { value: true },
            }}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.narration || ""}
            invalid={
              validation.touched.narration && validation.errors.narration
                ? true
                : false
            }
          />
          {validation.touched.narration && validation.errors.narration ? (
            <FormFeedback type="invalid">
              {validation.errors.narration}
            </FormFeedback>
          ) : null}
        </div>

        {/* <div className="mb-3">
            <Label htmlFor="productname-field" className="form-label">
              Product
            </Label>

            <Input
              name="product"
              type="select"
              className="form-select"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.product || ""}
              required
            >
              {[].map((item, key) => (
                <React.Fragment key={key}>
                  {item.options.map((item, key) => (
                    <option value={item.value} key={key}>
                      {item.label}
                    </option>
                  ))}
                </React.Fragment>
              ))}
            </Input>
            {validation.touched.product && validation.errors.product ? (
              <FormFeedback type="invalid">
                {validation.errors.product}
              </FormFeedback>
            ) : null}
          </div> */}
        {/* <div className="mb-3">
            <Label htmlFor="date-field" className="form-label">
              Order Date
            </Label>

            <Flatpickr
              name="orderDate"
              className="form-control"
              id="datepicker-publish-input"
              placeholder="Select a date"
              options={{
                enableTime: true,
                altInput: true,
                altFormat: "d M, Y, G:i K",
                dateFormat: "d M, Y, G:i K",
              }}
              onChange={(e) => dateformate(e)}
              value={validation.values.orderDate || ""}
            />

            {validation.touched.orderDate && validation.errors.orderDate ? (
              <FormFeedback type="invalid">
                {validation.errors.orderDate}
              </FormFeedback>
            ) : null}
          </div> */}
        <div className="row gy-4 mb-3">
          {/* <div className="col-md-6">
              <div>
                <Label htmlFor="amount-field" className="form-label">
                  Amount
                </Label>
                <Input
                  name="amount"
                  type="text"
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
            </div>
            <div className="col-md-6">
              <div>
                <Label htmlFor="payment-field" className="form-label">
                  Payment Method
                </Label>

                <Input
                  name="payment"
                  type="select"
                  className="form-select"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.payment || ""}
                >
                  {[].map((item, key) => (
                    <React.Fragment key={key}>
                      {item.options.map((item, key) => (
                        <option value={item.value} key={key}>
                          {item.label}
                        </option>
                      ))}
                    </React.Fragment>
                  ))}
                </Input>
                {validation.touched.payment && validation.errors.payment ? (
                  <FormFeedback type="invalid">
                    {validation.errors.payment}
                  </FormFeedback>
                ) : null}
              </div>
            </div> */}
        </div>
        {/* <div>
            <Label htmlFor="delivered-status" className="form-label">
              Delivery Status
            </Label>

            <Input
              name="status"
              type="select"
              className="form-select"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.status || ""}
            >
              {[].map((item, key) => (
                <React.Fragment key={key}>
                  {item.options.map((item, key) => (
                    <option value={item.value} key={key}>
                      {item.label}
                    </option>
                  ))}
                </React.Fragment>
              ))}
            </Input>
            {validation.touched.status && validation.errors.status ? (
              <FormFeedback type="invalid">
                {validation.errors.status}
              </FormFeedback>
            ) : null}
          </div> */}
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
            {isUpdate ? "Update Vehicle" : " Add Vehicle"}
          </button>
        </div>
      </div>
    </Form>
  );
};

VehicleForm.propTypes = {
  validation: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

export default VehicleForm;
