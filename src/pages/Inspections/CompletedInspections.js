import React, { useState, useMemo, useCallback } from "react";
import {
  CardBody,
  Row,
  Col,
  Card,
  Container,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteModal from "../../Components/Common/DeleteModal";
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
                    placeholder={"Search inspections"}
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

const CompletedInspections = () => {
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

  const [selectedRecord, setSelectedRecord] = useState({});

  //delete invoice
  const [deleteModal, setDeleteModal] = useState(false);

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

  const fetchUpdatedInspections = useCallback(() => {
    onPageChange(pageCache);
  }, [pageCache, onPageChange]);

  // Delete Data
  const onClickDelete = (vehicleModel) => {
    setSelectedRecord(vehicleModel);
    setDeleteModal(true);
  };
  const [deleting, setDeleting] = useState();
  const handleDelete = () => {
    if (selectedRecord) {
      // setDeleting(true);
      // dispatch(onDeleteInspections(selectedRecord)).then(() => {
      //   setDeleting(false);
      //   fetchUpdatedInspections();
      //   setDeleteModal(false);
      // });
    }
  };

  //Column
  const columns = useMemo(
    () => [
      {
        Header: "Inspection No",
        accessor: "id",
        id: "id",
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
        Header: "Vehicle Make",
        accessor: "vehicle.vehicleMake",
        id: "vehicleMake",
        filterable: false,
      },

      {
        Header: "Vehicle Model",
        accessor: "vehicle.vehicleModel",
        id: "vehicleModel",
        filterable: false,
      },
      {
        Header: "Chasis Number",
        accessor: "vehicle.chasisNumber",
        id: "chasisNumber",
        filterable: false,
      },
      {
        Header: "COR",
        accessor: "cor",
        id: "cor",
        filterable: false,
      },
      {
        Header: "Payment Status",
        accessor: "attributes.code",
        id: "status",
        filterable: false,
      },
      {
        Header: "Date of Inspection",
        accessor: "attributes.code",
        id: "dateOfInspection",
        filterable: false,
      },

      {
        Header: "Created At",
        accessor: "attributes.createdAt",
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
            <UncontrolledDropdown>
              <DropdownToggle
                href="#"
                className="btn btn-soft-secondary btn-sm dropdown"
                tag="button"
              >
                <i className="ri-more-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end" end>
                {/* <DropdownItem href="/apps-invoices-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem> */}

                <DropdownItem href="#" onClick={() => {}}>
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem
                  href="#"
                  onClick={() => {
                    onClickDelete({
                      id: rowData.id,
                      ...rowData.attributes,
                    });
                  }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );

  document.title = "Inspection List | Automotive Africa";

  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteModal
          show={deleteModal}
          onDeleteClick={() => handleDelete()}
          onCloseClick={() => setDeleteModal(false)}
          loading={deleting}
        />

        <Container fluid>
          <BreadCrumb
            title="Completed Inspections List"
            pageTitle="Inspections"
          />

          <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">
                      Completed Inspections
                    </h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-2 flex-wrap">
                        <Link
                          to="/new-inspection"
                          className="btn btn-secondary"
                        >
                          <i className="ri-add-line align-bottom me-1"></i>
                          New Inspection
                        </Link>
                      </div>
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
                          pagination={meta?.pagination}
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

export default CompletedInspections;
