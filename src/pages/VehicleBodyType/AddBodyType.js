import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { addNewVehicleBodyType as onAddNewVehicleBodyType } from "../../slices/thunks";
import BodyTypeForm from "./BodyTypeForm";

const AddBodyType = ({ toggle, isModalOpen, fetchVehicleBodyTypes }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter body type"),
    }),
    onSubmit: (values) => {
      const data = {
        name: values["name"],
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onAddNewVehicleBodyType(data)).then((result) => {
        setLoading(false);

        if (result?.payload?.data) {
          fetchVehicleBodyTypes();
          validation.resetForm();
          toggle();
        }
      });
    },
  });

  return (
    <Modal id="showModal" isOpen={isModalOpen} toggle={toggle} centered>
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Add Vehicle Body Type
      </ModalHeader>

      <BodyTypeForm
        validation={validation}
        isUpdate={false}
        loading={loading}
        toggle={toggle}
      />
    </Modal>
  );
};

AddBodyType.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fetchVehicleBodyTypes: PropTypes.func.isRequired,
};

export default AddBodyType;
