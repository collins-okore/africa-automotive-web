import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { addNewPayment as onAddNewPayment } from "../../slices/thunks";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import PaymentForm from "./PaymentForm";

const AddPayment = ({ toggle, isModalOpen, fetchPayments }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // Get Payment Types from store
  const selectPaymentTypes = createSelector(
    (state) => state.PaymentType,
    (paymentType) => ({
      paymentTypes: paymentType.paymentTypes.data,
    })
  );

  const { paymentTypes } = useSelector(selectPaymentTypes);

  // Get Payment Modes from store
  const selectPaymentModes = createSelector(
    (state) => state.PaymentMode,
    (paymentMode) => ({
      paymentModes: paymentMode.paymentModes.data,
    })
  );
  const { paymentModes } = useSelector(selectPaymentModes);

  // validation
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
      chasisNumber: "",
      currency: {
        value: 1,
        label: "ZMW",
      },
      narration: "",
      paidBy: "",
      taxInvoiceNumber: "",
    },
    validationSchema: Yup.object({
      paymentMode: Yup.string().required("Please select payment mode"),
      paymentType: Yup.string().required("Please select payment type"),
      amount: Yup.number().required("Please enter amount"),
      paidBy: Yup.string().required("Please enter paid by"),
      taxInvoiceNumber: Yup.string().required(
        "Please enter tax invoice number"
      ),
      chasisNumber: Yup.string().required("Please enter chasis number"),
      currency: Yup.object().shape({
        value: Yup.number().required("Please select currency"),
      }),
      dateOfPayment: Yup.date().required("Please select date of payment"),
    }),
    onSubmit: (values) => {
      const paymentMode = paymentModes.find(
        (paymentMode) => paymentMode.code === values["paymentMode"]
      );
      if (!paymentMode) return;

      // fetch payment type from payment type list
      const paymentType = paymentTypes.find(
        (paymentType) => paymentType.code === values["paymentType"]
      );
      if (!paymentType) return;

      const currencyId = values["currency"] && values["currency"]["value"];

      const newPayment = {
        paymentModeId: paymentMode.id,
        paymentTypeId: paymentType.id,
        bankName: values["bankName"],
        amount: values["amount"],
        chequeNumber: values["chequeNumber"],
        referenceNumber: values["referenceNumber"],
        dateOfPayment: values["dateOfPayment"],
        quotationOrInvoiceNumber: values["quotationOrInvoiceNumber"],
        chasisNumber: values["chasisNumber"],
        currencyId,
        narration: values["narration"],
        paidBy: values["paidBy"],
        taxInvoiceNumber: values["taxInvoiceNumber"],
      };

      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onAddNewPayment(newPayment)).then((result) => {
        setLoading(false);
        if (result?.payload?.data) {
          fetchPayments();
          validation.resetForm();
          toggle();
        }
      });
    },
  });
  return (
    <Modal
      id="showModal"
      size="lg"
      isOpen={isModalOpen}
      toggle={toggle}
      centered
    >
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Add New Payment
      </ModalHeader>

      <PaymentForm
        validation={validation}
        isUpdate={false}
        loading={loading}
        toggle={toggle}
      />
    </Modal>
  );
};

AddPayment.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fetchPayments: PropTypes.func.isRequired,
};

export default AddPayment;
