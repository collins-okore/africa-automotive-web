import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";

const DocumentDetails = () => {
  return (
    <React.Fragment>
      <Col xxl={3}>
        <Card>
          <CardHeader>
            <h6 className=" fw-semibold text-uppercase   mb-0">
              Receipts,Certificates and Documents
            </h6>
          </CardHeader>
          <CardBody>
            <div className="d-flex  align-items-center border border-dashed p-2 rounded mt-2">
              <div className="flex-shrink-0 avatar-sm">
                <div className="avatar-title bg-light rounded">
                  <i className="ri-file-ppt-2-line fs-20 text-danger"></i>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">
                  <Link to="#" className="text-primary">
                    Print Payment Receipt
                  </Link>
                </h6>
                <small className="text-muted">ZN24040232#69176</small>
              </div>
              <div className="hstack gap-3 fs-16">
                <Link to="#" className="text-muted">
                  <i className="ri-download-2-line"></i>
                </Link>
              </div>
            </div>
            <div className="d-flex  align-items-center border border-dashed p-2 rounded mt-2">
              <div className="flex-shrink-0 avatar-sm">
                <div className="avatar-title bg-light rounded">
                  <i className="ri-file-ppt-2-line fs-20 text-danger"></i>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">
                  <Link to="#" className="text-primary">
                    Print Inspection Note
                  </Link>
                </h6>
                <small className="text-muted">#NOTE - 69175</small>
              </div>
              <div className="hstack gap-3 fs-16">
                <Link to="#" className="text-muted">
                  <i className="ri-download-2-line"></i>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default DocumentDetails;
