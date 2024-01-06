import React, { useState } from "react";

import { Row, Col, TabPane, Label, Input, Form } from "reactstrap";

import Select from "react-select";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import { addNewClient as onAddNewClient } from "../../slices/thunks";

const ClientInformation = ({ toggleTab, activeTab }) => {
  const dispatch = useDispatch();

  const [selectedCountry, setselectedCountry] = useState(null);
  const [selectedState, setselectedState] = useState(null);

  function handleSelectCountry(selectedCountry) {
    setselectedCountry(selectedCountry);
  }

  function handleSelectState(selectedState) {
    setselectedState(selectedState);
  }

  const productState = [
    {
      options: [
        { label: "Select State...", value: "Select State" },
        { label: "Alabama", value: "Alabama" },
        { label: "Alaska", value: "Alaska" },
        { label: "American Samoa", value: "American Samoa" },
        { label: "California", value: "California" },
        { label: "Colorado", value: "Colorado" },
        { label: "District Of Columbia", value: "District Of Columbia" },
        { label: "Florida", value: "Florida" },
        { label: "Georgia", value: "Georgia" },
        { label: "Guam", value: "Guam" },
        { label: "Hawaii", value: "Hawaii" },
        { label: "Idaho", value: "Idaho" },
        { label: "Kansas", value: "Kansas" },
        { label: "Louisiana", value: "Louisiana" },
        { label: "Montana", value: "Montana" },
        { label: "Nevada", value: "Nevada" },
        { label: "New Jersey", value: "New Jersey" },
        { label: "New Mexico", value: "New Mexico" },
        { label: "New York", value: "New York" },
      ],
    },
  ];

  const productCountry = [
    {
      options: [
        { label: "Select Country...", value: "Select Country" },
        { label: "United States", value: "United States" },
      ],
    },
  ];

  const [loading, setLoading] = useState(false);

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
      tinNumber: "",
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
      tinNumber: Yup.string().required("Please enter tin number"),
    }),
    onSubmit: (values) => {
      const data = {
        data: {
          email: values["email"],
          phoneCode: values["phoneCode"],
          phoneNumber: values["phoneNumber"],
          firstName: values["firstName"],
          otherNames: values["otherNames"],
          postalAddress: values["postalAddress"],
          postalCode: values["postalCode"],
          idOrPassportNumber: values["idOrPassportNumber"],
          tinNumber: values["tinNumber"],
        },
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onAddNewClient(data)).then(() => {
        setLoading(false);

        // if (result?.payload?.data) {
        //   validation.resetForm();
        // }
      });
    },
  });

  const vehicleMakeOptions = useMemo(() => {
    return vehicleMakeList.map((el) => {
      return {
        value: el?.id,
        label: el?.attributes?.name,
      };
    });
  }, [vehicleMakeList]);
  return (
    <TabPane tabId={1} id="pills-bill-info">
      <Form
        className="tablelist-form"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <div>
          <h5 className="mb-1">Client Information</h5>
          <p className="text-muted mb-4">Please fill all information below</p>
        </div>

        <div>
          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <Label htmlFor="vehicleMake-field" className="form-label">
                  Select existing client
                </Label>
                <Select
                  name="vehicleMake"
                  id="vehicleMake"
                  value={{}}
                  placeholder="Select vehicle make"
                  onChange={(value) => {
                    validation.setFieldValue("vehicleMake", value);
                    // Reset the error when a value is selected
                    validation.setFieldError("vehicleMake", "");
                  }}
                  options={vehicleMakeOptions}
                  onBlur={() => validation.setFieldTouched("vehicleMake", true)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <Label htmlFor="billinginfo-firstName" className="form-label">
                  First Name
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="billinginfo-firstName"
                  placeholder="Enter first name"
                />
              </div>
            </Col>

            <Col sm={6}>
              <div className="mb-3">
                <Label htmlFor="billinginfo-lastName" className="form-label">
                  Last Name
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="billinginfo-lastName"
                  placeholder="Enter last name"
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              <div className="mb-3">
                <Label htmlFor="billinginfo-email" className="form-label">
                  Email
                  <span className="text-muted">(Optional)</span>
                </Label>
                <Input
                  type="email"
                  className="form-control"
                  id="billinginfo-email"
                  placeholder="Enter email"
                />
              </div>
            </Col>

            <Col sm={6}>
              <div className="mb-3">
                <Label htmlFor="billinginfo-phone" className="form-label">
                  Phone
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="billinginfo-phone"
                  placeholder="Enter phone no."
                />
              </div>
            </Col>
          </Row>

          <div className="mb-3">
            <Label htmlFor="billinginfo-address" className="form-label">
              Address
            </Label>
            <textarea
              className="form-control"
              id="billinginfo-address"
              placeholder="Enter address"
              rows="3"
            ></textarea>
          </div>

          <Row>
            <Col md={4}>
              <div className="mb-3">
                <Label htmlFor="country" className="form-label">
                  Country
                </Label>
                <Select
                  value={selectedCountry}
                  onChange={() => {
                    handleSelectCountry();
                  }}
                  options={productCountry}
                  id="country"
                ></Select>
              </div>
            </Col>

            <Col md={4}>
              <div className="mb-3">
                <Label htmlFor="state" className="form-label">
                  State
                </Label>
                <Select
                  id="state"
                  value={selectedState}
                  onChange={() => {
                    handleSelectState();
                  }}
                  options={productState}
                ></Select>
              </div>
            </Col>

            <Col md={4}>
              <div className="mb-3">
                <Label htmlFor="zip" className="form-label">
                  Zip Code
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder="Enter zip code"
                />
              </div>
            </Col>
          </Row>

          <div className="d-flex align-items-start gap-3 mt-3">
            <button
              type="button"
              className="btn btn-secondary btn-label right ms-auto nexttab"
              onClick={() => {
                toggleTab(activeTab + 1);
              }}
              disabled={loading}
            >
              <i className="ri-truck-line label-icon align-middle fs-16 ms-2"></i>
              Proceed to Shipping
            </button>
          </div>
        </div>
      </Form>
    </TabPane>
  );
};

ClientInformation.propTypes = {
  toggleTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
};

export default ClientInformation;
