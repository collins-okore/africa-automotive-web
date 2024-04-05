import React, { useState, useEffect } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { createSelector } from "reselect";

import {
  getVehicleMakes as onGetVehicleMakes,
  updateVehicleModel as onUpdateVehicleModel,
} from "../../slices/thunks";
import VehicleModelForm from "./VehicleModelForm";

const UpdateVehicleModel = ({
  toggle,
  isModalOpen,
  selectedRecord,
  fetchUpdatedVehicleModels,
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
      vehicleMake: {
        value: selectedRecord?.vehicleMake?.id || "",
        label: selectedRecord?.vehicleMake?.name || "",
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
        id: selectedRecord.id,
        name: values["name"],
        code: values["code"],
        vehicleMakeId: values["vehicleMake"]["value"],
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onUpdateVehicleModel(updatedData)).then((result) => {
        setLoading(false);

        if (result?.payload?.data) {
          fetchUpdatedVehicleModels();
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
  const selectinvoiceProperties = createSelector(
    selectLayoutState,
    (state) => ({
      vehicleMake: state.vehicleMake.data,
    })
  );

  const { vehicleMake: vehicleMakeList } = useSelector(selectinvoiceProperties);

  return (
    <Modal id="showModal" isOpen={isModalOpen} toggle={toggle} centered>
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Update Vehicle Model
      </ModalHeader>

      <VehicleModelForm
        validation={validation}
        isUpdate={true}
        loading={loading}
        toggle={toggle}
        vehicleMakeList={vehicleMakeList}
      />
    </Modal>
  );
};

UpdateVehicleModel.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  fetchUpdatedVehicleModels: PropTypes.func.isRequired,
};

export default UpdateVehicleModel;
