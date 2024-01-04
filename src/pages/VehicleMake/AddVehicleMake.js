import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  addNewVehicleMake as onAddNewVehicleMake,
  getVehicleMakes as onGetVehicleMakes,
} from "../../slices/thunks";
import VehicleMakeForm from "./VehicleMakeForm";

const AddVehicleMake = ({ toggle, isModalOpen }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
      code: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Make"),
      code: Yup.string().required("Please Enter Code"),
    }),
    onSubmit: (values) => {
      const newVehicleMake = {
        data: {
          name: values["name"],
          code: values["code"],
        },
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onAddNewVehicleMake(newVehicleMake)).then((result) => {
        setLoading(false);

        if (result?.payload?.data) {
          dispatch(onGetVehicleMakes());
          validation.resetForm();
          toggle();
        }
      });
    },
  });
  return (
    <Modal id="showModal" isOpen={isModalOpen} toggle={toggle} centered>
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Add Vehicle Make
      </ModalHeader>

      <VehicleMakeForm
        validation={validation}
        isUpdate={false}
        loading={loading}
        toggle={toggle}
      />
    </Modal>
  );
};

AddVehicleMake.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default AddVehicleMake;
