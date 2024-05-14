import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Form, Label, Input, Row } from "reactstrap";
import constants from "../../../Components/constants";

const InspectionFormMuted = ({ inspections, tabId }) => {
  const inspection = useMemo(() => {
    return (
      inspections.find(
        (inspection) => inspection?.inspectionCount == parseInt(tabId)
      ) || {}
    );
  }, [inspections, tabId]);

  return (
    <Row>
      <Form
        className="tablelist-form"
        onSubmit={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        <div className="mb-3">
          <Label htmlFor="choices-publish-status-input" className="form-label">
            RWI Sheet
          </Label>
          <div>
            <a
              href={inspection?.rwiSheet || "#"}
              target="_blank"
              className="btn btn-primary"
              rel="noopener noreferrer"
            >
              View RWI Sheet
            </a>
          </div>
        </div>
        <div className="mb-3">
          <Label htmlFor="choices-publish-status-input" className="form-label">
            Dropbox Link
          </Label>
          <div>
            <a
              href={inspection?.dropboxlink || "#"}
              target="_blank"
              className="btn btn-primary"
              rel="noopener noreferrer"
            >
              View Dropbox Files
            </a>
          </div>
        </div>
        <div className="mb-3">
          <Label htmlFor="result-field" className="form-label">
            Inspection Result
          </Label>
          <div className="form-check mb-2">
            <Input
              disabled
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              checked={inspection?.result == constants.INSPECTION_PASSED}
            />
            <Label className="form-check-label" htmlFor="flexRadioDefault1">
              Inspection Passed
            </Label>
          </div>
          <div className="form-check">
            <Input
              disabled
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked={inspection?.result == constants.INSPECTION_FAILED}
            />
            <Label className="form-check-label" htmlFor="flexRadioDefault2">
              Inspection Failed
            </Label>
          </div>
        </div>
        <div className="mb-3">
          <Label htmlFor="customername-field" className="form-label">
            Remarks
          </Label>
          <Input
            disabled
            name="remarks"
            id="remarks"
            className="form-control"
            placeholder="Enter remarks"
            type="textarea"
            validate={{
              required: { value: true },
            }}
            value={inspection?.remarks}
          />
        </div>
      </Form>
    </Row>
  );
};

InspectionFormMuted.propTypes = {
  inspection: PropTypes.object,
  tabId: PropTypes.string,
  inspections: PropTypes.array,
};

export default InspectionFormMuted;
