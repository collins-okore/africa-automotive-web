import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import VehicleForm from "./VehicleForm";

const AddVehicle = ({
  toggle,
  isModalOpen,
  updateInspection,
  vehicles,
  vehicleLimitReached,
  inspection,
}) => {
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
      vehicleBodyType: "",
      yearOfManufacture: "",
      yearOfRegistration: "",
      chassisNumber: {
        value: "",
        label: "",
      },
      vehicleBodyColor: "",
      customsReferenceNumber: "",
      odometer: "",
      distanceUnit: "KM",
      odometerOnEC: "",
      engineNumber: "",
      countryId: {
        value: "",
        label: "",
      },
      vehicleFuelType: "",
      vehicleTransmission: "",
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
      vehicleBodyType: Yup.string().required("Please enter body type"),
      yearOfManufacture: Yup.string().required(
        "Please enter year of manufacture"
      ),
      yearOfRegistration: Yup.string().required(
        "Please enter year of registration"
      ),
      chassisNumber: Yup.object().shape({
        value: Yup.string().required("Please select chassis number"),
        label: Yup.string().required("Please select chassis number"),
      }),
      vehicleBodyColor: Yup.string().required(
        "Please enter vehicle vehicleBodyColor"
      ),
      customsReferenceNumber: Yup.string().required(
        "Please enter customs reference number"
      ),
      odometer: Yup.string().required("Please enter odometer"),
      distanceUnit: Yup.string().required("Please enter distance unit"),
      odometerOnEC: Yup.string().required("Please enter odometer on EC"),
      engineNumber: Yup.string().required("Please enter engine number"),
      countryId: Yup.object().shape({
        value: Yup.number().required("Please select country of origin"),
        label: Yup.string().required("Please select country of origin"),
      }),
      vehicleFuelType: Yup.number().required("Please enter fuel type"),
      vehicleTransmission: Yup.string().required(
        "Please select vehicleTransmission"
      ),
      inspectionDate: Yup.string().required("Please enter inspection date"),
      narration: Yup.string().required("Please enter narration"),
    }),

    onSubmit: (values) => {
      if (vehicleLimitReached) {
        return;
      }
      console.log("Received values", values);

      const data = {
        vehicleMake: values["vehicleMake"]["label"],
        vehicleModel: values["vehicleModel"]["label"],
        vehicleBodyType: values["vehicleBodyType"],
        yearOfManufacture: values["yearOfManufacture"],
        yearOfRegistration: values["yearOfRegistration"],
        chassisNumber: values["chassisNumber"],
        vehicleBodyColor: values["vehicleBodyColor"],
        customsReferenceNumber: values["customsReferenceNumber"],
        odometer: values["odometer"],
        distanceUnit: values["distanceUnit"],
        odometerOnEC: values["odometerOnEC"],
        engineNumber: values["engineNumber"],
        countryId: values["countryId"],
        vehicleFuelType: values["vehicleFuelType"],
        vehicleTransmission: values["vehicleTransmission"],
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

      <VehicleForm
        validation={validation}
        isUpdate={false}
        toggle={toggle}
        inspection={inspection}
      />
    </Modal>
  );
};

AddVehicle.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  updateInspection: PropTypes.func,
  vehicles: PropTypes.array.isRequired,
  vehicleLimitReached: PropTypes.bool.isRequired,
  inspection: PropTypes.object,
};

export default AddVehicle;
