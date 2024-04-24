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
  Spinner,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import VehicleMake from "../NewInspection/VehicleInfo/VehicleMake";
import VehicleModel from "../NewInspection/VehicleInfo/VehicleModel";
import VehicleBodyType from "../NewInspection/VehicleInfo/VehicleBodyType";
import years from "../../common/lib/listOfYears";
import CountryOfOrigin from "../NewInspection/VehicleInfo/CountryOfOrigin";
import VehicleBodyColor from "../NewInspection/VehicleInfo/VehicleBodyColor";
import ReportSearchResults from "./ReportSearchResults";

const Reports = () => {
  const [loading, setLoading] = React.useState(false);
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      vehicleMake: {
        value: "",
        label: "",
      },
      vehicleModel: {
        value: "",
        label: "",
      },
      bodyType: "",
      yearOfManufacture: "",
      color: "",
      odometer: "",
      odometerRange: "",
      countryOfOrigin: {
        value: "",
        label: "",
      },
      dateFrom: "",
      dateTo: "",
    },
    validationSchema: Yup.object({
      vehicleMake: Yup.object().shape({
        value: Yup.string().required("Please select vehicle make"),
        label: Yup.string().required("Please select vehicle make"),
      }),
      vehicleModel: Yup.object().shape({
        value: Yup.string().required("Please select vehicle model"),
        label: Yup.string().required("Please select vehicle model"),
      }),
      bodyType: Yup.string().required("Please enter body type"),
      yearOfManufacture: Yup.string().required(
        "Please enter year of manufacture"
      ),
      color: Yup.string().required("Please enter vehicle color"),
      odometer: Yup.string().required("Please enter odometer"),
      odometerRange: Yup.string().required("Please enter odometer"),
      countryOfOrigin: Yup.object().shape({
        value: Yup.number().required("Please select country of origin"),
        label: Yup.string().required("Please select country of origin"),
      }),
      dateFrom: Yup.string().required("Please select date from"),
      dateTo: Yup.string().required("Please select date to"),
    }),

    onSubmit: (values) => {
      console.log("Received values", values);
      // const data = {
      //   chassisNumber: values["bodyType"],
      //   cor: values["cor"],
      // };

      // const newVehicleArray = [...vehicles, data];
      // updateInspection({ vehicles: newVehicleArray });
      // // save new vehicle
      // validation.resetForm();
      // toggle();
    },
  });
  document.title = "Reports | Automotive Africa";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Reports" pageTitle="Reports" />

          <Row>
            <Col lg={12}>
              <Card id="verifcation">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">Filters</h5>
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
                    <div className="row gy-1 mb-3 mt-2">
                      <div className="col-md-3 ">
                        <VehicleMake
                          validation={validation}
                          loading={loading}
                          setLoading={setLoading}
                        />
                      </div>
                      <div className="col-md-3">
                        <VehicleModel
                          validation={validation}
                          loading={loading}
                          setLoading={setLoading}
                        />
                      </div>
                      <div className="col-md-3 ">
                        <VehicleBodyType validation={validation} />
                      </div>
                      <div className="col-md-3 ">
                        <Label
                          htmlFor="choices-publish-status-input"
                          className="form-label"
                        >
                          Year of Manufacture
                        </Label>
                        <Input
                          name="yearOfManufacture"
                          type="select"
                          className="form-select"
                          id="choices-publish-body-input"
                          placeholder="Select year of manufacture"
                          onChange={(e) => {
                            validation.setFieldValue(
                              "yearOfManufacture",
                              e.target.value
                            );
                          }}
                          onBlur={() =>
                            validation.setFieldTouched(
                              "yearOfManufacture",
                              true
                            )
                          }
                          value={validation.values.yearOfManufacture || ""}
                        >
                          <option value="" disabled selected>
                            Select an option
                          </option>
                          {years.map((yearOfManufacture) => (
                            <option
                              value={yearOfManufacture}
                              key={yearOfManufacture}
                            >
                              {yearOfManufacture}
                            </option>
                          ))}
                        </Input>
                        {validation.touched.yearOfManufacture &&
                        validation.errors.yearOfManufacture ? (
                          <FormFeedback type="invalid">
                            {validation.errors.yearOfManufacture}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <Label
                          htmlFor="choices-publish-status-input"
                          className="form-label"
                        >
                          Odometer Range
                        </Label>
                        <Input
                          name="odometerRange"
                          id="odometerRange"
                          className="form-control"
                          placeholder="OdometerRange"
                          type="text"
                          validate={{
                            required: { value: true },
                          }}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.odometerRange || ""}
                          invalid={
                            validation.touched.odometerRange &&
                            validation.errors.odometerRange
                              ? true
                              : false
                          }
                        />
                        {validation.touched.odometerRange &&
                        validation.errors.odometerRange ? (
                          <FormFeedback type="invalid">
                            {validation.errors.odometerRange}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-3">
                        <CountryOfOrigin validation={validation} />
                      </div>
                      <div className="col-md-3">
                        <VehicleBodyColor validation={validation} />
                      </div>
                      <div className="col-md-3 ">
                        <Label
                          htmlFor="choices-publish-status-input"
                          className="form-label"
                        >
                          Odometer
                        </Label>
                        <Input
                          name="odometer"
                          id="odometer"
                          className="form-control"
                          placeholder="Odometer"
                          type="text"
                          validate={{
                            required: { value: true },
                          }}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.odometer || ""}
                          invalid={
                            validation.touched.odometer &&
                            validation.errors.odometer
                              ? true
                              : false
                          }
                        />
                        {validation.touched.odometer &&
                        validation.errors.odometer ? (
                          <FormFeedback type="invalid">
                            {validation.errors.odometer}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-6 ">
                        <Label
                          htmlFor="dateOfPayment-field"
                          className="form-label"
                        >
                          Date From
                        </Label>
                        <Flatpickr
                          name="dateFrom"
                          id="dateFrom"
                          className="form-control"
                          placeholder="Select a date"
                          options={{
                            enableTime: true,
                            altInput: true,
                            altFormat: "d M, Y, G:i K",
                            dateFormat: "d M, Y, G:i K",
                          }}
                          onChange={(e) => {
                            validation.setFieldValue("dateFrom", e && e[0]);
                          }}
                          value={validation.values.dateFrom || ""}
                        />
                        {validation.touched.dateFrom &&
                        validation.errors.dateFrom ? (
                          <FormFeedback type="invalid">
                            {validation.errors.dateFrom}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="col-md-6 ">
                        <Label
                          htmlFor="dateOfPayment-field"
                          className="form-label"
                        >
                          Date To
                        </Label>
                        <Flatpickr
                          name="dateTo"
                          id="dateTo"
                          className="form-control"
                          placeholder="Select a date"
                          options={{
                            enableTime: true,
                            altInput: true,
                            altFormat: "d M, Y, G:i K",
                            dateFormat: "d M, Y, G:i K",
                          }}
                          onChange={(e) => {
                            validation.setFieldValue("dateTo", e && e[0]);
                          }}
                          value={validation.values.dateTo || ""}
                        />
                        {validation.touched.dateTo &&
                        validation.errors.dateTo ? (
                          <FormFeedback type="invalid">
                            {validation.errors.dateTo}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading && (
                            <Spinner
                              color="light"
                              size="sm"
                              style={{
                                marginRight: "8px",
                                marginBottom: "-1px",
                              }}
                            ></Spinner>
                          )}
                          <i className="ri-search-line"></i> Search
                        </button>
                        <button
                          type="submit"
                          className="btn btn-outline-secondary"
                          disabled={loading}
                        >
                          {loading && (
                            <Spinner
                              color="light"
                              size="sm"
                              style={{
                                marginRight: "8px",
                                marginBottom: "-1px",
                              }}
                            ></Spinner>
                          )}
                          <i className="ri-close-line"></i> Clear Filters
                        </button>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={12} lg={12}>
              <ReportSearchResults />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Reports;
