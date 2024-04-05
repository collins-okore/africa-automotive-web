import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { updateClient as onUpdateClient } from "../../slices/thunks";
import ClientForm from "./ClientForm";

const UpdateClient = ({
  toggle,
  isModalOpen,
  selectedRecord,
  fetchUpdatedClients,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: selectedRecord?.user?.email || "",
      phoneCode: selectedRecord?.user?.phoneCode || "",
      phoneNumber: selectedRecord?.user?.phoneNumber || "",
      firstName: selectedRecord?.user?.firstName || "",
      otherNames: selectedRecord?.user?.otherNames || "",
      postalAddress: selectedRecord?.user?.postalAddress || "",
      postalCode: selectedRecord?.user?.postalCode || "",
      idOrPassportNumber: selectedRecord?.user?.idOrPassportNumber || "",
      tpinNumber: selectedRecord?.user?.tpinNumber || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter email"),
      phoneCode: Yup.string().required("Please enter phone code"),
      phoneNumber: Yup.string().required("Please enter phone number"),
      firstName: Yup.string().required("Please enter first name"),
      otherNames: Yup.string().required("Please enter other names"),
      postalAddress: Yup.string().required("Please enter postal code"),
      postalCode: Yup.string().required("Please enter postal code"),
      idOrPassportNumber: Yup.string().required("Please enter id or passport"),
      tpinNumber: Yup.string().required("Please enter tin number"),
    }),
    onSubmit: (values) => {
      const data = {
        id: selectedRecord?.id,
        userId: selectedRecord?.user?.data?.id,
        email: values["email"],
        phoneCode: values["phoneCode"],
        phoneNumber: values["phoneNumber"],
        firstName: values["firstName"],
        otherNames: values["otherNames"],
        postalAddress: values["postalAddress"],
        postalCode: values["postalCode"],
        idOrPassportNumber: values["idOrPassportNumber"],
        tpinNumber: values["tpinNumber"],
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onUpdateClient(data)).then((result) => {
        setLoading(false);

        if (result?.payload?.data) {
          fetchUpdatedClients();
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
      centered
      size="lg"
    >
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Update Client
      </ModalHeader>

      <ClientForm
        validation={validation}
        isUpdate={true}
        loading={loading}
        toggle={toggle}
      />
    </Modal>
  );
};

UpdateClient.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  fetchUpdatedClients: PropTypes.func.isRequired,
};

export default UpdateClient;
