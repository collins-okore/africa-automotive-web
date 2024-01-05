import React from "react";
import {
  Form,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Spinner,
} from "reactstrap";
import PropTypes from "prop-types";

const BodyTypeForm = ({ validation, toggle, isUpdate, loading }) => {
  return (
    <Form
      className="tablelist-form"
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      <ModalBody>
        <input type="hidden" id="id-field" />

        <div className="mb-3">
          <Label htmlFor="id-field" className="form-label">
            Body Type
          </Label>
          <Input
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter vehicle body type"
            type="text"
            validate={{
              required: { value: true },
            }}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.name || ""}
            invalid={
              validation.touched.name && validation.errors.name ? true : false
            }
          />
          {validation.touched.name && validation.errors.name ? (
            <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
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
            {isUpdate ? "Update Body Type" : " Add Body Type"}
          </button>
        </div>
      </div>
    </Form>
  );
};

BodyTypeForm.propTypes = {
  validation: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

export default BodyTypeForm;
