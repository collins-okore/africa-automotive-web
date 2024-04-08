import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  addNewClient as onAddNewClient,
  //   getVehicleMakes as onGetVehicleMakes,
} from "../../../slices/thunks";
import UpdateInspectionForm from "./UpdateInspectionForm";

const UpdateInspection = ({ toggle, isModalOpen }) => {
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      vehicleMake: {
        value: "",
        label: "",
      },
      vehicleModel: {
        value: "",
        label: "",
      },
      bodyType: "",
      yearOfManufacture: "",
      yearOfRegistration: "",
      chasisNumber: "",
      odometer: "",
      distanceUnit: "KM",
      odometerOnEC: "",
      engineNumber: "",
    },
    validationSchema: Yup.object({
      vehicleMake: Yup.object().shape({
        value: Yup.string().required("Please select vehicle make"),
        label: Yup.string().required("Please select vehicle make"),
      }),
      vehicleModel: Yup.object().shape({
        value: Yup.string().required("Please select vehicle model"),
        label: Yup.string().required("Please select vehicle model"),
      }),
      bodyType: Yup.string().required("Please enter body type"),
      yearOfManufacture: Yup.string().required(
        "Please enter year of manufacture"
      ),
      yearOfRegistration: Yup.string().required(
        "Please enter year of registration"
      ),
      chasisNumber: Yup.string().required("Please enter vehicle chasis number"),
      color: Yup.string().required("Please enter vehicle color"),
      customsReferenceNumber: Yup.string().required(
        "Please enter customs reference number"
      ),
      odometer: Yup.string().required("Please enter odometer"),
      distanceUnit: Yup.string().required("Please enter distance unit"),
      odometerOnEC: Yup.string().required("Please enter odometer on EC"),
      engineNumber: Yup.string().required("Please enter engine number"),
    }),

    onSubmit: (values) => {
      console.log("Received values", values);
      //   const data = {
      //     vehicleMake: values["vehicleMake"]["label"],
      //     vehicleModel: values["vehicleModel"]["label"],
      //     bodyType: values["bodyType"],
      //     yearOfManufacture: values["yearOfManufacture"],
      //     yearOfRegistration: values["yearOfRegistration"],
      //     chasisNumber: values["chasisNumber"],
      //     color: values["color"],
      //     customsReferenceNumber: values["customsReferenceNumber"],
      //     odometer: values["odometer"],
      //     distanceUnit: values["distanceUnit"],
      //     odometerOnEC: values["odometerOnEC"],
      //     engineNumber: values["engineNumber"],
      //     countryOfOrigin: values["countryOfOrigin"],
      //     fuelType: values["fuelType"],
      //     transmission: values["transmission"],
      //     inspectionDate: values["inspectionDate"],
      //     narration: values["narration"],
      //   };

      // save new vehicle
      validation.resetForm();
      toggle();
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
        Update Inspection
      </ModalHeader>

      <UpdateInspectionForm validation={validation} isUpdate toggle={toggle} />
    </Modal>
  );
};

UpdateInspection.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default UpdateInspection;
