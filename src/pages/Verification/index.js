import React from "react";
import {
  CardBody,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  Form,
  Label,
  FormFeedback,
  Input,
  UncontrolledAlert,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import InspectionDetails from "./InspectionDetails";
import DocumentDetails from "./DocumentDetails";

const Verification = () => {
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      chasisNumber: "",
      cor: "",
    },
    validationSchema: Yup.object({
      chasisNumber: Yup.string().required("Please enter chasis number"),
      cor: Yup.string().required("Please enter cor number"),
    }),

    onSubmit: (values) => {
      console.log("Received values", values);
      const data = {
        chasisNumber: values["bodyType"],
        cor: values["cor"],
      };

      // const newVehicleArray = [...vehicles, data];
      // updateInspection({ vehicles: newVehicleArray });
      // // save new vehicle
      // validation.resetForm();
      // toggle();
    },
  });
  document.title = "Verification | Automotive Africa";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Verification" pageTitle="Inspector" />

          <Row>
            <Col lg={12}>
              <Card id="verifcation">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">
                      Verification of Inspected Vehicles
                    </h5>
                    <div className="flex-shrink-0"></div>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <Form
                    className="tablelist-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      // validation.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="row mb-3 mt-2">
                      <div className="col-md-4">
                        <Label
                          htmlFor="customername-field"
                          className="form-label"
                        >
                          Chasis Number
                        </Label>
                        <Input
                          name="chasisNumber"
                          id="chasisNumber"
                          className="form-control"
                          placeholder="Enter chasis number"
                          type="text"
                          validate={{
                            required: { value: true },
                          }}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.chasisNumber || ""}
                          invalid={
                            validation.touched.chasisNumber &&
                            validation.errors.chasisNumber
                              ? true
                              : false
                          }
                        />
                        {validation.touched.chasisNumber &&
                        validation.errors.chasisNumber ? (
                          <FormFeedback type="invalid">
                            {validation.errors.chasisNumber}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-4">
                        <Label
                          htmlFor="customername-field"
                          className="form-label"
                        >
                          COR No.
                        </Label>
                        <Input
                          name="cor"
                          id="cor"
                          className="form-control"
                          placeholder="Enter COR number"
                          type="text"
                          validate={{
                            required: { value: true },
                          }}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.cor || ""}
                          invalid={
                            validation.touched.cor && validation.errors.cor
                              ? true
                              : false
                          }
                        />
                        {validation.touched.cor && validation.errors.cor ? (
                          <FormFeedback type="invalid">
                            {validation.errors.cor}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-2 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary">
                          <i className="ri-search-line"></i> Search
                        </button>
                      </div>
                    </div>
                    <div className="row mb-3 ">
                      <div className="col-md-8">
                        {/* <UncontrolledAlert
                          color="danger"
                          className="alert-border-left material-shadow mb-xl-0"
                        >
                          <i className="ri-error-warning-line me-3 align-middle fs-16"></i>
                          <strong>Required</strong> - Please enter valid chasis
                          number or COR number
                        </UncontrolledAlert> */}
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Row>
            <InspectionDetails inspection={{}} />
            <DocumentDetails inspection={{}} />
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Verification;
