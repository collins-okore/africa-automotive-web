import React from "react";
import {
  Form,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Spinner,
} from "reactstrap";
import PropTypes from "prop-types";

const VehicleMakeForm = ({ validation, toggle, isUpdate, loading }) => {
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
          <Label htmlFor="id-field" className="form-label">
            Vehicle Make
          </Label>
          <Input
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter Vehicle Make"
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
            {isUpdate ? "Update Vehicle Make" : " Add Vehicle Make"}
          </button>
        </div>
      </div>
    </Form>
  );
};

VehicleMakeForm.propTypes = {
  validation: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

export default VehicleMakeForm;
