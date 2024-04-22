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
import * as moment from "moment";

//Import actions
import { getPayments as onGetPayment } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Loader from "../../Components/Common/Loader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";
import AddPayment from "./AddPayment";
import UpdatePayment from "./UpdatePayment";

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
                    placeholder={"Search payments"}
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

const Payment = () => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Payment;
  const selectinvoiceProperties = createSelector(
    selectLayoutState,
    (state) => ({
      payment: state.payment.data,
      meta: state.payment.meta,
      error: state.error,
    })
  );
  // Inside your component
  const {
    payment: payment,
    meta,
    error,
  } = useSelector(selectinvoiceProperties);

  const [selectedRecord, setSelectedRecord] = useState({});

  //delete invoice
  // const [deleteModal, setDeleteModal] = useState(false);

  // Fetch vehicle make list

  const pageSize = 10;

  const fetchPayments = () => {
    onPageChange({
      page: 1,
      sorted: [{ id: "createdAt", desc: true }],
      searchValue: "",
    });
  };

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

      let sortObj = {};

      if (sorted.length > 0)
        sortObj = {
          fieldName: sorted[0]?.id,
          order: sorted[0]?.desc ? "desc" : "asc",
        };

      dispatch(
        onGetPayment({
          pagination: {
            page,
            pageSize: pageSize,
          },
          sort: sortObj,
          search: searchValue,
        })
      );
    },
    [dispatch]
  );

  const fetchUpdatedPayments = useCallback(() => {
    onPageChange(pageCache);
  }, [pageCache, onPageChange]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const showAddModalForm = () => {
    setIsAddModalOpen(true);
  };

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const showUpdateModalForm = (payment) => {
    setSelectedRecord(payment);
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
        Header: "Chasis Number",
        accessor: "chasisNumber",
        id: "chasisNumber",
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
        Header: "Paid By",
        accessor: "paidBy",
        id: "paidBy",
        filterable: false,
      },
      {
        Header: "Payment Type",
        accessor: "paymentType.name",
        id: "paymentType",
        filterable: false,
      },
      {
        Header: "Payment Mode",
        accessor: "paymentMode.name",
        id: "paymentMode",
        filterable: false,
      },
      {
        Header: "Amount",
        accessor: "amount",
        id: "amount",
        filterable: false,
        Cell: (cellProps) => {
          const rowData = cellProps.row.original;
          return <>{`${rowData.currency.name} ${rowData.amount}`}</>;
        },
      },
      {
        Header: "Reference Number",
        accessor: "referenceNumber",
        id: "referenceNumber",
        filterable: false,
      },

      {
        Header: "Created At",
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
                      ...rowData,
                    })
                  }
                >
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </DropdownItem>

                {/* <DropdownItem divider /> */}
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );

  document.title = "Payment List | Automotive Africa";

  return (
    <React.Fragment>
      <div className="page-content">
        {/* <DeleteModal
          show={deleteModal}
          onDeleteClick={() => handleDeletePayment()}
          onCloseClick={() => setDeleteModal(false)}
          loading={deleting}
        /> */}

        <Container fluid>
          <BreadCrumb title="Payments List" pageTitle="Payments" />

          <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">Payments</h5>
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
                          Add New Payment
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <div>
                    {payment.length > -1 ? (
                      <>
                        {/* Search and filter section */}

                        <TableContainer
                          columns={columns}
                          data={payment || []}
                          isGlobalFilter={true}
                          isAddUserList={false}
                          customPageSize={pageSize}
                          isInvoiceListFilter={true}
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
                  <AddPayment
                    toggle={() => setIsAddModalOpen((state) => !state)}
                    isModalOpen={isAddModalOpen}
                    fetchPayments={fetchPayments}
                  />
                  <UpdatePayment
                    toggle={() => setIsUpdateModalOpen((state) => !state)}
                    isModalOpen={isUpdateModalOpen}
                    selectedRecord={selectedRecord}
                    fetchUpdatedPayments={fetchUpdatedPayments}
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

export default Payment;
