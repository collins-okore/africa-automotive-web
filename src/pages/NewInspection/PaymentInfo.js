import React, { useEffect, useState } from "react";

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
import {
  getPaymentModes as onGetPaymentModes,
  getCurrencies as onGetCurrencies,
  getPaymentTypes as onGetPaymentTypes,
} from "../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import * as Yup from "yup";
import { useFormik } from "formik";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

const PaymentInfo = ({ toggleTab, activeTab, updateInspection }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  console.log("PaymentInfo -> loading", loading);

  // Fetch Payment Modes
  useEffect(() => {
    setLoading(true);
    dispatch(
      onGetPaymentModes({
        sort: ["id:asc"],
      })
    ).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  // Get Payment Modes from store
  const selectPaymentModes = createSelector(
    (state) => state.PaymentMode,
    (paymentMode) => ({
      paymentModes: paymentMode.paymentModes.data,
    })
  );
  const { paymentModes } = useSelector(selectPaymentModes);

  // Convert Payment Modes to Select Options
  const paymentModesOptions = paymentModes.map((paymentMode) => ({
    value: paymentMode.id,
    label: paymentMode?.attributes?.name,
    code: paymentMode?.attributes?.code,
  }));

  // Fetch Payment Types
  useEffect(() => {
    setLoading(true);
    dispatch(onGetPaymentTypes()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  // Get Payment Types from store
  const selectPaymentTypes = createSelector(
    (state) => state.PaymentType,
    (paymentType) => ({
      paymentTypes: paymentType.paymentTypes.data,
    })
  );

  const { paymentTypes } = useSelector(selectPaymentTypes);

  // Convert Payment Types to Select Options
  const paymentTypesOptions = paymentTypes.map((paymentType) => ({
    value: paymentType.code,
    label: paymentType?.attributes?.name,
    code: paymentType?.attributes?.code,
  }));

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      paymentMode: "MOBILE_MONEY",
      paymentType: "PROCEED_TO_INSPECT",
      bankName: "",
      amount: "",
      chequeNumber: "",
      referenceNumber: "",
      dateOfPayment: "",
      quotationOrInvoiceNumber: "",
      inspectionNumber: "",
      currency: "",
      narration: "",
      paidBy: "",
    },
    validationSchema: Yup.object({
      paymentMode: Yup.string().required("Please select payment mode"),
      paymentType: Yup.string().required("Please select payment type"),
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
      console.log("PaymentInfo -> submitted values", values);
      const paymentMode = paymentModes.find(
        (paymentMode) => paymentMode.attributes.code === values["paymentMode"]
      );
      if (!paymentMode) return;

      // fetch payment type from payment type list
      const paymentType = paymentTypes.find(
        (paymentType) => paymentType.attributes.code === values["paymentType"]
      );
      if (!paymentType) return;

      updateInspection({
        paymentInfo: {
          paymentMode: {
            id: paymentMode.id,
            name: paymentMode.attributes.name,
            code: paymentMode.attributes.code,
          },
          paymentType: paymentType.id,
          bankName: values["bankName"],
          amount: values["amount"],
          chequeNumber: values["chequeNumber"],
          referenceNumber: values["referenceNumber"],
          dateOfPayment: values["dateOfPayment"],
          quotationOrInvoiceNumber: values["quotationOrInvoiceNumber"],
          inspectionNumber: values["inspectionNumber"],
          currency: values["currency"],
          narration: values["narration"],
          paidBy: values["paidBy"],
        },
      });

      toggleTab(3);
    },
  });

  console.log("PaymentInfo -> validation", validation.values);

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

  // Dispatch action to get currency list then select from store
  useEffect(() => {
    dispatch(onGetCurrencies());
  }, [dispatch]);

  // Get currency list from store
  const selectCurrencies = createSelector(
    (state) => state.Currency,
    (currency) => ({
      currencies: currency.currency.data,
    })
  );
  const { currencies: currencyList } = useSelector(selectCurrencies);
  console.log("PaymentInfo -> currencies", currencyList);

  // Convert currency list to select options
  const currencyOptions = currencyList.map((currency) => ({
    value: currency.id,
    label: currency.attributes.name,
  }));

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

  console.log("Errors", validation.errors);

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

        <Row className="g-4">
          {
            // Loop through payment modes and display them
            paymentModesOptions.map((paymentMode) => {
              let icon = "";
              switch (paymentMode.code) {
                case "MOBILE_MONEY":
                  icon = "ri-cellphone-fill";
                  break;
                case "BANK_DEPOSIT":
                  icon = "ri-bank-card-fill";
                  break;
                case "BANK_TRANSFER":
                  icon = "ri-bank-card-fill";
                  break;
                case "CHEQUE_DEPOSIT":
                  icon = "ri-money-dollar-box-fill";
                  break;
                case "CASH":
                  icon = "ri-hand-coin-fill";
                  break;
                default:
                  icon = "ri-hand-coin-fill";
                  break;
              }
              return (
                <Col lg={2} sm={6} key={paymentMode.value}>
                  <div>
                    <div className="form-check card-radio">
                      <Input
                        id={`paymentMethod${paymentMode.value}`}
                        name="paymentMode"
                        type="radio"
                        className="form-check-input"
                        onChange={() => {
                          validation.setFieldValue(
                            "paymentMode",
                            paymentMode.code
                          );
                          validation.setFieldError("paymentMode", "");
                        }}
                        defaultChecked={
                          validation.values.paymentMode === paymentMode.code
                        }
                      />
                      <Label
                        className="form-check-label"
                        htmlFor={`paymentMethod${paymentMode.value}`}
                      >
                        <span className="fs-16 text-muted me-2">
                          <i className={`${icon} align-bottom`}></i>
                        </span>
                        <span className="fs-14 text-wrap">
                          {paymentMode.label}
                        </span>
                      </Label>
                    </div>
                  </div>
                </Col>
              );
            })
          }
        </Row>

        <div className="collapse show" id="paymentmethodCollapse">
          <Card className="p-4 border shadow-none mb-0 mt-4">
            <Row className="gy-3">
              <Col md={6} className="mb-3">
                <Label
                  htmlFor="choices-publish-status-input"
                  className="form-label"
                >
                  Type of Payment
                </Label>
                <Input
                  name="paymentType"
                  type="select"
                  className="form-select"
                  id="choices-publish-paymentType-input"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.paymentType || ""}
                >
                  {
                    // Loop through payment types and display them
                    paymentTypesOptions.map((paymentType) => (
                      <option value={paymentType.value} key={paymentType.value}>
                        {paymentType.label}
                      </option>
                    ))
                  }
                </Input>
                {validation.touched.paymentType &&
                validation.errors.paymentType ? (
                  <FormFeedback type="invalid">
                    {validation.errors.paymentType}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col md={6} className="mb-3">
                <Label htmlFor="id-field" className="form-label">
                  Bank Name
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
              <Col md={3} className="mb-3">
                <Label htmlFor="currency-field" className="form-label">
                  Currency Paid In
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
                    enableTime: true,
                    altInput: true,
                    altFormat: "d M, Y, G:i K",
                    dateFormat: "d M, Y, G:i K",
                  }}
                  onChange={(e) => dateformate(e)}
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
                  disabled
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
                  Inspection Number
                </Label>
                <Input
                  name="inspectionNumber"
                  id="inspectionNumber"
                  className="form-control"
                  placeholder="Enter inspection number"
                  type="text"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.inspectionNumber || ""}
                  invalid={
                    validation.touched.inspectionNumber &&
                    validation.errors.inspectionNumber
                      ? true
                      : false
                  }
                />
                {validation.touched.inspectionNumber &&
                validation.errors.inspectionNumber ? (
                  <FormFeedback type="invalid">
                    {validation.errors.inspectionNumber}
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
