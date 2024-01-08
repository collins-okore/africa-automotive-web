import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import VehicleForm from "./VehicleForm";

const AddVehicle = ({ toggle, isModalOpen }) => {
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
        data: {
          name: values["name"],
          code: values["code"],
          vehicleMake: values["vehicleMake"]["value"],
        },
      };
      console.log(data);
      // save new vehicle
      validation.resetForm();
      toggle();
    },
  });

  // Fetch Vehicle Make List
  //   useEffect(() => {
  //     setLoading(true);
  //     dispatch(onGetVehicleMakes()).then(() => {
  //       setLoading(false);
  //     });
  //   }, [dispatch]);

  //   const selectLayoutState = (state) => state.VehicleMake;
  //   const selectVehicleModelProperties = createSelector(
  //     selectLayoutState,
  //     (state) => ({
  //       vehicleMake: state.vehicleMake.data,
  //     })
  //   );

  //   const { vehicleMake: vehicleMakeList } = useSelector(
  //     selectVehicleModelProperties
  //   );
  return (
    <Modal
      id="showModal"
      isOpen={isModalOpen}
      toggle={toggle}
      centered
      size="lg"
    >
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Add Vehicle Model
      </ModalHeader>

      <VehicleForm
        validation={validation}
        isUpdate={false}
        loading={false}
        toggle={toggle}
      />
    </Modal>
  );
};

AddVehicle.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default AddVehicle;
