import React, { useState } from "react";

import { CardBody, Row, Col, Card, TabPane, Spinner } from "reactstrap";

import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import * as moment from "moment";
import { useNavigate } from "react-router-dom";

import { addNewInspection as onAddNewInspection } from "../../slices/thunks";

const Finish = ({ inspection }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const bookInspection = () => {
    setLoading(true);

    const vehicles = inspection.vehicles.map((el) => {
      return {
        ...el,
        countryId: el.countryOfOrigin.value,
        vehicleTransmission: el.transmission,
        inspectionDate: el.inspectionDate,
        vehicleBodyType: el.bodyType,
        vehicleFuelType: el.fuelType,
        vehicleBodyColor: el.color,
      };
    });

    const newInspection = {
      clientId: inspection.client?.id,
      vehicles,
      paymentId: inspection.payment?.id,
    };
    dispatch(onAddNewInspection(newInspection)).then((result) => {
      setLoading(false);
      console.log("Result", result);
      if (result?.payload?.data) {
        console.log("Inspection booked successfully", result?.payload?.data);
        // Redirect to view inspection page
        navigate(`/inspections/new`);
      }
    });
  };

  const client = inspection?.client || null;
  const payment = inspection?.payment || null;

  return (
    <TabPane tabId={4} id="pills-finish">
      <div className=" ">
        <div className="mb-4">
          <lord-icon
            src="https://cdn.lordicon.com/lupuorrc.json"
            trigger="loop"
            colors="primary:#0ab39c,secondary:#405189"
            style={{ width: "120px", height: "120px" }}
          ></lord-icon>
        </div>
        <h5>Inspection Confirmation</h5>
        <p className="text-muted">
          Please Confirm all the details of inspection then submit
        </p>

        <Row className="">
          <Col xxl={12}>
            <Card className="border shadow-none mb-0 mt-4">
              <Row>
                <Col lg={12}>
                  <CardBody className="p-4 ">
                    <Row className="g-3">
                      <Col lg={3} xs={6}>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                          Inspection No
                        </p>
                        <h5 className="fs-14 mb-0">
                          #ZMXC<span id="invoice-no">XXXXXX</span>
                        </h5>
                      </Col>
                      <Col lg={3} xs={6}>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                          Inspection Booked On
                        </p>
                        <h5 className="fs-14 mb-0">
                          <span id="invoice-date">
                            {moment(new Date()).format("DD MMM Y")}
                          </span>{" "}
                          {/* <small className="text-muted" id="invoice-time">
                            02:36PM
                          </small> */}
                        </h5>
                      </Col>
                      <Col lg={3} xs={6}>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                          Payment Status
                        </p>
                        <span
                          className="badge bg-success-subtle text-success fs-11"
                          id="payment-status"
                        >
                          {payment?.paymentMode?.code === "MOBILE_MONEY" ||
                          payment?.paymentMode?.code === "BANK_DEPOSIT" ||
                          payment?.paymentMode?.code === "BANK_TRANSFER"
                            ? "Paid"
                            : "Unpaid"}
                        </span>
                      </Col>
                      <Col lg={3} xs={6}>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                          Total Amount
                        </p>
                        <h5 className="fs-14 mb-0">
                          {payment?.currency?.name}
                          <span id="total-amount">{` ${payment?.amount}`}</span>
                        </h5>
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
                <Col lg={12}>
                  <CardBody className="p-4 border-top border-top-dashed">
                    <Row className="g-3">
                      <Col sm={6}>
                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                          Client Details
                        </h6>
                        <p className="fw-medium mb-2" id="billing-name">
                          {`${client?.user?.firstName || ""} ${
                            client?.user?.otherNames || ""
                          }`}
                        </p>

                        <p className="text-muted mb-1">
                          <span>Phone: +</span>
                          <span id="billing-phone-no">
                            ({`${client?.user?.phoneCode}`}){" "}
                            {`${client?.user?.phoneNumber}`}
                          </span>
                        </p>
                        <p className="text-muted mb-1">
                          <span>Tpin Number: </span>
                          <span id="billing-tax-no">{`${client?.user?.tpinNumber}`}</span>
                        </p>
                        <p className="text-muted mb-1">
                          <span>Postal Address: </span>
                          <span id="billing-tax-no">{`${client?.user?.postalCode} ${client?.user?.postalAddress}`}</span>
                        </p>
                        <p className="text-muted mb-1">
                          <span>Id Or Passport Number: </span>
                          <span id="billing-tax-no">{`${client?.user?.idOrPassportNumber}`}</span>
                        </p>
                      </Col>
                      <Col sm={6}>
                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                          Payment Details
                        </h6>
                        <p className="fw-medium mb-2" id="shipping-name">
                          {`${payment?.paymentMode?.name}`}
                        </p>

                        <p className="text-muted mb-1">
                          <span>Tax Invoice Number: </span>
                          <span id="shipping-phone-no">{`${payment?.taxInvoiceNumber}`}</span>
                        </p>
                        <p className="text-muted mb-1">
                          <span>Amount: </span>
                          <span id="shipping-phone-no">{`${payment?.currency?.name} ${payment?.amount}`}</span>
                        </p>
                        <p className="text-muted mb-1">
                          <span>Payment Type: </span>
                          <span id="shipping-phone-no">{`${payment?.paymentType?.name}`}</span>
                        </p>
                        <p className="text-muted mb-1">
                          <span>Receipt Number: </span>
                          <span id="shipping-phone-no">{`${payment?.receiptNumber}`}</span>
                        </p>
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <div className="d-flex align-items-start gap-3 mt-4">
          <button
            type="button"
            className="btn btn-secondary btn-label right ms-auto nexttab"
            onClick={() => {
              bookInspection();
            }}
          >
            <i className="ri-check-double-line label-icon align-middle fs-16 ms-2"></i>
            {loading && (
              <Spinner
                color="light"
                size="sm"
                style={{ marginRight: "8px", marginBottom: "-1px" }}
              ></Spinner>
            )}
            Submit Inspection
          </button>
        </div>

        {/* <h3 className="fw-semibold">
          Order ID:{" "}
          <a
            href="apps-ecommerce-order-details"
            className="text-decoration-underline"
          >
            VZ2451
          </a>
        </h3> */}
      </div>
    </TabPane>
  );
};

Finish.propTypes = {
  inspection: PropTypes.object,
};

export default Finish;
