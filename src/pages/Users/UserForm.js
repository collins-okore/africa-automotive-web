import React from "react";
import {
  Form,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import PropTypes from "prop-types";

const ClientForm = ({ validation, toggle, isUpdate, loading }) => {
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

        <Row>
          <Col sm={6}>
            <div className="mb-3">
              <Label htmlFor="id-field" className="form-label">
                First Name
              </Label>
              <Input
                name="firstName"
                id="firstName"
                className="form-control"
                placeholder="Enter first name"
                type="text"
                validate={{
                  required: { value: true },
                }}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.firstName || ""}
                invalid={
                  validation.touched.firstName && validation.errors.firstName
                    ? true
                    : false
                }
              />
              {validation.touched.firstName && validation.errors.firstName ? (
                <FormFeedback type="invalid">
                  {validation.errors.firstName}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col sm={6}>
            <div className="mb-3">
              <Label htmlFor="id-field" className="form-label">
                Other Names
              </Label>
              <Input
                name="otherNames"
                id="otherNames"
                className="form-control"
                placeholder="Enter other names"
                type="text"
                validate={{
                  required: { value: true },
                }}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.otherNames || ""}
                invalid={
                  validation.touched.otherNames && validation.errors.otherNames
                    ? true
                    : false
                }
              />
              {validation.touched.otherNames && validation.errors.otherNames ? (
                <FormFeedback type="invalid">
                  {validation.errors.otherNames}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Email
              </Label>
              <Input
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                type="text"
                validate={{
                  required: { value: true },
                }}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.email || ""}
                invalid={
                  validation.touched.email && validation.errors.email
                    ? true
                    : false
                }
              />
              {validation.touched.email && validation.errors.email ? (
                <FormFeedback type="invalid">
                  {validation.errors.email}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Phone Code
              </Label>
              <Input
                name="phoneCode"
                id="phoneCode"
                className="form-control"
                placeholder="Enter phone code"
                type="text"
                validate={{
                  required: { value: true },
                }}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.phoneCode || ""}
                invalid={
                  validation.touched.phoneCode && validation.errors.phoneCode
                    ? true
                    : false
                }
              />
              {validation.touched.phoneCode && validation.errors.phoneCode ? (
                <FormFeedback type="invalid">
                  {validation.errors.phoneCode}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col sm={9}>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Phone Number
              </Label>
              <Input
                name="phoneNumber"
                id="phoneNumber"
                className="form-control"
                placeholder="Enter phone number"
                type="text"
                validate={{
                  required: { value: true },
                }}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.phoneNumber || ""}
                invalid={
                  validation.touched.phoneNumber &&
                  validation.errors.phoneNumber
                    ? true
                    : false
                }
              />
              {validation.touched.phoneNumber &&
              validation.errors.phoneNumber ? (
                <FormFeedback type="invalid">
                  {validation.errors.phoneNumber}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Postal Code
              </Label>
              <Input
                name="postalCode"
                id="postalCode"
                className="form-control"
                placeholder="Enter postal code"
                type="text"
                validate={{
                  required: { value: true },
                }}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.postalCode || ""}
                invalid={
                  validation.touched.postalCode && validation.errors.postalCode
                    ? true
                    : false
                }
              />
              {validation.touched.postalCode && validation.errors.postalCode ? (
                <FormFeedback type="invalid">
                  {validation.errors.postalCode}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col sm={12}>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Postal Address
              </Label>
              <Input
                name="postalAddress"
                id="postalAddress"
                className="form-control"
                placeholder="Enter phone number"
                type="textarea"
                validate={{
                  required: { value: true },
                }}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.postalAddress || ""}
                invalid={
                  validation.touched.postalAddress &&
                  validation.errors.postalAddress
                    ? true
                    : false
                }
              />
              {validation.touched.postalAddress &&
              validation.errors.postalAddress ? (
                <FormFeedback type="invalid">
                  {validation.errors.postalAddress}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm={6}>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                ID or Passport Number
              </Label>
              <Input
                name="idOrPassportNumber"
                id="idOrPassportNumber"
                className="form-control"
                placeholder="Enter postal code"
                type="text"
                validate={{
                  required: { value: true },
                }}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.idOrPassportNumber || ""}
                invalid={
                  validation.touched.idOrPassportNumber &&
                  validation.errors.idOrPassportNumber
                    ? true
                    : false
                }
              />
              {validation.touched.idOrPassportNumber &&
              validation.errors.idOrPassportNumber ? (
                <FormFeedback type="invalid">
                  {validation.errors.idOrPassportNumber}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
          <Col sm={6}>
            <div className="mb-3">
              <Label htmlFor="customername-field" className="form-label">
                Tin Number
              </Label>
              <Input
                name="tpinNumber"
                id="tpinNumber"
                className="form-control"
                placeholder="Enter phone number"
                type="text"
                validate={{
                  required: { value: true },
                }}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.tpinNumber || ""}
                invalid={
                  validation.touched.tpinNumber && validation.errors.tpinNumber
                    ? true
                    : false
                }
              />
              {validation.touched.tpinNumber && validation.errors.tpinNumber ? (
                <FormFeedback type="invalid">
                  {validation.errors.tpinNumber}
                </FormFeedback>
              ) : null}
            </div>
          </Col>
        </Row>
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
            {isUpdate ? "Update Client" : " Add Client"}
          </button>
        </div>
      </div>
    </Form>
  );
};

ClientForm.propTypes = {
  validation: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

export default ClientForm;
