import React, { useState, useEffect } from "react";

//Import Breadcrumb
import BreadCrumb from "../../Components/Common/BreadCrumb";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Label,
  Input,
} from "reactstrap";

import classnames from "classnames";
import ClientInfo from "./ClientInfo";
import PaymentInfo from "./PaymentInfo";
import VehicleInfo from "./VehicleInfo";
import Finish from "./Finish";
import { useDispatch } from "react-redux";

import { getInspectionFees as onGetInspectionFee } from "../../slices/thunks";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";

const NewInspection = () => {
  const [inspection, setInspection] = useState({
    client: {},
    vehicles: [],
    payment: {},
    inspectionFee: 0,
  });

  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [modal, setModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const togglemodal = () => {
    setModal(!modal);
  };

  function toggleTab(tab) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  const updateInspection = (update) => {
    setInspection((state) => ({ ...state, ...update }));
  };

  const dispatch = useDispatch();

  // Get default inspection fee
  useEffect(() => {
    dispatch(
      onGetInspectionFee({
        filter: [
          {
            fieldName: "default",
            value: true,
          },
        ],
      })
    );
  }, [dispatch]);

  // Get Inspection Fee from store
  const selectInspectionFee = createSelector(
    (state) => state.InspectionFee,
    (state) => ({
      inspectionFee: state.inspectionFee.data,
    })
  );
  const { inspectionFee } = useSelector(selectInspectionFee);

  // Set default inspection fee
  useEffect(() => {
    if (inspectionFee && inspectionFee.length > 0) {
      updateInspection({ inspectionFee: inspectionFee[0].amount });
    }
  }, [inspectionFee]);

  document.title = "New Inspection - Automotive Africa ";

  console.log("inspection", inspection);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="New Inspection" pageTitle="Inspection" />

          <Row>
            <Col xl="12">
              <Card>
                <CardBody className="checkout-tab">
                  <div className="step-arrow-nav mt-n3 mx-n3 mb-3">
                    <Nav
                      className="nav-pills nav-justified custom-nav"
                      role="tablist"
                    >
                      <NavItem role="presentation">
                        <NavLink
                          href="#"
                          className={classnames(
                            {
                              active: activeTab === 1,
                              done: activeTab <= 4 && activeTab >= 0,
                            },
                            "p-3 fs-15"
                          )}
                          onClick={() => {
                            toggleTab(1);
                          }}
                        >
                          <i className="ri-user-2-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                          Client Info
                        </NavLink>
                      </NavItem>
                      <NavItem role="presentation">
                        <NavLink
                          href="#"
                          className={classnames(
                            {
                              active: activeTab === 2,
                              done: activeTab <= 4 && activeTab > 1,
                            },
                            "p-3 fs-15"
                          )}
                          onClick={() => {
                            if (!inspection?.client?.id) {
                              return;
                            }
                            toggleTab(2);
                          }}
                        >
                          <i className="ri-bank-card-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                          Payment Info
                        </NavLink>
                      </NavItem>
                      <NavItem role="presentation">
                        <NavLink
                          href="#"
                          className={classnames(
                            {
                              active: activeTab === 3,
                              done: activeTab <= 4 && activeTab > 2,
                            },
                            "p-3 fs-15"
                          )}
                          onClick={() => {
                            if (
                              !inspection?.client?.id ||
                              !inspection?.payment?.id
                            ) {
                              return;
                            }
                            toggleTab(3);
                          }}
                        >
                          <i className="ri-truck-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                          Vehicle Info
                        </NavLink>
                      </NavItem>

                      <NavItem role="presentation">
                        <NavLink
                          href="#"
                          className={classnames(
                            {
                              active: activeTab === 4,
                              done: activeTab <= 4 && activeTab > 3,
                            },
                            "p-3 fs-15"
                          )}
                          onClick={() => {
                            if (
                              !inspection?.client?.id ||
                              inspection.vehicles.length === 0 ||
                              !inspection?.payment?.id
                            ) {
                              return;
                            }
                            toggleTab(4);
                          }}
                        >
                          <i className="ri-checkbox-circle-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                          Finish
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>

                  <TabContent activeTab={activeTab}>
                    <ClientInfo
                      activeTab={activeTab}
                      toggleTab={toggleTab}
                      updateInspection={updateInspection}
                    />
                    <PaymentInfo
                      activeTab={activeTab}
                      toggleTab={toggleTab}
                      updateInspection={updateInspection}
                    />
                    <VehicleInfo
                      activeTab={activeTab}
                      toggleTab={toggleTab}
                      togglemodal={togglemodal}
                      toggledeletemodal={toggledeletemodal}
                      updateInspection={updateInspection}
                      vehicles={inspection?.vehicles}
                      inspection={inspection}
                    />
                    <Finish inspection={inspection} />
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* modal Delete Address */}
      <Modal
        isOpen={deletemodal}
        role="dialog"
        autoFocus={true}
        centered
        id="removeItemModal"
        toggle={toggledeletemodal}
      >
        <ModalHeader
          toggle={() => {
            setDeleteModal(!deletemodal);
          }}
        ></ModalHeader>
        <ModalBody>
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Address ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => {
                setDeleteModal(!deletemodal);
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger"
              onClick={() => {
                setDeleteModal(!deletemodal);
              }}
            >
              Yes, Delete It!
            </button>
          </div>
        </ModalBody>
      </Modal>

      {/* modal Add Address */}
      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered
        id="addAddressModal"
        toggle={togglemodal}
      >
        <ModalHeader
          toggle={() => {
            setModal(!modal);
          }}
        >
          <h5 className="modal-title" id="addAddressModalLabel">
            Address
          </h5>
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="addaddress-Name"
                placeholder="Enter Name"
              />
            </div>

            <div className="mb-3">
              <Label for="addaddress-textarea" className="form-label">
                Address
              </Label>
              <textarea
                className="form-control"
                id="addaddress-textarea"
                placeholder="Enter Address"
                rows="2"
              ></textarea>
            </div>

            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Phone
              </Label>
              <Input
                type="text"
                className="form-control"
                id="addaddress-Name"
                placeholder="Enter Phone No."
              />
            </div>

            <div className="mb-3">
              <Label for="state" className="form-label">
                Address Type
              </Label>
              <select className="form-select" id="state" data-plugin="choices">
                <option value="homeAddress">Home (7am to 10pm)</option>
                <option value="officeAddress">Office (11am to 7pm)</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              setModal(!modal);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              setModal(!modal);
            }}
          >
            Save
          </button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default NewInspection;
