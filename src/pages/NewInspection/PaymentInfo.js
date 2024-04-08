import React, { useEffect, useState, useMemo } from "react";

import {
  Row,
  Col,
  Card,
  TabPane,
  Label,
  Input,
  Form,
  FormFeedback,
} from "reactstrap";
import PropTypes from "prop-types";
import { getPayments as onGetPayments } from "../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import { formatDate } from "../../common/lib/dateFns";

const PaymentInfo = ({ toggleTab, activeTab, updateInspection }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      payment: { label: "", value: "" },
    },
    validationSchema: Yup.object({
      // payment: Yup.object().required("Please select payment"),
      payment: Yup.object().shape({
        value: Yup.number().required("Please select payment"),
      }),
      // bankName: Yup.string().when("paymentMode", {
      //   is: (paymentMode) => paymentMode === "BANK_DEPOSIT",
      //   then: Yup.string().required("Please enter bank name"),
      // }),
      // amount: Yup.number().required("Please enter amount"),
      // chequeNumber: Yup.string().when("paymentMode", {
      //   is: (paymentMode) => paymentMode === "CHEQUE_DEPOSIT",
      //   then: Yup.string().required("Please enter cheque number"),
      // }),
      // referenceNumber: Yup.string().when("paymentMode", {
      //   is: (paymentMode) =>
      //     paymentMode === "BANK_TRANSFER" ||
      //     paymentMode === "BANK_DEPOSIT" ||
      //     paymentMode === "MOBILE_MONEY",
      //   then: Yup.string().required("Please enter reference number"),
      // }),
      // dateOfPayment: Yup.string().required("Please enter date of payment"),
      // quotationOrInvoiceNumber: Yup.string().when("paymentMode", {
      //   is: (paymentMode) => paymentMode === "INVOICED",
      //   then: Yup.string().required("Please enter quotation/invoice number"),
      // }),
      // inspectionNumber: Yup.string().required("Please enter inspection number"),
      // currency: Yup.object().required("Please select currency"),
      // narration: Yup.string().required("Please enter narration"),
      // paidBy: Yup.string().required("Please enter paid by"),
    }),
    onSubmit: (values) => {
      const payment = paymentsList.find(
        (el) => el.id === values["payment"]?.value
      );
      if (!payment) {
        return;
      }
      updateInspection({
        payment: { paymentId: values["payment"]?.value, ...payment },
      });
      toggleTab(3);
    },
  });

  const [selectedPayment, setSelectedPayment] = useState({
    id: "",
    currency: "",
    amount: "",
    paidBy: "",
    dateOfPayment: "",
    bankName: "",
    chequeNumber: "",
    referenceNumber: "",
    quoationOrInvoiceNo: "",
    taxInvoiceNumber: "",
    inspectionNumber: "",
    narration: "",
    paymentType: "",
    paymentMode: "",
  });

  useEffect(() => {
    setLoading(true);
    dispatch(
      onGetPayments({
        pagination: {
          page: 1,
          pageSize: 1000,
        },
        filter: [{ fieldName: "booked", value: false }],
      })
    ).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const selectLayoutState = (state) => state.Payment;
  const selectPaymentProperties = createSelector(
    selectLayoutState,
    (state) => ({
      payments: state.payment.data,
    })
  );

  const { payments: paymentsList } = useSelector(selectPaymentProperties);

  const paymentOptions = useMemo(() => {
    return paymentsList.map((el) => {
      console.log("Payment el ", el);
      const paymentDate = formatDate(new Date(el?.dateOfPayment));
      return {
        value: el?.id,
        label: `${el?.currency?.name} ${el?.amount} -  Paid By: ${el?.paidBy} - ${paymentDate} - ${el.chasisNumber}`,
      };
    });
  }, [paymentsList]);

  // Custom styles for react-select
  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      borderColor:
        validation.touched.payment && validation.errors.payment
          ? "red"
          : styles.borderColor,
      "&:hover": {
        borderColor:
          validation.touched.payment && validation.errors.payment
            ? "red"
            : styles["&:hover"].borderColor,
      },
    }),
  };

  const populateSelectedClient = (paymentId) => {
    const payment = paymentsList.find((el) => el.id === paymentId);
    setSelectedPayment({
      id: payment?.id,
      currency: payment?.currency?.name,
      amount: payment?.amount,
      paidBy: payment?.paidBy,
      dateOfPayment: payment?.dateOfPayment,
      bankName: payment?.bankName,
      chequeNumber: payment?.chequeNumber,
      referenceNumber: payment?.referenceNumber,
      quoationOrInvoiceNo: payment?.quoationOrInvoiceNo,
      taxInvoiceNumber: payment?.taxInvoiceNumber,
      inspectionNumber: payment?.inspectionNumber,
      narration: payment?.narration,
      paymentType: payment?.paymentType?.name,
      paymentMode: payment?.paymentMode?.code,
      chasisNumber: payment?.chasisNumber,
    });
  };

  return (
    <TabPane tabId={2}>
      <Form
        className="tablelist-form"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <div>
          <h5 className="mb-1">Payment Selection</h5>
          <p className="text-muted mb-4">
            Please select and enter payment information
          </p>
        </div>

        <div className="collapse show" id="paymentmethodCollapse">
          <Row className="align-items-end">
            <Col sm={6}>
              <div className="mb-3">
                <Label htmlFor="payments-field" className="form-label">
                  Select exisitng payment
                </Label>
                <Select
                  name="payment"
                  id="payment"
                  value={validation.values.payment || {}}
                  placeholder="Select payment"
                  onChange={(value) => {
                    validation.setFieldValue("payment", value);
                    // Reset the error when a value is selected
                    validation.setFieldError("payment", "");
                    populateSelectedClient(value?.value);
                  }}
                  options={paymentOptions}
                  onBlur={() => validation.setFieldTouched("payment", true)}
                  className={
                    validation.touched.payment && validation.errors.payment
                      ? "is-invalid"
                      : ""
                  }
                  styles={customSelectStyles}
                />
                <FormFeedback>{validation.errors.payment?.value}</FormFeedback>
              </div>
            </Col>
          </Row>
          <Card className="p-4 border shadow-none mb-0 mt-4">
            <Row className="gy-3">
              <Col md={6} className="mb-3">
                <Label htmlFor="id-field" className="form-label">
                  Type of Payment
                </Label>
                <Input
                  name="paymentType"
                  id="paymentType"
                  className="form-control"
                  placeholder="Enter payment type"
                  type="text"
                  value={selectedPayment.paymentType || ""}
                  disabled
                />
              </Col>

              <Col md={3} className="mb-3">
                <Label htmlFor="id-field" className="form-label">
                  Payment Mode
                </Label>
                <Input
                  name="paymentMode"
                  id="paymentMode"
                  className="form-control"
                  placeholder="Enter payment mode"
                  type="text"
                  value={selectedPayment.paymentMode || ""}
                  disabled
                />
              </Col>
              <Col md={3} className="mb-3">
                <Label htmlFor="id-field" className="form-label">
                  Bank/Telco Name
                </Label>
                <Input
                  name="bankName"
                  id="bankName"
                  className="form-control"
                  placeholder="Enter bank name"
                  type="text"
                  value={selectedPayment.bankName || ""}
                  disabled
                />
              </Col>
            </Row>
            <Row className="gy-3">
              {selectedPayment.paymentMode === "CHEQUE_DEPOSIT" && (
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
                    value={selectedPayment.chequeNumber || ""}
                  />
                </Col>
              )}
              {(selectedPayment.paymentMode === "BANK_TRANSFER" ||
                selectedPayment.paymentMode === "BANK_DEPOSIT" ||
                selectedPayment.paymentMode === "MOBILE_MONEY") && (
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
                    value={selectedPayment.referenceNumber || ""}
                    disabled
                  />
                </Col>
              )}
              {selectedPayment.paymentMode === "INVOICED" && (
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
                    value={selectedPayment.quoationOrInvoiceNo || ""}
                    disabled
                  />
                </Col>
              )}

              {/* Currency Options */}
              <Col md={3} className="mb-3">
                <Label htmlFor="id-field" className="form-label">
                  Currency Paid In
                </Label>
                <Input
                  name="currency"
                  id="currency"
                  className="form-control"
                  placeholder="Enter cheque number"
                  type="text"
                  value={selectedPayment.currency || ""}
                  disabled
                />
              </Col>

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
                  value={selectedPayment.amount || ""}
                  disabled
                />
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
                  value={selectedPayment.paidBy || ""}
                  disabled
                />
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
                  value={selectedPayment.dateOfPayment || ""}
                  disabled
                />
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
                  value={selectedPayment.taxInvoiceNumber || ""}
                  disabled
                />
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
                  value={selectedPayment.chasisNumber || ""}
                  disabled
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
                  value={selectedPayment.narration || ""}
                  disabled
                />
              </Col>
            </Row>
          </Card>
          <div className="text-muted mt-2 fst-italic">
            <i data-feather="lock" className="text-muted icon-xs"></i> Your
            transaction is secured with SSL encryption
          </div>
        </div>

        <div className="d-flex align-items-start gap-3 mt-4">
          <button
            type="button"
            className="btn btn-light btn-label previestab"
            onClick={() => {
              toggleTab(activeTab - 1);
            }}
          >
            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
            Back to Client Info
          </button>
          <button
            type="submit"
            className="btn btn-secondary btn-label right ms-auto nexttab"
            onClick={() => {
              // toggleTab(activeTab + 1);
            }}
          >
            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
            Proceed to Vehicle Info
          </button>
        </div>
      </Form>
    </TabPane>
  );
};

PaymentInfo.propTypes = {
  toggleTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
  updateInspection: PropTypes.func.isRequired,
};

export default PaymentInfo;
