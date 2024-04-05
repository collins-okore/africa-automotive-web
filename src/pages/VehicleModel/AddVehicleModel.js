import React, { useEffect, useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { createSelector } from "reselect";

import {
  addNewVehicleModel as onAddNewVehicleModel,
  getVehicleMakes as onGetVehicleMakes,
} from "../../slices/thunks";
import VehicleModelForm from "./VehicleModelForm";

const AddVehicleModel = ({ toggle, isModalOpen, fetchVehicleModels }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: "",
      code: "",
      vehicleMake: {
        value: "",
        label: "",
      },
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter make"),
      code: Yup.string().required("Please enter code"),
      vehicleMake: Yup.object().shape({
        value: Yup.number().required("Please select vehicle make"),
      }),
    }),
    onSubmit: (values) => {
      const data = {
        name: values["name"],
        code: values["code"],
        vehicleMakeId: values["vehicleMake"]["value"],
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onAddNewVehicleModel(data)).then((result) => {
        setLoading(false);

        if (result?.payload?.data) {
          fetchVehicleModels();
          validation.resetForm();
          toggle();
        }
      });
    },
  });

  // Fetch Vehicle Make List
  useEffect(() => {
    setLoading(true);
    dispatch(onGetVehicleMakes()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const selectLayoutState = (state) => state.VehicleMake;
  const selectVehicleModelProperties = createSelector(
    selectLayoutState,
    (state) => ({
      vehicleMake: state.vehicleMake.data,
    })
  );

  const { vehicleMake: vehicleMakeList } = useSelector(
    selectVehicleModelProperties
  );
  return (
    <Modal id="showModal" isOpen={isModalOpen} toggle={toggle} centered>
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Add Vehicle Model
      </ModalHeader>

      <VehicleModelForm
        validation={validation}
        isUpdate={false}
        loading={loading}
        toggle={toggle}
        vehicleMakeList={vehicleMakeList}
      />
    </Modal>
  );
};

AddVehicleModel.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fetchVehicleModels: PropTypes.func.isRequired,
};

export default AddVehicleModel;
