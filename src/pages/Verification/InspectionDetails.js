import React, { useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";

// import prop types
import PropTypes from "prop-types";

const InspectionDetails = ({ inspection }) => {
  const vehicle = inspection?.vehicle;

  return (
    <React.Fragment>
      <Col xxl={9}>
        <Card>
          <CardBody className="p-4">
            <h6 className="fw-semibold text-uppercase mb-3">Vehicle Details</h6>

            <Row>
              <Col lg={6}>
                <Table className="table-striped table-nowrap align-middle mb-0">
                  <tbody>
                    <tr>
                      <td className="fw-medium">Chasis Number</td>
                      <td>{vehicle?.chasisNumber}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Vehicle Make</td>
                      <td>{vehicle?.vehicleMake || ""}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Vehicle Model</td>
                      <td>{vehicle?.vehicleModel}</td>
                    </tr>

                    <tr>
                      <td className="fw-medium">COR</td>
                      <td>{vehicle?.customsReferenceNumber}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Inspection Count</td>
                      <td>{vehicle?.countryOfOrigin?.name}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Date of Inspection</td>
                      <td>{vehicle?.countryOfOrigin?.name}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Inspection No</td>
                      <td>{vehicle?.countryOfOrigin?.name}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col lg={6}>
                <Table className="table-striped table-nowrap align-middle mb-0">
                  <tbody>
                    <tr>
                      <td className="fw-medium">Odometer</td>
                      <td>{vehicle?.odometer}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Engine Number</td>
                      <td>{vehicle?.engineNumber}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Year of Manufacture</td>
                      <td>{vehicle?.yearOfManufacture}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Year of Registration</td>
                      <td>{vehicle?.vehicleBodyColor}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Inspection Center</td>
                      <td>Autoterminal Japan Ltd. Nakonde Zambia</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Status</td>
                      <td>Autoterminal Japan Ltd. Nakonde Zambia</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

InspectionDetails.propTypes = {
  inspection: PropTypes.object,
};

export default InspectionDetails;
