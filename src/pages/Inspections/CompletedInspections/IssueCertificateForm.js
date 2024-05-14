import React, { useState } from "react";
import {
  Form,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Spinner,
  Row,
  Card,
  Col,
} from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import Flatpickr from "react-flatpickr";

const IssueCertificateForm = ({ validation, toggle, loading }) => {
  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  return (
    <Form
      className="tablelist-form"
      onSubmit={(e) => {
        e.preventDefault();
        validation.setFieldValue("files", selectedFiles);
        validation.handleSubmit();
        return false;
      }}
    >
      <ModalBody>
        <input type="hidden" id="id-field" />

        <div className="mb-3">
          <Label htmlFor="customername-field" className="form-label">
            COR Number
          </Label>
          <Input
            disabled
            name="cor"
            id="cor"
            className="form-control"
            placeholder="Enter COR"
            type="text"
            validate={{
              required: { value: true },
            }}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.cor || ""}
            invalid={
              validation.touched.cor && validation.errors.cor ? true : false
            }
          />
          {validation.touched.cor && validation.errors.cor ? (
            <FormFeedback type="invalid">{validation.errors.cor}</FormFeedback>
          ) : null}
        </div>

        <div className="mb-3">
          <Label htmlFor="choices-publish-status-input" className="form-label">
            Certificate File
          </Label>
          <Dropzone
            onDrop={(acceptedFiles) => {
              console.log("File dropped");
              handleAcceptedFiles(acceptedFiles);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone dz-clickable">
                <div className="dz-message needsclick" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="mb-3 mt-5">
                    <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                  </div>
                  <h5>Drop files here or click to upload certificate file.</h5>
                </div>
              </div>
            )}
          </Dropzone>
          <div className="list-unstyled mb-0" id="file-previews">
            {selectedFiles.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                  key={i + "-file"}
                >
                  <div className="p-2">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          data-dz-thumbnail=""
                          height="80"
                          className="avatar-sm rounded bg-light"
                          alt={f.name}
                          src={f.preview}
                        />
                      </Col>
                      <Col>
                        <Link to="#" className="text-muted font-weight-bold">
                          {f.name}
                        </Link>
                        <p className="mb-0">
                          <strong>{f.formattedSize}</strong>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="mb-3">
          <Label htmlFor="dateOfPayment-field" className="form-label">
            Date Of Issue
          </Label>
          <Flatpickr
            name="dateOfIssue"
            id="dateOfIssue-field"
            className="form-control"
            placeholder="Select a date"
            options={{
              enableTime: false,
              altInput: false,
              altFormat: "d M, Y, G:i K",
              dateFormat: "d M, Y, G:i K",
            }}
            onChange={(e) => {
              validation.setFieldValue("dateOfIssue", e[0]);
            }}
            value={validation.values.dateOfIssue || ""}
          />
          {validation.touched.dateOfIssue && validation.errors.dateOfIssue ? (
            <FormFeedback type="invalid">
              {validation.errors.dateOfIssue}
            </FormFeedback>
          ) : null}
        </div>
      </ModalBody>

      <div className="modal-footer">
        <div className="hstack gap-2 justify-content-end">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              toggle();
            }}
          >
            Close
          </button>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading && (
              <Spinner
                color="light"
                size="sm"
                style={{ marginRight: "8px", marginBottom: "-1px" }}
              ></Spinner>
            )}
            Issue Certificate
          </button>
        </div>
      </div>
    </Form>
  );
};

IssueCertificateForm.propTypes = {
  validation: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

export default IssueCertificateForm;
