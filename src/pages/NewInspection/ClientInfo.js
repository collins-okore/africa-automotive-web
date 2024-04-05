import React, { useState, useEffect, useMemo } from "react";

import {
  Row,
  Col,
  TabPane,
  Label,
  Input,
  Form,
  Card,
  FormFeedback,
} from "reactstrap";

import Select from "react-select";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import AddClient from "../Clients/AddClient";

import { getClients as onGetClients } from "../../slices/thunks";

const ClientInfo = ({ toggleTab, updateInspection }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      client: {
        value: "",
        label: "",
      },
    },
    validationSchema: Yup.object({
      client: Yup.object().shape({
        value: Yup.number().required("Please select a client"),
      }),
    }),
    onSubmit: (values) => {
      const client = clientsList.find((el) => el.id === values.client.value);
      updateInspection({
        client: {
          clientId: values.client["value"],
          ...client,
        },
      });
      toggleTab(2);
    },
  });

  // Fetch Client List
  useEffect(() => {
    setLoading(true);
    dispatch(
      onGetClients({
        pagination: {
          page: 1,
          pageSize: 1000,
        },
      })
    ).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const fetchClient = () => {
    dispatch(
      onGetClients({
        pagination: {
          page: 1,
          pageSize: 1000,
        },
      })
    );
  };

  const selectLayoutState = (state) => state.Client;
  const selectClientProperties = createSelector(selectLayoutState, (state) => ({
    clients: state.clients.data,
  }));

  const { clients: clientsList } = useSelector(selectClientProperties);

  const clientOptions = useMemo(() => {
    return clientsList.map((el) => {
      return {
        value: el?.id,
        label: `${el?.user?.firstName} ${el?.user?.otherNames}`,
      };
    });
  }, [clientsList]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const showAddModalForm = () => {
    setIsAddModalOpen(true);
  };

  const [selectedClient, setSelectedClient] = useState({
    id: "",
    firstName: "",
    otherNames: "",
    email: "",
    phoneCode: "",
    phoneNumber: "",
    postalAddress: "",
    postalCode: "",
    idOrPassportNumber: "",
    tpinNumber: "",
  });

  const setNewClient = (client) => {
    const clientOption = {
      value: client?.id,
      label: `${client?.user?.firstName} ${client?.user?.otherNames}`,
    };
    validation.setFieldValue("client", clientOption);
    setSelectedClient({
      id: client?.id,
      firstName: client?.user?.firstName,
      otherNames: client?.user?.otherNames,
      email: client?.user?.email,
      phoneCode: client?.user?.phoneCode,
      phoneNumber: client?.user?.phoneNumber,
      postalAddress: client?.user?.postalAddress,
      postalCode: client?.user?.postalCode,
      idOrPassportNumber: client?.user?.idOrPassportNumber,
      tpinNumber: client?.user?.tpinNumber,
    });
  };

  const populateSelectedClient = (clientId) => {
    const client = clientsList.find((el) => el.id === clientId);
    setSelectedClient({
      id: client?.id,
      firstName: client?.user?.firstName,
      otherNames: client?.user?.otherNames,
      email: client?.user?.email,
      phoneCode: client?.user?.phoneCode,
      phoneNumber: client?.user?.phoneNumber,
      postalAddress: client?.user?.postalAddress,
      postalCode: client?.user?.postalCode,
      idOrPassportNumber: client?.user?.idOrPassportNumber,
      tpinNumber: client?.user?.tpinNumber,
    });
  };

  // Custom styles for react-select
  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      borderColor:
        validation.touched.client && validation.errors.client
          ? "red"
          : styles.borderColor,
      "&:hover": {
        borderColor:
          validation.touched.client && validation.errors.client
            ? "red"
            : styles["&:hover"].borderColor,
      },
    }),
  };

  console.log("Selected Client: ", selectedClient);

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
          <p className="text-muted mb-4">
            Please select existing client or add new client
          </p>
        </div>

        <div>
          <Row className="align-items-end">
            <Col sm={6}>
              <div className="mb-3">
                <Label htmlFor="clients-field" className="form-label">
                  Select existing client
                </Label>
                <Select
                  name="client"
                  id="client"
                  value={validation.values.client || ""}
                  placeholder="Select client"
                  onChange={(value) => {
                    validation.setFieldValue("client", value);
                    // Reset the error when a value is selected
                    validation.setFieldError("client", "");
                    populateSelectedClient(value?.value);
                  }}
                  options={clientOptions}
                  onBlur={() => validation.setFieldTouched("client", true)}
                  className={
                    validation.touched.client && validation.errors.client
                      ? "is-invalid"
                      : ""
                  }
                  styles={customSelectStyles}
                />
                <FormFeedback>{validation.errors.client?.value}</FormFeedback>
              </div>
            </Col>

            <Col sm={5} className="">
              <div className="mb-3 d-inline mx-3">OR</div>
              <Link
                to="#"
                className="btn btn-secondary mb-3 mx-3"
                onClick={(e) => {
                  e.preventDefault();
                  showAddModalForm();
                }}
              >
                <i className="ri-add-line align-bottom me-1"></i>
                Add New Client
              </Link>
            </Col>
          </Row>
          <Card className="p-4 border shadow-none mb-0 mt-4">
            <Row>
              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="firstName" className="form-label">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter first name"
                    value={selectedClient.firstName}
                    disabled
                  />
                </div>
              </Col>

              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="otherNames" className="form-label">
                    Other Names
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="otherNames"
                    placeholder="Enter other names"
                    value={selectedClient.otherNames}
                    disabled
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="email" className="form-label">
                    Email
                    {/* <span className="text-muted">(Optional)</span> */}
                  </Label>
                  <Input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    value={selectedClient.email}
                    disabled
                  />
                </div>
              </Col>

              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="phoneNumber" className="form-label">
                    Phone
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    disabled
                    value={`${selectedClient.phoneCode} ${selectedClient.phoneNumber}`}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="email" className="form-label">
                    ID or Passport Number
                    {/* <span className="text-muted">(Optional)</span> */}
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="idOrPassportNumber"
                    placeholder="Enter id or passport number"
                    value={selectedClient.idOrPassportNumber}
                    disabled
                  />
                </div>
              </Col>

              <Col sm={6}>
                <div className="mb-3">
                  <Label htmlFor="phoneNumber" className="form-label">
                    TIN Number
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="tpinNumber"
                    placeholder="Enter phone number"
                    disabled
                    value={selectedClient?.tpinNumber}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <div className="mb-3">
                  <Label htmlFor="postalCode" className="form-label">
                    Postal Code
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="postalCode"
                    placeholder="Enter phone number"
                    value={`${selectedClient.postalCode}`}
                    disabled
                  />
                </div>
              </Col>
            </Row>

            <div className="mb-3">
              <Label htmlFor="address" className="form-label">
                Address
              </Label>
              <textarea
                className="form-control"
                id="address"
                placeholder="Enter postal address"
                rows="3"
                value={selectedClient.postalAddress}
                disabled
              ></textarea>
            </div>
          </Card>

          <div className="d-flex align-items-start gap-3 mt-3">
            <button
              type="submit"
              className="btn btn-secondary btn-label right ms-auto nexttab"
              onClick={() => {
                // toggleTab(activeTab + 1);
              }}
              disabled={loading}
            >
              <i className="ri-truck-line label-icon align-middle fs-16 ms-2"></i>
              Proceed to Payment
            </button>
          </div>
        </div>
      </Form>
      <AddClient
        toggle={() => setIsAddModalOpen((state) => !state)}
        isModalOpen={isAddModalOpen}
        fetchClient={fetchClient}
        setNewClient={setNewClient}
      />
    </TabPane>
  );
};

ClientInfo.propTypes = {
  toggleTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
  updateInspection: PropTypes.func.isRequired,
};

export default ClientInfo;
