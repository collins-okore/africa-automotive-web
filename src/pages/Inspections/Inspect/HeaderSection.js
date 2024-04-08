import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import * as moment from "moment";

// import propTypes
import PropTypes from "prop-types";

const Section = ({ inspection }) => {
  return (
    <React.Fragment>
      <Col lg={12}>
        <Card className="mt-n4 mx-n4 mb-n5">
          <div className="bg-warning-subtle">
            <CardBody className="pb-4 mb-5">
              <Row className="pt-3">
                <div className="col-md">
                  <Row className="align-items-center">
                    <div className="col-md-auto">
                      {/* <div className="avatar-md mb-md-0 mb-4">
                        <div className="avatar-title bg-white rounded-circle">
                          <img src={img} alt="" className="avatar-sm" />
                        </div>
                      </div> */}
                    </div>
                    <div className="col-md">
                      <h4 className="fw-semibold" id="ticket-title">
                        {`#${inspection?.id} - ${inspection?.vehicle?.vehicleMake} ${inspection?.vehicle?.vehicleModel} Inspection`}
                      </h4>
                      <div className="hstack gap-3 flex-wrap">
                        <div className="text-muted">
                          <i className="ri-user-shared-line align-bottom me-1"></i>{" "}
                          <span id="ticket-client">{`${inspection?.client?.user?.firstName} ${inspection?.client?.user?.otherNames}`}</span>
                        </div>
                        <div className="vr"></div>
                        <div className="text-muted">
                          Date Booked :{" "}
                          <span className="fw-medium" id="create-date">
                            {`${moment(new Date(inspection?.createdAt)).format(
                              "DD MMM Y"
                            )}, `}
                            <small className="text-muted">
                              {moment(new Date(inspection.createdAt)).format(
                                "hh:mm A"
                              )}
                            </small>
                          </span>
                        </div>
                        <div className="vr"></div>
                        {/* <div className="text-muted">
                          Due Date :{" "}
                          <span className="fw-medium" id="due-date">
                            29 Dec, 2021
                          </span>
                        </div> */}
                        <div className="vr"></div>
                        {inspection?.payment?.status === "Paid" && (
                          <div
                            className="badge rounded-pill bg-success fs-12"
                            id="ticket-status"
                          >
                            Paid
                          </div>
                        )}
                        {inspection?.status === "Pending" && (
                          <div
                            className="badge rounded-pill bg-warning fs-12"
                            id="ticket-status"
                          >
                            Pending Inspection
                          </div>
                        )}
                      </div>
                    </div>
                  </Row>
                </div>
                <div className="col-md-auto mt-md-0 mt-4"></div>
              </Row>
            </CardBody>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
};

Section.propTypes = {
  inspection: PropTypes.object,
};

export default Section;
