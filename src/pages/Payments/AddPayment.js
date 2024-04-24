import React, { useEffect, useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  addNewPayment as onAddNewPayment,
  getInspectionFees as onGetInspectionFee,
} from "../../slices/thunks";
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

  // Get default inspection fee
  useEffect(() => {
    dispatch(
      onGetInspectionFee({
        filter: [
          {
            fieldName: "default",
            value: true,
          },
        ],
      })
    );
  }, [dispatch]);

  // Get Inspection Fee from store
  const selectInspectionFee = createSelector(
    (state) => state.InspectionFee,
    (state) => ({
      inspectionFee: state.inspectionFee.data,
    })
  );
  const { inspectionFee } = useSelector(selectInspectionFee);

  // Set default inspection fee
  useEffect(() => {
    if (inspectionFee && inspectionFee.length > 0) {
      validation.setFieldValue("amount", inspectionFee[0].amount);
    }
  }, [inspectionFee]);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      paymentMode: "MOBILE_MONEY",
      paymentType: "PROCEED_TO_INSPECT",
      bankId: null,
      amount: "",
      chequeNumber: "",
      referenceNumber: "",
      dateOfPayment: "",
      quotationOrInvoiceNo: "",
      chassisNumber: "",
      currency: {
        value: 1,
        label: "ZMW",
      },
      narration: "",
      paidBy: "",
      taxInvoiceNumber: "",
      chassisNumbers: [""],
    },
    validationSchema: Yup.object({
      paymentMode: Yup.string().required("Please select payment mode"),
      paymentType: Yup.string().required("Please select payment type"),
      amount: Yup.number().required("Please enter amount"),
      paidBy: Yup.string().required("Please enter paid by"),
      taxInvoiceNumber: Yup.string().required(
        "Please enter tax invoice number"
      ),
      currency: Yup.object().shape({
        value: Yup.number().required("Please select currency"),
      }),
      dateOfPayment: Yup.date().required("Please select date of payment"),
      chassisNumbers: Yup.array().of(
        Yup.string().required("Please enter chasis number")
      ),
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

      // validate chassis numbers
      const chassisNumbers = values["chassisNumbers"];

      //check if there's atleast one chassis number
      if (chassisNumbers.length === 0) {
        validation.setFieldError(
          "chassisNumbersLength",
          "Please enter at least one chassis number"
        );
        return;
      }

      // check if chassis numbers strings are not empty
      for (let i = 0; i < chassisNumbers.length; i++) {
        if (chassisNumbers[i].trim() === "") {
          validation.setFieldError(
            "chassisNumbersLength",
            "Please enter a valid chassis number"
          );
          return;
        }
      }

      const amount = values["amount"];
      const fee =
        inspectionFee && inspectionFee.length > 0 && inspectionFee[0].amount;
      const expectedAmount = chassisNumbers.length * fee;
      const currency = values["currency"];

      if (expectedAmount > amount) {
        validation.setFieldError(
          "chassisNumbersTotal",
          `Amount provided does not match number of vehicles in listed chassis numbers. Expected amount is ${currency.label} ${expectedAmount}`
        );
        return;
      }

      const newPayment = {
        paymentModeId: paymentMode.id,
        paymentTypeId: paymentType.id,
        bankId: values["bankId"],
        amount: values["amount"],
        chequeNumber: values["chequeNumber"],
        referenceNumber: values["referenceNumber"],
        dateOfPayment: values["dateOfPayment"],
        quotationOrInvoiceNo: values["quotationOrInvoiceNo"],
        chassisNumbers: values["chassisNumbers"],
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
      size="xl"
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
