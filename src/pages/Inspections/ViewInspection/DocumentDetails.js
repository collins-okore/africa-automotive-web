import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import Proptypes from "prop-types";

const DocumentDetails = ({ inspection }) => {
  return (
    <React.Fragment>
      <Col xxl={3}>
        <Card>
          <CardHeader>
            <h6 className=" fw-semibold text-uppercase   mb-0">
              Receipts, Certificates and Documents
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
                  <a
                    href={inspection?.receiptlink || "#"}
                    target="_blank"
                    className="text-primary"
                    rel="noopener noreferrer"
                  >
                    Print Payment Receipt
                  </a>
                </h6>
                <small className="text-muted">
                  {inspection?.receiptNumber || ""}
                </small>
              </div>
              <div className="hstack gap-3 fs-16">
                <a
                  href={inspection?.receiptlink || "#"}
                  target="_blank"
                  className="text-muted"
                  rel="noopener noreferrer"
                >
                  <i className="ri-download-2-line"></i>
                </a>
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
                  <a
                    href={inspection?.inspectionNoteLink || "#"}
                    target="_blank"
                    className="text-primary"
                    rel="noopener noreferrer"
                  >
                    Print Inspection Note
                  </a>
                </h6>
                <small className="text-muted">#NOTE - 69175</small>
              </div>
              <div className="hstack gap-3 fs-16">
                <a
                  href={inspection?.inspectionNoteLink || "#"}
                  target="_blank"
                  className="text-muted"
                  rel="noopener noreferrer"
                >
                  <i className="ri-download-2-line"></i>
                </a>
              </div>
            </div>
            <div className="d-flex align-items-center border border-dashed p-2 rounded mt-2">
              <div className="flex-shrink-0 avatar-sm">
                <div className="avatar-title bg-light rounded">
                  <i className="ri-file-zip-line fs-20 text-primary"></i>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">
                  <Link to={inspection?.corDoclink} className="text-primary">
                    Download COR Data
                  </Link>
                </h6>
                <small className="text-muted">AZMZMC2404040213</small>
              </div>
              <div className="hstack gap-3 fs-16">
                <Link to={inspection?.corDoclink} className="text-muted">
                  <i className="ri-download-2-line"></i>
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center border border-dashed p-2 rounded mt-2">
              <div className="flex-shrink-0 avatar-sm">
                <div className="avatar-title bg-light rounded">
                  <i className="ri-file-zip-line fs-20 text-primary"></i>
                </div>
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-1">
                  <Link to={inspection?.corDocV2Link} className="text-primary">
                    Download COR Data V2
                  </Link>
                </h6>
                <small className="text-muted">AZMZMC2404040213</small>
              </div>
              <div className="hstack gap-3 fs-16">
                <Link to={inspection?.corDocV2Link} className="text-muted">
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

DocumentDetails.propTypes = {
  inspection: Proptypes.object,
};

export default DocumentDetails;
