import React from "react";
import {
  Form,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Spinner,
  Row,
  Col,
  UncontrolledAlert,
} from "reactstrap";
import PropTypes from "prop-types";
import PaymentModes from "./PaymentModes";
import CurrencyOptions from "./CurrencyOptions";
import PaymentTypes from "./PaymentTypes";
import Flatpickr from "react-flatpickr";
import Banks from "./Banks";

const PaymentForm = ({ validation, toggle, isUpdate, loading }) => {
  console.log("Payment Form Validation", validation.values);
  console.log("Payment Form Errors", validation.errors);

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

        {validation.errors?.chassisNumbersTotal && (
          <Row>
            <Col md={12} className="mb-3">
              <UncontrolledAlert
                color="danger"
                className="alert-border-left material-shadow mb-xl-0"
              >
                <i className="ri-error-warning-line me-3 align-middle fs-16"></i>
                <strong>Error</strong>- {validation.errors.chassisNumbersTotal}
              </UncontrolledAlert>
            </Col>
          </Row>
        )}

        {validation.errors?.chassisNumbersLength && (
          <Row>
            <Col md={12} className="mb-3">
              <UncontrolledAlert
                color="danger"
                className="alert-border-left material-shadow mb-xl-0"
              >
                <i className="ri-error-warning-line me-3 align-middle fs-16"></i>
                <strong>Error</strong>- {validation.errors.chassisNumbersLength}
              </UncontrolledAlert>
            </Col>
          </Row>
        )}

        <Row>
          <Col md={9} className="border-end">
            <PaymentModes validation={validation} />

            <>
              <Row className="gy-3">
                <PaymentTypes validation={validation} />

                <Banks validation={validation} />
              </Row>
              <Row className="gy-3">
                {validation.values.paymentMode === "CHEQUE_DEPOSIT" && (
                  <Col md={6} className="mb-3">
                    <Label htmlFor="id-field" className="form-label">
                      Cheque Number
                    </Label>
                    <Input
                      name="chequeNumber"
                      id="chequeNumber"
                      className="form-control"
                      placeholder="Enter cheque number"
                      type="text"
                      validate={{
                        required: { value: true },
                      }}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.chequeNumber || ""}
                      invalid={
                        validation.touched.chequeNumber &&
                        validation.errors.chequeNumber
                          ? true
                          : false
                      }
                    />
                    {validation.touched.chequeNumber &&
                    validation.errors.chequeNumber ? (
                      <FormFeedback type="invalid">
                        {validation.errors.chequeNumber}
                      </FormFeedback>
                    ) : null}
                  </Col>
                )}
                {(validation.values.paymentMode === "BANK_TRANSFER" ||
                  validation.values.paymentMode === "BANK_DEPOSIT" ||
                  validation.values.paymentMode === "MOBILE_MONEY") && (
                  <Col md={6} className="mb-3">
                    <Label htmlFor="id-field" className="form-label">
                      Reference Number
                    </Label>
                    <Input
                      name="referenceNumber"
                      id="referenceNumber"
                      className="form-control"
                      placeholder="Enter reference number"
                      type="text"
                      validate={{
                        required: { value: true },
                      }}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.referenceNumber || ""}
                      invalid={
                        validation.touched.referenceNumber &&
                        validation.errors.referenceNumber
                          ? true
                          : false
                      }
                    />
                    {validation.touched.referenceNumber &&
                    validation.errors.referenceNumber ? (
                      <FormFeedback type="invalid">
                        {validation.errors.referenceNumber}
                      </FormFeedback>
                    ) : null}
                  </Col>
                )}
                {validation.values.paymentMode === "INVOICED" && (
                  <Col md={6} className="mb-3">
                    <Label htmlFor="id-field" className="form-label">
                      Quotation/Invoice Number
                    </Label>
                    <Input
                      name="quotationOrInvoiceNo"
                      id="quotationOrInvoiceNo"
                      className="form-control"
                      placeholder="Enter cheque number"
                      type="text"
                      validate={{
                        required: { value: true },
                      }}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.quotationOrInvoiceNo || ""}
                      invalid={
                        validation.touched.quotationOrInvoiceNo &&
                        validation.errors.quotationOrInvoiceNo
                          ? true
                          : false
                      }
                    />
                    {validation.touched.quotationOrInvoiceNo &&
                    validation.errors.quotationOrInvoiceNo ? (
                      <FormFeedback type="invalid">
                        {validation.errors.quotationOrInvoiceNo}
                      </FormFeedback>
                    ) : null}
                  </Col>
                )}

                <CurrencyOptions validation={validation} />

                <Col md={3} className="mb-3">
                  <Label htmlFor="id-field" className="form-label">
                    Amount
                  </Label>
                  <Input
                    name="amount"
                    id="amount"
                    className="form-control"
                    placeholder="Enter amount"
                    type="number"
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
                </Col>
              </Row>
              <Row className="gy-3">
                <Col md={6} className="mb-3">
                  <Label htmlFor="id-field" className="form-label">
                    Paid By
                  </Label>
                  <Input
                    name="paidBy"
                    id="paidBy"
                    className="form-control"
                    placeholder="Enter paid by"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.paidBy || ""}
                    invalid={
                      validation.touched.paidBy && validation.errors.paidBy
                        ? true
                        : false
                    }
                  />
                  {validation.touched.paidBy && validation.errors.paidBy ? (
                    <FormFeedback type="invalid">
                      {validation.errors.paidBy}
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col md={6} className="mb-3">
                  <Label htmlFor="dateOfPayment-field" className="form-label">
                    Date Of Payment
                  </Label>
                  <Flatpickr
                    name="dateOfPayment"
                    id="dateOfPayment-field"
                    className="form-control"
                    placeholder="Select a date"
                    options={{
                      enableTime: false,
                      altInput: false,
                      altFormat: "d M, Y, G:i K",
                      dateFormat: "d M, Y, G:i K",
                    }}
                    onChange={(e) => {
                      validation.setFieldValue("dateOfPayment", e[0]);
                    }}
                    value={validation.values.dateOfPayment || ""}
                  />
                  {validation.touched.dateOfPayment &&
                  validation.errors.dateOfPayment ? (
                    <FormFeedback type="invalid">
                      {validation.errors.dateOfPayment}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
              <Row className="gy-3">
                <Col md={6} className="mb-3">
                  <Label htmlFor="id-field" className="form-label">
                    Tax Invoice Number
                  </Label>
                  <Input
                    // disabled
                    name="taxInvoiceNumber"
                    id="taxInvoiceNumber"
                    className="form-control"
                    placeholder="Enter tax invoice number"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.taxInvoiceNumber || ""}
                    invalid={
                      validation.touched.taxInvoiceNumber &&
                      validation.errors.taxInvoiceNumber
                        ? true
                        : false
                    }
                  />
                  {validation.touched.taxInvoiceNumber &&
                  validation.errors.taxInvoiceNumber ? (
                    <FormFeedback type="invalid">
                      {validation.errors.taxInvoiceNumber}
                    </FormFeedback>
                  ) : null}
                </Col>
                <Col md={6} className="mb-3">
                  <Label htmlFor="id-field" className="form-label">
                    Number of Vehicles
                  </Label>
                  <Input
                    // disabled
                    name="noOfVehciles"
                    id="noOfVehciles"
                    className="form-control"
                    placeholder=""
                    type="number"
                    disabled
                    validate={{
                      required: { value: true },
                    }}
                    value={validation.values.chassisNumbers.length}
                  />
                </Col>
              </Row>
              <Row className="gy-3">
                <Col md={12} className="mb-3">
                  <Label htmlFor="id-field" className="form-label">
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
                      validation.touched.narration &&
                      validation.errors.narration
                        ? true
                        : false
                    }
                  />
                  {validation.touched.narration &&
                  validation.errors.narration ? (
                    <FormFeedback type="invalid">
                      {validation.errors.narration}
                    </FormFeedback>
                  ) : null}
                </Col>
              </Row>
            </>
          </Col>
          <Col md={3}>
            <Label className="form-label">Chassis Numbers</Label>
            {validation.values.chassisNumbers.map((chassisNumber, index) => (
              <div className="row mb-3 gx-2" key={index}>
                <div className="col-10">
                  <Input
                    id={`chassisNumbers.${index}`}
                    name={`chassisNumbers.${index}`}
                    placeholder="Enter chassis number"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={chassisNumber}
                  />
                  {validation.touched.chassisNumbers &&
                  validation.touched.chassisNumbers[index] &&
                  validation.errors.chassisNumbers &&
                  validation.errors.chassisNumbers[index] ? (
                    <div>{validation.errors.chassisNumbers[index]}</div>
                  ) : null}
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      validation.setFieldValue("chassisNumbers", [
                        ...validation.values.chassisNumbers.slice(0, index),
                        ...validation.values.chassisNumbers.slice(index + 1),
                      ])
                    }
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
            <Row>
              <Col md={12}>
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  onClick={() =>
                    validation.setFieldValue("chassisNumbers", [
                      ...validation.values.chassisNumbers,
                      "",
                    ])
                  }
                >
                  Add Chassis Number
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
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
            {isUpdate ? "Update Payment" : " Add Payment"}
          </button>
        </div>
      </div>
    </Form>
  );
};

PaymentForm.propTypes = {
  validation: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

export default PaymentForm;
