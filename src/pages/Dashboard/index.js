import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Widget from "./Widgets";
// import BestSellingProducts from "./BestSellingProducts";
import RecentActivity from "./RecentActivity";
// import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import Section from "./HeaderSection";
import StoreVisits from "./StoreVisits";
// import TopSellers from "./TopSellers";

const DashboardEcommerce = () => {
  document.title = "Dashboard | Africa Automotive Analysis LTD";

  const [rightColumn, setRightColumn] = useState(false);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Section rightClickBtn={toggleRightColumn} />
                <Row>
                  <Widget />
                </Row>
                {/* <Row>
                  <Col xl={8}>
                    <Revenue />
                  </Col>
                  <StoreVisits />
                </Row> */}
                {/* <Row>
                  <BestSellingProducts />
                  <TopSellers />
                </Row>
                <Row>
                  <RecentOrders />
                </Row> */}
              </div>
            </Col>
            <RecentActivity
              rightColumn={rightColumn}
              hideRightColumn={toggleRightColumn}
            />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
