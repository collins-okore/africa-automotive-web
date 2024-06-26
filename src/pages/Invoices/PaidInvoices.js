import React, { useState, useMemo, useCallback } from "react";
import {
  CardBody,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import * as moment from "moment";

//Import actions
import { getInspections as onGetInspections } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Loader from "../../Components/Common/Loader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

const FilterSection = ({ searchValue, setSearchValue }) => {
  return (
    <Row className="mb-3">
      <React.Fragment>
        <CardBody className="border border-dashed border-end-0 border-start-0">
          <form>
            <Row>
              <Col sm={5}>
                <div className={"search-box me-2 mb-2 d-inline-block col-12"}>
                  <input
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    id="search-bar-0"
                    type="text"
                    className="form-control search /"
                    placeholder={"Search paid invoices..."}
                    value={searchValue || ""}
                  />
                  <i className="bx bx-search-alt search-icon"></i>
                </div>
              </Col>

              {searchValue.length > 0 ? (
                <Col sm={4} xxl={1}>
                  <Button
                    color="primary"
                    className="w-400"
                    style={{ paddingInline: 10 }}
                    onClick={() => setSearchValue("")}
                  >
                    <i className="ri-close-fill me-1 align-bottom"></i>
                    Filters
                  </Button>
                </Col>
              ) : null}
            </Row>
          </form>
        </CardBody>
      </React.Fragment>
    </Row>
  );
};

FilterSection.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  getSearchResults: PropTypes.func,
};

const PaidInvoices = () => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Inspections;
  const selectinvoiceProperties = createSelector(
    selectLayoutState,
    (state) => ({
      inspections: state.inspections.data,
      meta: state.inspections.meta,
      error: state.error,
    })
  );
  // Inside your component
  const {
    inspections: inspections,
    meta,
    error,
  } = useSelector(selectinvoiceProperties);

  // Fetch vehicle make list

  const pageSize = 10;

  const [pageCache, setPageCache] = useState({
    page: 1,
    sorted: [{ id: "createdAt", desc: true }],
    searchValue: "",
  });

  const onPageChange = useCallback(
    ({ page, sorted, searchValue }) => {
      if (sorted.length === 0) {
        sorted.push({ id: "createdAt", desc: true });
      }
      setPageCache({ page, sorted, searchValue });

      // Prepare sort obj
      let sortArray = [];
      sorted.forEach((el) => {
        if (el.id !== "vehicleMake") {
          sortArray.push(`${el.id}:${el.desc ? "desc" : "asc"}`);
        }
      });

      // Prepare search object
      let searchObj = {};
      if (searchValue.length > 0) {
        searchObj = {
          ...searchObj,
          $or: [
            {
              name: {
                $containsi: searchValue,
              },
            },
            {
              vehicleMake: {
                name: {
                  $containsi: searchValue,
                },
              },
            },
          ],
        };
      }

      dispatch(
        onGetInspections({
          pagination: {
            page,
            pageSize: pageSize,
          },
          populate: [
            {
              vehicle: {},
            },
          ],
          sort: sortArray,
          filters: {
            ...searchObj,
          },
        })
      );
    },
    [dispatch]
  );

  //Column
  const columns = useMemo(
    () => [
      {
        Header: "Invoice No.",
        accessor: "id",
        id: "invoiceNo",
        filterable: false,
      },
      // {
      //   Header: "#INS",
      //   accessor: "attributes.name",
      //   id: "name",
      //   filterable: false,
      //   Cell: (cell) => {
      //     return (
      //       <Link to="#" className="fw-medium link-primary">
      //         {cell.value}
      //       </Link>
      //     );
      //   },
      // },

      {
        Header: "Client",
        accessor: "client",
        id: "client",
        filterable: false,
        Cell: (cellProps) => {
          const rowData = cellProps.row.original;
          return (
            <Link to="#" className="fw-medium link-primary">
              {`${rowData.client?.user?.firstName} ${rowData.client?.user?.otherNames}`}
            </Link>
          );
        },
      },

      {
        Header: "Chasis Number",
        accessor: "vehicle.chassisNumber",
        id: "chassisNumber",
        filterable: false,
      },
      {
        Header: "Customs Ref No",
        accessor: "vehicle.vehicleMake",
        id: "customsRefereneceNumber",
        filterable: false,
      },
      {
        Header: "Inspection Fee",
        accessor: "id",
        id: "insepctionFee",
        filterable: false,
        Cell: (cell) => {
          return (
            <Link to="#" className="fw-medium link-primary">
              {`#INS-${cell?.value}`}
            </Link>
          );
        },
      },

      {
        Header: "Invoice Date",
        accessor: "payment.status",
        id: "invoiceDate",
        filterable: false,
        Cell: (cell) => {
          switch (cell.value) {
            case "Paidz":
              return (
                <span className="badge text-uppercase bg-success-subtle text-success">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            case "Pendingz":
              return (
                <span className="badge text-uppercase bg-warning-subtle text-warning">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            case "Cancelledz":
              return (
                <span className="badge text-uppercase bg-danger-subtle text-danger">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            default:
              return (
                <span className="badge text-uppercase bg-primary-subtle text-primary">
                  Passed
                </span>
              );
          }
        },
      },

      {
        Header: "Date of Inspection",
        accessor: "createdAt",
        id: "createdAt",
        filterable: false,
        Cell: (cell) => {
          const date = moment(new Date(cell?.value)).format("DD MMM Y");
          const time = moment(new Date(cell?.value)).format("hh:mm A");
          return (
            <>
              {date} <small className="text-muted">{time}</small>
            </>
          );
        },
      },

      {
        Header: "Action",
        id: "action",
        Cell: (cellProps) => {
          const rowData = cellProps.row.original;
          return (
            <>
              <Button size="sm" color="secondary" style={{ marginRight: 5 }}>
                View Receipt
              </Button>
            </>
          );
        },
      },
    ],
    []
  );

  document.title = "Paid Invoices | Automotive Africa";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Paid Invoices" pageTitle="Invoices" />

          <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">
                      Paid Invoices
                    </h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-2 flex-wrap"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <div>
                    {inspections.length > -1 ? (
                      <>
                        {/* Search and filter section */}

                        <TableContainer
                          columns={columns}
                          data={inspections || []}
                          customPageSize={pageSize}
                          pagination={meta}
                          onPageChange={onPageChange}
                          FilterSection={FilterSection}
                          className="custom-header-css"
                          divClass="table-responsive table-card mb-4"
                          tableClass="align-middle table-nowrap mb-0"
                          theadClass="table-light table-nowrap"
                          thClass="table-light text-muted"
                          SearchPlaceholder={""}
                        />
                      </>
                    ) : (
                      <Loader error={error} />
                    )}
                    <ToastContainer closeButton={false} limit={1} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PaidInvoices;
