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
} from "reactstrap";
import PropTypes from "prop-types";
import PaymentModes from "./PaymentModes";
import CurrencyOptions from "./CurrencyOptions";
import PaymentTypes from "./PaymentTypes";
import Flatpickr from "react-flatpickr";

const PaymentForm = ({ validation, toggle, isUpdate, loading }) => {
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

        <PaymentModes validation={validation} />

        <>
          <Row className="gy-3">
            <PaymentTypes validation={validation} />

            <Col md={6} className="mb-3">
              <Label htmlFor="id-field" className="form-label">
                Bank/Telco Name
              </Label>
              <Input
                name="bankName"
                id="bankName"
                className="form-control"
                placeholder="Enter bank name"
                type="text"
                validate={{
                  required: { value: true },
                }}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.bankName || ""}
                invalid={
                  validation.touched.bankName && validation.errors.bankName
                    ? true
                    : false
                }
              />
              {validation.touched.bankName && validation.errors.bankName ? (
                <FormFeedback type="invalid">
                  {validation.errors.bankName}
                </FormFeedback>
              ) : null}
            </Col>
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
                  name="quoationOrInvoiceNo"
                  id="quoationOrInvoiceNo"
                  className="form-control"
                  placeholder="Enter cheque number"
                  type="text"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.quoationOrInvoiceNo || ""}
                  invalid={
                    validation.touched.quoationOrInvoiceNo &&
                    validation.errors.quoationOrInvoiceNo
                      ? true
                      : false
                  }
                />
                {validation.touched.quoationOrInvoiceNo &&
                validation.errors.quoationOrInvoiceNo ? (
                  <FormFeedback type="invalid">
                    {validation.errors.quoationOrInvoiceNo}
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
            </Col>
          </Row>
        </>
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
