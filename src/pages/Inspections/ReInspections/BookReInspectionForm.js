import React, { useEffect, useState, useMemo } from "react";
import {
  Form,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Spinner,
} from "reactstrap";
import PropTypes from "prop-types";
import { getPayments as onGetPayments } from "../../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import { formatDate } from "../../../common/lib/dateFns";
import { createSelector } from "reselect";
import Select from "react-select";

const BookReInspectionForm = ({ validation, toggle, isUpdate }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(
      onGetPayments({
        pagination: {
          page: 1,
          pageSize: 1000,
        },
        filter: [{ fieldName: "fullyUtilized", value: false }],
      })
    ).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const selectLayoutState = (state) => state.Payment;
  const selectPaymentProperties = createSelector(
    selectLayoutState,
    (state) => ({
      payments: state.payment.data,
    })
  );

  const { payments: paymentsList } = useSelector(selectPaymentProperties);

  const paymentOptions = useMemo(() => {
    return paymentsList.map((el) => {
      console.log("Payment el ", el);
      const paymentDate = formatDate(new Date(el?.dateOfPayment));
      return {
        value: el?.id,
        label: `${el?.currency?.name} ${el?.amount} -  Paid By: ${el?.paidBy} - ${paymentDate} `,
      };
    });
  }, [paymentsList]);

  // Custom styles for react-select
  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      borderColor:
        validation.touched.payment && validation.errors.payment
          ? "red"
          : styles.borderColor,
      "&:hover": {
        borderColor:
          validation.touched.payment && validation.errors.payment
            ? "red"
            : styles["&:hover"].borderColor,
      },
    }),
  };
  return (
    <Form
      className="tablelist-form"
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      <ModalBody>
        <input type="hidden" id="id-field" />

        <div className="mb-3">
          <Label htmlFor="payments-field" className="form-label">
            Select exisitng payment
          </Label>
          <Select
            name="payment"
            id="payment"
            value={validation.values.payment || {}}
            placeholder="Select payment"
            onChange={(value) => {
              validation.setFieldValue("payment", value);
              // Reset the error when a value is selected
              validation.setFieldError("payment", "");
              //   populateSelectedClient(value?.value);
            }}
            options={paymentOptions}
            onBlur={() => validation.setFieldTouched("payment", true)}
            className={
              validation.touched.payment && validation.errors.payment
                ? "is-invalid"
                : ""
            }
            styles={customSelectStyles}
          />
          <FormFeedback>{validation.errors.payment?.value}</FormFeedback>
        </div>

        <div className="mb-3">
          <Label htmlFor="customername-field" className="form-label">
            Client Name
          </Label>
          <Input
            name="clientName"
            id="clientName"
            className="form-control"
            placeholder="Enter Client Name"
            type="text"
            validate={{
              required: { value: true },
            }}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.clientName || ""}
            invalid={
              validation.touched.clientName && validation.errors.clientName
                ? true
                : false
            }
          />
          {validation.touched.clientName && validation.errors.clientName ? (
            <FormFeedback type="invalid">
              {validation.errors.clientName}
            </FormFeedback>
          ) : null}
        </div>
      </ModalBody>

      <div className="modal-footer">
        <div className="hstack gap-2 justify-content-end">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              toggle();
            }}
          >
            Close
          </button>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading && (
              <Spinner
                color="light"
                size="sm"
                style={{ marginRight: "8px", marginBottom: "-1px" }}
              ></Spinner>
            )}
            Book Re-Inspection
          </button>
        </div>
      </div>
    </Form>
  );
};

BookReInspectionForm.propTypes = {
  validation: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

export default BookReInspectionForm;
