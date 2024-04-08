import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import classnames from "classnames";
import PassedInspections from "./PassedInspections";
import FailedInspections from "./FailedInspections";

const ReportSearchResults = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div>
      <Card>
        <div className="card-header border-0">
          <Row className=" align-items-center">
            <Col>
              <Nav
                className="nav-tabs-custom card-header-tabs border-bottom-0"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    className={classnames(
                      { active: activeTab === "1" },
                      "fw-semibold"
                    )}
                    onClick={() => {
                      toggleTab("1");
                    }}
                    href="#"
                  >
                    Passed Inspections
                    <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                      12
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames(
                      { active: activeTab === "2" },
                      "fw-semibold"
                    )}
                    onClick={() => {
                      toggleTab("2");
                    }}
                    href="#"
                  >
                    Failed Inspections
                    <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                      5
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <div className="col-auto">
              <UncontrolledButtonDropdown id="btnGroupDrop1">
                <DropdownToggle color="secondary    " caret>
                  Export Report
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem> Pdf </DropdownItem>
                  <DropdownItem> Excel </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </Row>
        </div>
        <div className="card-body pt-0">
          <TabContent activeTab={activeTab} className="text-muted">
            <TabPane tabId="1" id="nav-passed-inspections">
              <PassedInspections />
            </TabPane>

            <TabPane tabId="2" id="nav-passed-inspections">
              <FailedInspections />
            </TabPane>
          </TabContent>
        </div>

        {/* <div className="card-body">
          <TabContent className="text-muted">
            <TabPane>
              <div
                id="table-product-list-all"
                className="table-card gridjs-border-none pb-2"
              >
              </div>
            </TabPane>
          </TabContent>
        </div> */}
      </Card>
    </div>
  );
};

export default ReportSearchResults;
