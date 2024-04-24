import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import VehicleForm from "./VehicleForm";

const UpdateVehicle = ({ toggle, isModalOpen, selectedRecord, inspection }) => {
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: selectedRecord?.name || "",
      code: selectedRecord?.code || "",
      vehicleMake: {
        value: selectedRecord?.vehicleMake?.data?.id || "",
        label: selectedRecord?.vehicleMake?.data?.attributes?.name || "",
      },
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Make"),
      code: Yup.string().required("Please Enter Code"),
      vehicleMake: Yup.object().shape({
        value: Yup.number().required("Please select vehicle make"),
      }),
    }),
    onSubmit: (values) => {
      const updatedData = {
        data: {
          id: selectedRecord.id,
          name: values["name"],
          code: values["code"],
          vehicleMake: values["vehicleMake"]["value"],
        },
      };

      // save new vehicle
      validation.resetForm();
      toggle();
    },
  });

  return (
    <Modal id="showModal" isOpen={isModalOpen} toggle={toggle} centered>
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Update Vehicle Model
      </ModalHeader>

      <VehicleForm
        validation={validation}
        isUpdate={true}
        loading={false}
        toggle={toggle}
        inspection={inspection}
      />
    </Modal>
  );
};

UpdateVehicle.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  inspection: PropTypes.object,
};

export default UpdateVehicle;
