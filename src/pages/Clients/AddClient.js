import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import {
  addNewClient as onAddNewClient,
  //   getVehicleMakes as onGetVehicleMakes,
} from "../../slices/thunks";
import ClientForm from "./ClientForm";

const AddClient = ({ toggle, isModalOpen, fetchClient }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: "",
      phoneCode: "",
      phoneNumber: "",
      firstName: "",
      otherNames: "",
      postalAddress: "",
      postalCode: "",
      idOrPassportNumber: "",
      tpinNumber: "",
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
      dispatch(
        onAddNewClient({
          data,
        })
      ).then((result) => {
        setLoading(false);
        if (result?.payload?.data) {
          fetchClient();
          validation.resetForm();
          toggle();
          // setNewClient(result.payload.data);
        }
      });
    },
  });

  // Fetch Country Codes
  //   useEffect(() => {
  //     setLoading(true);
  //     dispatch(onGetVehicleMakes()).then(() => {
  //       setLoading(false);
  //     });
  //   }, [dispatch]);

  //   const selectLayoutState = (state) => state.VehicleMake;
  //   const selectinvoiceProperties = createSelector(
  //     selectLayoutState,
  //     (state) => ({
  //       vehicleMake: state.vehicleMake.data,
  //     })
  //   );

  //   const { vehicleMake: vehicleMakeList } = useSelector(selectinvoiceProperties);
  return (
    <Modal
      id="showModal"
      isOpen={isModalOpen}
      toggle={toggle}
      centered
      size="lg"
    >
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Add Client
      </ModalHeader>

      <ClientForm
        validation={validation}
        isUpdate={false}
        loading={loading}
        toggle={toggle}
      />
    </Modal>
  );
};

AddClient.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fetchClient: PropTypes.func.isRequired,
};

export default AddClient;
