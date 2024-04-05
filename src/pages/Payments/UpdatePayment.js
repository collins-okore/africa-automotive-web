import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { updatePayment as onUpdatePayment } from "../../slices/thunks";
import PaymentForm from "./PaymentForm";

const UpdatePayment = ({
  toggle,
  isModalOpen,
  selectedRecord,
  fetchUpdatedPayments,
}) => {
  // log selected record
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
      paymentMode: selectedRecord?.paymentMode?.code || "",
      paymentType: selectedRecord?.paymentType?.code || "",
      bankName: selectedRecord?.bankName,
      amount: selectedRecord?.amount,
      chequeNumber: selectedRecord?.chequeNumber,
      referenceNumber: selectedRecord?.referenceNumber,
      dateOfPayment: selectedRecord?.dateOfPayment,
      quotationOrInvoiceNumber: selectedRecord?.quotationOrInvoiceNumber,
      chasisNumber: selectedRecord?.chasisNumber,
      currency: {
        value: selectedRecord?.currency?.id,
        label: selectedRecord?.currency?.name,
      },
      narration: selectedRecord?.narration,
      paidBy: selectedRecord?.paidBy,
      taxInvoiceNumber: selectedRecord?.taxInvoiceNumber,
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

      const updatedPayment = {
        id: selectedRecord?.id,
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

      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onUpdatePayment(updatedPayment)).then((result) => {
        setLoading(false);

        if (result?.payload?.data) {
          fetchUpdatedPayments();
          validation.resetForm();
          toggle();
        }
      });
    },
  });
  return (
    <Modal
      id="showModal"
      isOpen={isModalOpen}
      toggle={toggle}
      size="lg"
      centered
    >
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Update Payment
      </ModalHeader>

      <PaymentForm
        validation={validation}
        isUpdate={true}
        loading={loading}
        toggle={toggle}
      />
    </Modal>
  );
};

UpdatePayment.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  fetchUpdatedPayments: PropTypes.func.isRequired,
};

export default UpdatePayment;
