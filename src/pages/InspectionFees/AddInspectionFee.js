import React, { useEffect, useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  addNewInspectionFee as onAddNewInspectionFee,
  getCurrencies as onGetCurrencies,
  getCountries as onGetCountries,
} from "../../slices/thunks";
import InspectionFeeForm from "./InspectionFeeForm";
import { createSelector } from "reselect";

const AddInspectionFee = ({ toggle, isModalOpen, fetchInspectionFee }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      currency: {
        value: "",
        label: "",
      },
      amount: "",
      country: {
        value: "",
        label: "",
      },
      default: "false",
    },
    validationSchema: Yup.object({
      currency: Yup.object().shape({
        value: Yup.number().required("Please select currency"),
      }),
      amount: Yup.string().required("Please enter amount"),
      country: Yup.object().shape({
        value: Yup.number().required("Please select country"),
      }),
      default: Yup.string(),
    }),
    onSubmit: (values) => {
      const data = {
        currencyId: values["currency"]["value"],
        amount: values["amount"],
        countryId: values["country"]["value"],
        default: values["default"] === "true" ? true : false,
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onAddNewInspectionFee(data)).then((result) => {
        setLoading(false);

        if (result?.payload?.data) {
          fetchInspectionFee();
          validation.resetForm();
          toggle();
        }
      });
    },
  });

  // Fetch Currency List
  useEffect(() => {
    setLoading(true);
    dispatch(onGetCountries());
    dispatch(onGetCurrencies()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const selectLayoutState = (state) => state;
  const selectinvoiceProperties = createSelector(
    selectLayoutState,
    (state) => ({
      currency: state.Currency.currency.data,
      country: state.Country.country.data,
    })
  );

  const { currency: currencyList, country: countryList } = useSelector(
    selectinvoiceProperties
  );

  return (
    <Modal id="showModal" isOpen={isModalOpen} toggle={toggle} centered>
      <ModalHeader className="bg-light p-3" toggle={toggle}>
        Add Inspection Fee
      </ModalHeader>

      <InspectionFeeForm
        validation={validation}
        isUpdate={false}
        loading={loading}
        toggle={toggle}
        currencyList={currencyList}
        countryList={countryList}
      />
    </Modal>
  );
};

AddInspectionFee.propTypes = {
  toggle: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  fetchInspectionFee: PropTypes.func.isRequired,
};

export default AddInspectionFee;
