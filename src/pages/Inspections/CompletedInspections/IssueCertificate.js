import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import { issueCertificate as onIssueCertificate } from "../../../slices/thunks";

import IssueCertificateForm from "./IssueCertificateForm";

const IssueCertificate = ({
  toggle,
  isModalOpen,
  fetchInspections,
  selectedRecord: inspection,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      cor: inspection.cor,
      files: [],
      dateOfIssue: "",
    },
    validationSchema: Yup.object({
      cor: Yup.string().required("Please Enter Make"),
      //   file: Yup.array().required("Please Select File"),
      dateOfIssue: Yup.string().required("Please Enter Date of Issue"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("cor", values["cor"]);
      values["files"].forEach((file) => {
        formData.append("rwiSheet", file);
      });
      formData.append("dateOfIssue", values["dateOfIssue"]);
      formData.append("inspectionId", inspection.id);
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onIssueCertificate(formData)).then((action) => {
        setLoading(false);

        if (action.error?.message) {
          toast.error("Error while issuing certificate", {
            autoClose: 1000,
            toastId: "issue-certificate-error",
          });
          return;
        }
        toast.success("Certificate issued successfully", {
          autoClose: 1000,
          toastId: "issue-certificate-success",
        });
        fetchInspections();
        validation.resetForm();
        toggle();
      });
    },
  });
  return (
    <Modal id="showModal" isOpen={isModalOpen} toggle={toggle} centered>
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Issue Certificate
      </ModalHeader>

      <IssueCertificateForm
        validation={validation}
        isUpdate={false}
        loading={loading}
        toggle={toggle}
      />
    </Modal>
  );
};

IssueCertificate.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fetchInspections: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object,
};

export default IssueCertificate;
