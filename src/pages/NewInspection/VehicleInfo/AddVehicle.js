import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import VehicleForm from "./VehicleForm";

const AddVehicle = ({ toggle, isModalOpen, updateInspection, vehicles }) => {
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
      color: "",
      customsReferenceNumber: "",
      odometer: "",
      distanceUnit: "KM",
      odometerOnEC: "",
      engineNumber: "",
      countryOfOrigin: {
        value: "",
        label: "",
      },
      fuelType: "",
      transmission: {
        value: "",
        label: "",
      },
      inspectionDate: "",
      narration: "",
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
      countryOfOrigin: Yup.object().shape({
        value: Yup.number().required("Please select country of origin"),
        label: Yup.string().required("Please select country of origin"),
      }),
      fuelType: Yup.number().required("Please enter fuel type"),
      transmission: Yup.string().required("Please select transmission"),
      inspectionDate: Yup.string().required("Please enter inspection date"),
      narration: Yup.string().required("Please enter narration"),
    }),

    onSubmit: (values) => {
      console.log("Received values", values);
      const data = {
        vehicleMake: values["vehicleMake"]["label"],
        vehicleModel: values["vehicleModel"]["label"],
        bodyType: values["bodyType"],
        yearOfManufacture: values["yearOfManufacture"],
        yearOfRegistration: values["yearOfRegistration"],
        chasisNumber: values["chasisNumber"],
        color: values["color"],
        customsReferenceNumber: values["customsReferenceNumber"],
        odometer: values["odometer"],
        distanceUnit: values["distanceUnit"],
        odometerOnEC: values["odometerOnEC"],
        engineNumber: values["engineNumber"],
        countryOfOrigin: values["countryOfOrigin"],
        fuelType: values["fuelType"],
        transmission: values["transmission"],
        inspectionDate: values["inspectionDate"],
        narration: values["narration"],
      };

      const newVehicleArray = [...vehicles, data];
      updateInspection({ vehicles: newVehicleArray });
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
        Add Vehicle
      </ModalHeader>

      <VehicleForm validation={validation} isUpdate={false} toggle={toggle} />
    </Modal>
  );
};

AddVehicle.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  updateInspection: PropTypes.func,
  vehicles: PropTypes.array.isRequired,
};

export default AddVehicle;
