import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
} from "reactstrap";
import classnames from "classnames";
import InspectionFormMuted from "./InspectionFormMuted";

// import prop types
import PropTypes from "prop-types";

const InspectionDetails = ({ inspection }) => {
  const vehicle = inspection?.vehicle;

  const [navBadgeTab, setnavBadgeTab] = useState("1");
  const navBadgeToggle = (tab) => {
    if (navBadgeTab !== tab) {
      setnavBadgeTab(tab);
    }
  };

  const [isInspection2Active, isInspection3Active] = useMemo(() => {
    // check whether to activate tab 2 and 3
    if (inspection?.inspectionCount === 1) {
      return [false, false];
    } else if (inspection?.inspectionCount === 2) {
      return [true, false];
    } else if (inspection?.inspectionCount === 3) {
      return [true, true];
    }
    return [false, false];
  }, [inspection?.inspectionCount]);

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
                      <td className="fw-medium">Vehicle Make</td>
                      <td>{vehicle?.vehicleMake || ""}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Vehicle Model</td>
                      <td>{vehicle?.vehicleModel}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Chasis Number</td>
                      <td>{vehicle?.chassisNumber}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Customs Reference Number</td>
                      <td>{vehicle?.customsReferenceNumber}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Country of Origin</td>
                      <td>{vehicle?.countryOfOrigin?.name}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col lg={6}>
                <Table className="table-striped table-nowrap align-middle mb-0">
                  <tbody>
                    <tr>
                      <td className="fw-medium">Color</td>
                      <td>{vehicle?.vehicleBodyColor}</td>
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
                      <td className="fw-medium">Odometer</td>
                      <td>{vehicle?.odometer}</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">Odometer on EC</td>
                      <td>{vehicle?.odometerOnEC}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
          <CardBody className="p-4">
            <h6 className="fw-semibold text-uppercase mb-3">
              Inspection Details
            </h6>
            <Row>
              <Col xxl={12}>
                {/* <Card>
                  <CardBody> */}
                <p className="text-muted">
                  List of all inspections conducted on this vehicle
                </p>

                <Nav tabs className="nav-tabs nav-justified mb-3">
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: navBadgeTab === "1",
                      })}
                      onClick={() => {
                        navBadgeToggle("1");
                      }}
                    >
                      1st Inspection
                      {/* <span className="badge bg-danger">Fail</span> */}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      disabled={!isInspection2Active}
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: navBadgeTab === "2",
                      })}
                      onClick={() => {
                        navBadgeToggle("2");
                      }}
                    >
                      2nd Inspection
                      {/* <span className="badge bg-success">Done</span> */}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      disabled={!isInspection3Active}
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: navBadgeTab === "3",
                      })}
                      onClick={() => {
                        navBadgeToggle("3");
                      }}
                    >
                      3rd Inspection
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={navBadgeTab} className="text-muted">
                  <TabPane tabId="1" id="nav-badge-home">
                    <InspectionFormMuted inspection={inspection} />
                  </TabPane>

                  <TabPane tabId="2" id="nav-badge-profile">
                    <InspectionFormMuted inspection={inspection} />
                  </TabPane>

                  <TabPane tabId="3" id="nav-badge-messages">
                    <InspectionFormMuted inspection={inspection} />
                  </TabPane>
                </TabContent>
                {/* </CardBody>
                </Card> */}
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
