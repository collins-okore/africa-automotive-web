import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { addNewVehicleBodyColor as onAddNewVehicleBodyColor } from "../../slices/thunks";
import VehicleModelForm from "./BodyColorForm";

const AddBodyColor = ({ toggle, isModalOpen, fetchVehicleBodyColors }) => {
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
      name: Yup.string().required("Please enter body color"),
    }),
    onSubmit: (values) => {
      const newData = {
        name: values["name"],
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onAddNewVehicleBodyColor(newData)).then((result) => {
        setLoading(false);

        if (result?.payload?.data) {
          fetchVehicleBodyColors();
          validation.resetForm();
          toggle();
        }
      });
    },
  });

  return (
    <Modal id="showModal" isOpen={isModalOpen} toggle={toggle} centered>
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Add Vehicle Body Color
      </ModalHeader>

      <VehicleModelForm
        validation={validation}
        isUpdate={false}
        loading={loading}
        toggle={toggle}
      />
    </Modal>
  );
};

AddBodyColor.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fetchVehicleBodyColors: PropTypes.func.isRequired,
};

export default AddBodyColor;
