import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { updateVehicleBodyType as onUpdateVehicleBodyType } from "../../slices/thunks";
import BodyTypeForm from "./BodyTypeForm";

const UpdateBodyType = ({
  toggle,
  isModalOpen,
  selectedRecord,
  fetchUpdatedVehicleBodyTypes,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: selectedRecord?.name || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Make"),
    }),
    onSubmit: (values) => {
      const updatedData = {
        id: selectedRecord.id,
        name: values["name"],
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onUpdateVehicleBodyType(updatedData)).then((result) => {
        setLoading(false);

        if (result?.payload?.data) {
          fetchUpdatedVehicleBodyTypes();
          validation.resetForm();
          toggle();
        }
      });
    },
  });

  return (
    <Modal id="showModal" isOpen={isModalOpen} toggle={toggle} centered>
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Update Vehicle Body Type
      </ModalHeader>

      <BodyTypeForm
        validation={validation}
        isUpdate={true}
        loading={loading}
        toggle={toggle}
      />
    </Modal>
  );
};

UpdateBodyType.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  fetchUpdatedVehicleBodyTypes: PropTypes.func.isRequired,
};

export default UpdateBodyType;
