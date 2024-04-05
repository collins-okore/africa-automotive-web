import React, { useState } from "react";

import { Row, Col, TabPane, Container } from "reactstrap";

import PropTypes from "prop-types";
import AddVehicle from "./AddVehicle";
import UpdateVehicle from "./UpdateVehicle";
import * as moment from "moment";

const VehicleInfo = ({ activeTab, toggleTab, vehicles, updateInspection }) => {
  // const [vehicles, setVehicles] = useState([]);

  // Create toggle logic for Add Vehicle Modal - use isAddModalOpen
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const toggleAddModal = () => setIsAddModalOpen(!isAddModalOpen);

  // Create toggle logic for Update Vehicle Modal - use isUpdateModalOpen
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const toggleUpdateModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);

  return (
    <TabPane tabId={3}>
      <div>
        <h5 className="mb-1">Vehicle Information</h5>
        <p className="text-muted mb-4">
          Please enter vehicle information below
        </p>
      </div>

      <div className="mt-4">
        <Container fluid>
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
            <div className="file-manager-content w-100 p-4 pb-0">
              <div className="p-3 bg-light rounded mb-4">
                <Row className="g-2">
                  <Col className="col-lg-auto">
                    <select
                      className="form-control"
                      name="choices-select-sortlist"
                      id="choices-select-sortlist"
                      onChange={() => {}}
                    >
                      <option value="">Sort</option>
                      <option value="By ID">By Make</option>
                      <option value="By Name">By Model</option>
                    </select>
                  </Col>
                  <Col className="col-lg-auto">
                    <select
                      className="form-control"
                      name="choices-select-status"
                      id="choices-select-status"
                      onChange={() => {}}
                    >
                      <option value="">All vehicles</option>
                    </select>
                  </Col>
                  <Col className="col-lg">
                    <div className="search-box">
                      <input
                        type="text"
                        id="searchTaskList"
                        className="form-control search"
                        placeholder="Search vehicle"
                        onKeyUp={() => {}}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  <Col className="col-lg-auto">
                    <button
                      className="btn btn-primary createTask"
                      type="button"
                      onClick={() => {
                        toggleAddModal();
                      }}
                    >
                      <i className="ri-add-fill align-bottom" /> Add Vehicle
                    </button>
                  </Col>
                </Row>
              </div>

              <div
                className="todo-content position-relative px-4 mx-n4"
                id="todo-content"
              >
                <div className="todo-task" id="todo-task">
                  <div className="table-responsive">
                    <table className="table align-middle position-relative table-nowrap">
                      <thead className="table-active">
                        <tr>
                          <th scope="col">Chasis Number</th>
                          <th scope="col">Make</th>
                          <th scope="col">Model</th>
                          <th scope="col">Body Type</th>

                          <th scope="col">Inspection Date</th>

                          <th scope="col">Year of Manufacture</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>

                      <tbody id="task-list">
                        {vehicles.map((item, key) => {
                          const date = moment(
                            new Date(item?.inspectionDate)
                          ).format("DD MMM Y");
                          const time = moment(
                            new Date(item?.inspectionDate)
                          ).format("hh:mm A");

                          return (
                            <tr key={key}>
                              <td>{item.chasisNumber}</td>
                              <td>{item?.vehicleMake}</td>
                              <td>{item?.vehicleModel}</td>
                              <td>{item?.bodyType}</td>
                              <td>{item?.yearOfManufacture}</td>
                              <td>
                                {" "}
                                {date}{" "}
                                <small className="text-muted">{time}</small>
                              </td>
                              <td>
                                <div className="hstack gap-2">
                                  <button
                                    className="btn btn-sm btn-soft-danger remove-list"
                                    onClick={() => {
                                      const newVehicleArray = vehicles.filter(
                                        (it, ind) => ind !== key
                                      );
                                      updateInspection({
                                        vehicles: newVehicleArray,
                                      });
                                    }}
                                  >
                                    <i className="ri-delete-bin-5-fill align-bottom" />
                                  </button>
                                  {/* <button
                                    className="btn btn-sm btn-soft-info edit-list"
                                    onClick={() => {}}
                                  >
                                    <i className="ri-pencil-fill align-bottom" />
                                  </button> */}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="py-4 mt-4 text-center"
                  id="noresult"
                  style={{ display: "none" }}
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/msoeawqm.json"
                    trigger="loop"
                    colors="primary:#405189,secondary:#0ab39c"
                    style={{ width: "72px", height: "72px" }}
                  ></lord-icon>
                  <h5 className="mt-4">Sorry! No Result Found</h5>
                </div>
              </div>
            </div>
          </div>
          <AddVehicle
            toggle={toggleAddModal}
            isModalOpen={isAddModalOpen}
            updateInspection={updateInspection}
            vehicles={vehicles}
          />
          <UpdateVehicle
            toggle={toggleUpdateModal}
            isModalOpen={isUpdateModalOpen}
          />
        </Container>
      </div>

      <div className="d-flex align-items-start gap-3 mt-4">
        <button
          type="button"
          className="btn btn-light btn-label previestab"
          onClick={() => {
            toggleTab(activeTab - 1);
          }}
        >
          <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
          Back to Payment Info
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-label right ms-auto nexttab"
          onClick={() => {
            toggleTab(activeTab + 1);
          }}
        >
          <i className="ri-bank-card-line label-icon align-middle fs-16 ms-2"></i>
          Procced to Finish
        </button>
      </div>
    </TabPane>
  );
};

VehicleInfo.propTypes = {
  toggleTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
  togglemodal: PropTypes.func,
  toggledeletemodal: PropTypes.func,
  vehicles: PropTypes.array,
  updateInspection: PropTypes.func,
};

export default VehicleInfo;
