import React from "react";

import { Row, Col, TabPane, Label, Input } from "reactstrap";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const VehicleInfo = ({
  activeTab,
  toggleTab,
  togglemodal,
  toggledeletemodal,
}) => {
  return (
    <TabPane tabId={3}>
      <div>
        <h5 className="mb-1">Shipping Information</h5>
        <p className="text-muted mb-4">Please fill all information below</p>
      </div>

      <div className="mt-4">
        <div className="d-flex align-items-center mb-2">
          <div className="flex-grow-1">
            <h5 className="fs-14 mb-0">Saved Address</h5>
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              className="btn btn-sm btn-info mb-3"
              onClick={togglemodal}
            >
              Add Address
            </button>
          </div>
        </div>
        <Row className="gy-3">
          <Col lg={4} sm={6}>
            <div className="form-check card-radio">
              <Input
                id="shippingAddress01"
                name="shippingAddress"
                type="radio"
                className="form-check-input"
                defaultChecked
              />
              <Label className="form-check-label" htmlFor="shippingAddress01">
                <span className="mb-4 fw-semibold d-block text-muted text-uppercase">
                  Home Address
                </span>

                <span className="fs-14 mb-2 d-block">Marcus Alfaro</span>
                <span className="text-muted fw-normal text-wrap mb-1 d-block">
                  4739 Bubby Drive Austin, TX 78729
                </span>
                <span className="text-muted fw-normal d-block">
                  Mo. 012-345-6789
                </span>
              </Label>
            </div>
            <div className="d-flex flex-wrap p-2 py-1 bg-light rounded-bottom border mt-n1">
              <div>
                <Link
                  to="#"
                  className="d-block text-body p-1 px-2"
                  onClick={togglemodal}
                >
                  <i className="ri-pencil-fill text-muted align-bottom me-1"></i>
                  Edit
                </Link>
              </div>
              <div>
                <Link
                  to="#"
                  className="d-block text-body p-1 px-2"
                  onClick={toggledeletemodal}
                >
                  <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i>
                  Remove
                </Link>
              </div>
            </div>
          </Col>
          <Col lg={4} sm={6}>
            <div className="form-check card-radio">
              <Input
                id="shippingAddress02"
                name="shippingAddress"
                type="radio"
                className="form-check-input"
              />
              <Label className="form-check-label" htmlFor="shippingAddress02">
                <span className="mb-4 fw-semibold d-block text-muted text-uppercase">
                  Office Address
                </span>

                <span className="fs-14 mb-2 d-block">James Honda</span>
                <span className="text-muted fw-normal text-wrap mb-1 d-block">
                  1246 Virgil Street Pensacola, FL 32501
                </span>
                <span className="text-muted fw-normal d-block">
                  Mo. 012-345-6789
                </span>
              </Label>
            </div>
            <div className="d-flex flex-wrap p-2 py-1 bg-light rounded-bottom border mt-n1">
              <div>
                <Link
                  to="#"
                  className="d-block text-body p-1 px-2"
                  onClick={togglemodal}
                >
                  <i className="ri-pencil-fill text-muted align-bottom me-1"></i>
                  Edit
                </Link>
              </div>
              <div>
                <Link
                  to="#"
                  className="d-block text-body p-1 px-2"
                  onClick={toggledeletemodal}
                >
                  <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i>
                  Remove
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        <div className="mt-4">
          <h5 className="fs-14 mb-3">Shipping Method</h5>

          <Row className="g-4">
            <Col lg={6}>
              <div className="form-check card-radio">
                <Input
                  id="shippingMethod01"
                  name="shippingMethod"
                  type="radio"
                  className="form-check-input"
                />
                <Label className="form-check-label" htmlFor="shippingMethod01">
                  <span className="fs-20 float-end mt-2 text-wrap d-block fw-semibold">
                    Free
                  </span>
                  <span className="fs-14 mb-1 text-wrap d-block">
                    Free Delivery
                  </span>
                  <span className="text-muted fw-normal text-wrap d-block">
                    Expected Delivery 3 to 5 Days
                  </span>
                </Label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-check card-radio">
                <Input
                  id="shippingMethod02"
                  name="shippingMethod"
                  type="radio"
                  className="form-check-input"
                  defaultChecked
                />
                <Label className="form-check-label" htmlFor="shippingMethod02">
                  <span className="fs-20 float-end mt-2 text-wrap d-block fw-semibold">
                    $24.99
                  </span>
                  <span className="fs-14 mb-1 text-wrap d-block">
                    Express Delivery
                  </span>
                  <span className="text-muted fw-normal text-wrap d-block">
                    Delivery within 24hrs.
                  </span>
                </Label>
              </div>
            </Col>
          </Row>
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
          Back to Personal Info
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-label right ms-auto nexttab"
          onClick={() => {
            toggleTab(activeTab + 1);
          }}
        >
          <i className="ri-bank-card-line label-icon align-middle fs-16 ms-2"></i>
          Continue to Payment
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
};

export default VehicleInfo;
