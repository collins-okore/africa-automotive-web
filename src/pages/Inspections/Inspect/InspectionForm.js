import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addNewVehicleMake as onAddNewVehicleMake } from "../../../slices/thunks";
import PropTypes from "prop-types";
import {
  Form,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Spinner,
  Row,
} from "reactstrap";
import Dropzone from "react-dropzone";

const InspectionForm = ({ inspection }) => {
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
      dropBoxLink: Yup.string().required("Please Enter Make"),
      result: Yup.string().required("Please Enter Code"),
      remarks: Yup.string(),
    }),
    onSubmit: (values) => {
      const newVehicleMake = {
        name: values["name"],
        code: values["code"],
      };
      // save new order
      setLoading(true);
      setTimeout(1000, () => {});
      dispatch(onAddNewVehicleMake(newVehicleMake)).then(() => {
        validation.resetForm();
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
              handleAcceptedFiles(acceptedFiles);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone dz-clickable">
                <div className="dz-message needsclick" {...getRootProps()}>
                  <div className="mb-3 mt-5">
                    <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                  </div>
                  <h5>Drop files here or click to upload RWI Sheet.</h5>
                </div>
              </div>
            )}
          </Dropzone>
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
