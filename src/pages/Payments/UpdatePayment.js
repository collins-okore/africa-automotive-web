import React, { useState, useEffect } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  updatePayment as onUpdatePayment,
  getInspectionFees as onGetInspectionFee,
} from "../../slices/thunks";
import PaymentForm from "./PaymentForm";

const UpdatePayment = ({
  toggle,
  isModalOpen,
  selectedRecord,
  fetchUpdatedPayments,
}) => {
  console.log("selectedRecord", selectedRecord);
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
      paymentMode: selectedRecord?.paymentMode?.code || "",
      paymentType: selectedRecord?.paymentType?.code || "",
      bankId: selectedRecord?.bankId,
      amount: selectedRecord?.amount,
      chequeNumber: selectedRecord?.chequeNumber,
      referenceNumber: selectedRecord?.referenceNumber,
      dateOfPayment: selectedRecord?.dateOfPayment,
      quotationOrInvoiceNo: selectedRecord?.quotationOrInvoiceNo,
      chassisNumbers:
        (selectedRecord?.VehiclePayment &&
          selectedRecord?.VehiclePayment?.map(
            (vehiclePayment) => vehiclePayment.chassisNumber
          )) ||
        [],
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

      const updatedPayment = {
        id: selectedRecord?.id,
        paymentModeId: paymentMode.id,
        paymentTypeId: paymentType.id,
        bankId: values["bankId"],
        amount: values["amount"],
        chequeNumber: values["chequeNumber"],
        referenceNumber: values["referenceNumber"],
        dateOfPayment: values["dateOfPayment"],
        quotationOrInvoiceNo: values["quotationOrInvoiceNo"],
        chassisNumber: values["chassisNumber"],
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

  console.log("Updated Payment Validation", validation.values);
  return (
    <Modal
      id="showModal"
      isOpen={isModalOpen}
      toggle={toggle}
      size="xl"
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
