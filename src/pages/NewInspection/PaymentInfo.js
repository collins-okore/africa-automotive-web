import React from "react";

import { Row, Col, Card, TabPane, Label, Input } from "reactstrap";
import PropTypes from "prop-types";

const PaymentInfo = ({ toggleTab, activeTab }) => {
  return (
    <TabPane tabId={2}>
      <div>
        <h5 className="mb-1">Payment Selection</h5>
        <p className="text-muted mb-4">
          Please select and enter your billing information
        </p>
      </div>

      <Row className="g-4">
        <Col lg={4} sm={6}>
          <div>
            <div className="form-check card-radio">
              <Input
                id="paymentMethod01"
                name="paymentMethod"
                type="radio"
                className="form-check-input"
              />
              <Label className="form-check-label" htmlFor="paymentMethod01">
                <span className="fs-16 text-muted me-2">
                  <i className="ri-paypal-fill align-bottom"></i>
                </span>
                <span className="fs-14 text-wrap">Paypal</span>
              </Label>
            </div>
          </div>
        </Col>
        <Col lg={4} sm={6}>
          <div>
            <div className="form-check card-radio">
              <Input
                id="paymentMethod02"
                name="paymentMethod"
                type="radio"
                className="form-check-input"
                defaultChecked
              />
              <Label className="form-check-label" htmlFor="paymentMethod02">
                <span className="fs-16 text-muted me-2">
                  <i className="ri-bank-card-fill align-bottom"></i>
                </span>
                <span className="fs-14 text-wrap">Credit / Debit Card</span>
              </Label>
            </div>
          </div>
        </Col>

        <Col lg={4} sm={6}>
          <div>
            <div className="form-check card-radio">
              <Input
                id="paymentMethod03"
                name="paymentMethod"
                type="radio"
                className="form-check-input"
              />
              <Label className="form-check-label" htmlFor="paymentMethod03">
                <span className="fs-16 text-muted me-2">
                  <i className="ri-money-dollar-box-fill align-bottom"></i>
                </span>
                <span className="fs-14 text-wrap">Cash on Delivery</span>
              </Label>
            </div>
          </div>
        </Col>
      </Row>

      <div className="collapse show" id="paymentmethodCollapse">
        <Card className="p-4 border shadow-none mb-0 mt-4">
          <Row className="gy-3">
            <Col md={12}>
              <Label htmlFor="cc-name" className="form-label">
                Name on card
              </Label>
              <Input
                type="text"
                className="form-control"
                id="cc-name"
                placeholder="Enter name"
              />
              <small className="text-muted">
                Full name as displayed on card
              </small>
            </Col>

            <Col md={6}>
              <Label htmlFor="cc-number" className="form-label">
                Credit card number
              </Label>
              <Input
                type="text"
                className="form-control"
                id="cc-number"
                placeholder="xxxx xxxx xxxx xxxx"
              />
            </Col>

            <Col md={3}>
              <Label htmlFor="cc-expiration" className="form-label">
                Expiration
              </Label>
              <Input
                type="text"
                className="form-control"
                id="cc-expiration"
                placeholder="MM/YY"
              />
            </Col>

            <Col md={3}>
              <Label htmlFor="cc-cvv" className="form-label">
                CVV
              </Label>
              <Input
                type="text"
                className="form-control"
                id="cc-cvv"
                placeholder="xxx"
              />
            </Col>
          </Row>
        </Card>
        <div className="text-muted mt-2 fst-italic">
          <i data-feather="lock" className="text-muted icon-xs"></i> Your
          transaction is secured with SSL encryption
        </div>
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
          Back to Shipping
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-label right ms-auto nexttab"
          onClick={() => {
            toggleTab(activeTab + 1);
          }}
        >
          <i className="ri-shopping-basket-line label-icon align-middle fs-16 ms-2"></i>
          Complete Order
        </button>
      </div>
    </TabPane>
  );
};

PaymentInfo.propTypes = {
  toggleTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
};

export default PaymentInfo;
