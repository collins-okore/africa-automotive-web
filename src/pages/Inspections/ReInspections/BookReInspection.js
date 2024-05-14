import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { addNewVehicleMake as onAddNewVehicleMake } from "../../../slices/thunks";

import BookInspectionForm from "./BookReInspectionForm";

const BookReInspection = ({ toggle, isModalOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      paymentId: "",
      code: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Make"),
      code: Yup.string().required("Please Enter Code"),
    }),
    onSubmit: (values) => {
      const newVehicleMake = {
        name: values["name"],
        code: values["code"],
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onAddNewVehicleMake(newVehicleMake)).then((result) => {
        setLoading(false);
        if (result?.payload?.data) {
          //   fetchVehicleMakes();
          validation.resetForm();
          toggle();
        }
      });
    },
  });
  return (
    <Modal id="showModal" isOpen={isModalOpen} toggle={toggle} centered>
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Book Re-Inspection
      </ModalHeader>

      <BookInspectionForm
        validation={validation}
        isUpdate={false}
        loading={loading}
        toggle={toggle}
      />
    </Modal>
  );
};

BookReInspection.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fetchVehicleMakes: PropTypes.func.isRequired,
};

export default BookReInspection;
