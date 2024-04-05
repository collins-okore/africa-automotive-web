import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { updateVehicleMake as onUpdateVehicleMake } from "../../slices/thunks";
import VehicleMakeForm from "./VehicleMakeForm";

const UpdateVehicleMake = ({
  toggle,
  isModalOpen,
  selectedRecord,
  fetchUpdatedVehicleMakes,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: selectedRecord?.name || "",
      code: selectedRecord?.code || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Make"),
      code: Yup.string().required("Please Enter Code"),
    }),
    onSubmit: (values) => {
      const updatedVehicleMake = {
        id: selectedRecord.id,
        name: values["name"],
        code: values["code"],
      };

      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onUpdateVehicleMake(updatedVehicleMake)).then((result) => {
        setLoading(false);

        if (result?.payload?.data) {
          fetchUpdatedVehicleMakes();
          validation.resetForm();
          toggle();
        }
      });
    },
  });
  return (
    <Modal id="showModal" isOpen={isModalOpen} toggle={toggle} centered>
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Update Vehicle Make
      </ModalHeader>

      <VehicleMakeForm
        validation={validation}
        isUpdate={true}
        loading={loading}
        toggle={toggle}
      />
    </Modal>
  );
};

UpdateVehicleMake.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  fetchUpdatedVehicleMakes: PropTypes.func.isRequired,
};

export default UpdateVehicleMake;
