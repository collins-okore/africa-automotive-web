import React, { useState, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CertifiedInspections from "./CertifiedInspections";
import UnCertifiedInspections from "./UncertifiedInspections";

const CompletedInspections = () => {
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.title = "Completed Inspections | Automotive Africa";
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Inspections" pageTitle="Completed Inspections" />
        <Row>
          <Col lg={12}>
            <Card id="inspectionList">
              <CardHeader className="border-0">
                <Row className="align-items-center gy-3">
                  <div className="col-sm">
                    <h5 className="card-title mb-0">Completed Inspections</h5>
                  </div>
                  <div className="col-sm-auto"></div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0">
                <div>
                  <Nav
                    className="nav-tabs nav-tabs-custom nav-success"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "1" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("1", "all");
                        }}
                        href="#"
                      >
                        <i className="ri-checkbox-circle-line    me-1 align-bottom"></i>{" "}
                        Certified
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "2" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("2", "Delivered");
                        }}
                        href="#"
                      >
                        <i className=" ri-close-circle-line me-1 align-bottom"></i>{" "}
                        Uncertified
                      </NavLink>
                    </NavItem>
                  </Nav>
                  {/* Tab Panes */}

                  <TabContent activeTab={activeTab} className="text-muted">
                    <TabPane tabId="1" id="nav-badge-home">
                      <CertifiedInspections />
                    </TabPane>

                    <TabPane tabId="2" id="nav-badge-profile">
                      <UnCertifiedInspections />
                    </TabPane>
                  </TabContent>
                </div>

                <ToastContainer closeButton={false} limit={1} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CompletedInspections;
