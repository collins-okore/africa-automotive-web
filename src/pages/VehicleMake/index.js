import React, { useState, useEffect, useMemo, useCallback } from "react";
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
} from "reactstrap";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteModal from "../../Components/Common/DeleteModal";
import * as moment from "moment";

//Import actions
import {
  getVehicleMakes as onGetVehicleMake,
  deleteVehicleMake as onDeleteVehicleMake,
} from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Loader from "../../Components/Common/Loader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";
import AddVehicleMake from "./AddVehicleMake";
import UpdateVehicleMake from "./UpdateVehicleMake";

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
                      console.log("e", e);
                      setSearchValue(e.target.value);
                    }}
                    id="search-bar-0"
                    type="text"
                    className="form-control search /"
                    placeholder={"Search vehicle make title"}
                    value={searchValue || ""}
                  />
                  <i className="bx bx-search-alt search-icon"></i>
                </div>
              </Col>

              {/* {isInvoiceListFilter && (
<InvoiceListGlobalSearch />
)} */}
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

const VehicleMake = () => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.VehicleMake;
  const selectinvoiceProperties = createSelector(
    selectLayoutState,
    (state) => ({
      vehicleMake: state.vehicleMake.data,
      meta: state.vehicleMake.meta,
      error: state.error,
    })
  );
  // Inside your component
  const {
    vehicleMake: vehicleMake,
    meta,
    error,
  } = useSelector(selectinvoiceProperties);

  const [selectedRecord, setSelectedRecord] = useState({});

  //delete invoice
  const [deleteModal, setDeleteModal] = useState(false);

  // Fetch vehicle make list

  const pageSize = 10;

  useEffect(() => {
    dispatch(
      onGetVehicleMake({
        pagination: {
          page: 1,
          pageSize: pageSize,
        },
        sort: ["createdAt:desc"],
      })
    );
  }, [dispatch]);

  const onPageChange = useCallback(
    (page, sorted, searchValue) => {
      // Prepare sort obj
      let sortArray = [];
      sorted.forEach((el) => {
        sortArray.push(`${el.id}:${el.desc ? "desc" : "asc"}`);
      });

      // Prepare search object
      let searchObj = {};
      if (searchValue.length > 0) {
        searchObj = {
          ...searchObj,
          name: {
            $containsi: searchValue,
          },
        };
      }
      dispatch(
        onGetVehicleMake({
          pagination: {
            page,
            pageSize: pageSize,
          },
          sort: sortArray,
          filters: {
            ...searchObj,
          },
        })
      );
    },
    [dispatch]
  );

  // Delete Data
  const onClickDelete = (vehicleMake) => {
    setSelectedRecord(vehicleMake);
    setDeleteModal(true);
  };
  const [deleting, setDeleting] = useState();
  const handleDeleteVehicleMake = () => {
    if (selectedRecord) {
      setDeleting(true);
      dispatch(onDeleteVehicleMake(selectedRecord)).then(() => {
        setDeleting(false);
        dispatch(onGetVehicleMake());
        setDeleteModal(false);
      });
    }
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const showAddModalForm = () => {
    setIsAddModalOpen(true);
  };

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const showUpdateModalForm = (vehicleMake) => {
    setSelectedRecord(vehicleMake);
    setIsUpdateModalOpen(true);
  };

  //Column
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        id: "id",
        filterable: false,
      },
      {
        Header: "Title",
        accessor: "attributes.name",
        id: "name",
        filterable: false,
        Cell: (cell) => {
          return (
            <Link to="#" className="fw-medium link-primary">
              {cell.value}
            </Link>
          );
        },
      },
      {
        Header: "Code",
        accessor: "attributes.code",
        id: "code",
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

                <DropdownItem
                  href="#"
                  onClick={() =>
                    showUpdateModalForm({
                      id: rowData.id,
                      ...rowData.attributes,
                    })
                  }
                >
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

  document.title = "Vehicle Make List | Automotive Africa";

  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteModal
          show={deleteModal}
          onDeleteClick={() => handleDeleteVehicleMake()}
          onCloseClick={() => setDeleteModal(false)}
          loading={deleting}
        />

        <Container fluid>
          <BreadCrumb title="Vehicle Make List" pageTitle="Vehicle Makes" />

          <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">
                      Vehicle Make
                    </h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-2 flex-wrap">
                        <Link
                          to="#"
                          className="btn btn-secondary"
                          onClick={(e) => {
                            e.preventDefault();
                            showAddModalForm();
                          }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i>
                          Add Vehicle Make
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <div>
                    {vehicleMake.length > -1 ? (
                      <>
                        {/* Search and filter section */}

                        <TableContainer
                          columns={columns}
                          data={vehicleMake || []}
                          isGlobalFilter={true}
                          isAddUserList={false}
                          customPageSize={pageSize}
                          isInvoiceListFilter={true}
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
                  <AddVehicleMake
                    toggle={() => setIsAddModalOpen((state) => !state)}
                    isModalOpen={isAddModalOpen}
                  />
                  <UpdateVehicleMake
                    toggle={() => setIsUpdateModalOpen((state) => !state)}
                    isModalOpen={isUpdateModalOpen}
                    selectedRecord={selectedRecord}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default VehicleMake;
