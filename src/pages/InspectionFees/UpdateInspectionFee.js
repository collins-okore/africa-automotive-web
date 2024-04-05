import React, { useState, useEffect } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { createSelector } from "reselect";

import {
  updateInspectionFee as onUpdateInspectionFee,
  getCurrencies as onGetCurrencies,
  getCountries as onGetCountries,
} from "../../slices/thunks";
import InspectionFeeForm from "./InspectionFeeForm";

const UpdateInspectionFee = ({
  toggle,
  isModalOpen,
  selectedRecord,
  fetchUpdatedinspectionFees,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      currency: {
        value: selectedRecord?.currency?.data?.id || "",
        label: selectedRecord?.currency?.data?.attributes?.name || "",
      },
      amount: selectedRecord?.amount || "",
      country: {
        value: selectedRecord?.country?.data?.id || "",
        label: selectedRecord?.country?.data?.attributes?.name || "",
      },
    },
    validationSchema: Yup.object({
      currency: Yup.object().shape({
        value: Yup.number().required("Please select currency"),
      }),
      amount: Yup.string().required("Please enter amount"),
      country: Yup.object().shape({
        value: Yup.number().required("Please select country"),
      }),
    }),
    onSubmit: (values) => {
      const updatedData = {
        id: selectedRecord.id,
        currencyId: values["currency"]["value"],
        amount: values["amount"],
        countryId: values["country"]["value"],
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onUpdateInspectionFee(updatedData)).then((result) => {
        setLoading(false);

        if (result?.payload?.data) {
          fetchUpdatedinspectionFees();
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
        Update Inspection Fee
      </ModalHeader>

      <InspectionFeeForm
        validation={validation}
        isUpdate={true}
        loading={loading}
        toggle={toggle}
        countryList={countryList}
        currencyList={currencyList}
      />
    </Modal>
  );
};

UpdateInspectionFee.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  selectedRecord: PropTypes.object.isRequired,
  fetchUpdatedinspectionFees: PropTypes.func.isRequired,
};

export default UpdateInspectionFee;
