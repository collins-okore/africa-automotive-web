import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { inspect as onInspect } from "../../../slices/thunks";
import PropTypes from "prop-types";
import {
  Form,
  Label,
  FormFeedback,
  Input,
  Spinner,
  Row,
  Card,
  Col,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const InspectionForm = ({ inspection }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      rwiSheet: "",
      dropBoxLink: "",
      result: "",
      remarks: "",
    },
    validationSchema: Yup.object({
      dropBoxLink: Yup.string().required("Please Enter dropbox link"),
      result: Yup.string().required("Please Enter result"),
      remarks: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log("Submitted values", values);

      if (!selectedFiles.length) {
        toast.error("Please upload RWI sheet.");
        return;
      }

      const formData = new FormData();
      formData.append("inspectionId", parseFloat(inspection.id));
      formData.append("dropBoxLink", values["dropBoxLink"]);
      formData.append("result", values["result"]);
      formData.append("remarks", values["remarks"]);
      selectedFiles.forEach((file) => {
        formData.append("rwiSheet", file);
      });
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onInspect(formData)).then((action) => {
        setLoading(false);
        console.log("Action", action);
        if (action.error?.message) {
          toast.error("Error while submitting inspection", {
            autoClose: 1000,
            toastId: "inspect-error",
          });
          return;
        }
        toast.success("Inspection submitted successfully", {
          autoClose: 1000,
          toastId: "inspect-success",
        });
        validation.resetForm();
        navigate("/inspections/view/" + inspection.id);
      });
    },
  });

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
    <Row>
      <Form
        className="tablelist-form"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <div className="mb-3">
          <Label htmlFor="choices-publish-status-input" className="form-label">
            RWI Sheet
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
                  <h5>Drop files here or click to upload RWI Sheet.</h5>
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
          <Label htmlFor="choices-publish-status-input" className="form-label">
            Dropbox Link
          </Label>
          <Input
            name="dropBoxLink"
            id="dropBoxLink"
            className="form-control"
            placeholder="dropBoxLink"
            type="text"
            validate={{
              required: { value: true },
            }}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.dropBoxLink || ""}
            invalid={
              validation.touched.dropBoxLink && validation.errors.dropBoxLink
                ? true
                : false
            }
          />

          {validation.touched.dropBoxLink && validation.errors.dropBoxLink ? (
            <FormFeedback type="invalid">
              {validation.errors.dropBoxLink}
            </FormFeedback>
          ) : null}
        </div>
        <div className="mb-3">
          <Label htmlFor="result-field" className="form-label">
            Inspection Result
          </Label>
          <div className="form-check mb-2">
            <Input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value={"Pass"}
              checked={validation.values.result === "Pass"}
              onChange={() => validation.setFieldValue("result", "Pass")}
              invalid={
                validation.touched.result && validation.errors.result
                  ? true
                  : false
              }
            />
            <Label className="form-check-label" htmlFor="flexRadioDefault1">
              Inspection Passed
            </Label>
          </div>

          <div className="form-check">
            <Input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value={"Fail"}
              checked={validation.values.result === "Fail"}
              onChange={() => validation.setFieldValue("result", "Fail")}
              invalid={
                validation.touched.result && validation.errors.result
                  ? true
                  : false
              }
            />

            <Label className="form-check-label" htmlFor="flexRadioDefault2">
              Inspection Failed
            </Label>
            {/* <FormFeedback type="invalid">
              {validation.errors.result}
            </FormFeedback> */}
          </div>
        </div>

        <div className="mb-3">
          <Label htmlFor="customername-field" className="form-label">
            Remarks
          </Label>
          <Input
            name="remarks"
            id="remarks"
            className="form-control"
            placeholder="Enter remarks"
            type="textarea"
            validate={{
              required: { value: true },
            }}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.remarks || ""}
            invalid={
              validation.touched.remarks && validation.errors.remarks
                ? true
                : false
            }
          />

          {validation.touched.remarks && validation.errors.remarks ? (
            <FormFeedback type="invalid">
              {validation.errors.remarks}
            </FormFeedback>
          ) : null}
        </div>
        <div className="hstack gap-2 justify-content-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading && (
              <Spinner
                color="light"
                size="sm"
                style={{ marginRight: "8px", marginBottom: "-1px" }}
              ></Spinner>
            )}
            Submit Inspection Details
          </button>
        </div>
      </Form>
    </Row>
  );
};

InspectionForm.propTypes = {
  inspection: PropTypes.object,
};

export default InspectionForm;
