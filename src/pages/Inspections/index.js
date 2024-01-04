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
import * as moment from "moment";
import CountUp from "react-countup";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteModal from "../../Components/Common/DeleteModal";

//Import Icons
import FeatherIcon from "feather-icons-react";

//Import actions
import {
  getInspections as onGetInspections,
  deleteInvoice as onDeleteInvoice,
} from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import Loader from "../../Components/Common/Loader";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

const Inspections = () => {
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

  //delete invoice
  const [deleteModal, setDeleteModal] = useState(false);

  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    dispatch(onGetInspections());
  }, [dispatch]);

  useEffect(() => {
    setInvoice(inspections);
  }, [inspections]);

  // Delete Data
  const onClickDelete = (invoice) => {
    setInvoice(invoice);
    setDeleteModal(true);
  };

  const handleDeleteInvoice = () => {
    if (invoice) {
      dispatch(onDeleteInvoice(invoice._id));
      setDeleteModal(false);
    }
  };

  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime =
      moment(getTime, "hh:mm").format("hh:mm") + " " + meridiem;
    return updateTime;
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".invoiceCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".invoiceCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  //Column
  const columns = useMemo(
    () => [
      {
        Header: "Inspection No.",
        accessor: "invoiceId",
        filterable: false,
        Cell: (cell) => {
          return (
            <Link
              to="/apps-invoices-details"
              className="fw-medium link-primary"
            >
              {cell.value}
            </Link>
          );
        },
      },
      {
        Header: "Client",
        Cell: (invoice) => (
          <>
            <div className="d-flex align-items-center">
              {invoice.row.original.img ? (
                <img
                  src={
                    process.env.REACT_APP_API_URL +
                    "/images/users/" +
                    invoice.row.original.img
                  }
                  alt=""
                  className="avatar-xs rounded-circle me-2"
                />
              ) : (
                <div className="flex-shrink-0 avatar-xs me-2">
                  <div className="avatar-title bg-success-subtle text-success rounded-circle fs-13">
                    {invoice.row.original.name.charAt(0) +
                      invoice.row.original.name
                        .split(" ")
                        .slice(-1)
                        .toString()
                        .charAt(0)}
                  </div>
                </div>
              )}
              {invoice.row.original.name}
            </div>
          </>
        ),
      },
      {
        Header: "Car Make",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Car Model",
        accessor: "country",
        filterable: false,
      },
      {
        Header: "Chasis No.",
        Cell: (invoice) => (
          <>
            {handleValidDate(invoice.row.original.date)},{" "}
            <small className="text-muted">
              {handleValidTime(invoice.row.original.date)}
            </small>
          </>
        ),
      },
      {
        Header: "Date Done",
        accessor: "amount",
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (cell) => {
          switch (cell.value) {
            case "Paid":
              return (
                <span className="badge text-uppercase bg-success-subtle text-success">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            case "Unpaid":
              return (
                <span className="badge text-uppercase bg-warning-subtle text-warning">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            case "Cancel":
              return (
                <span className="badge text-uppercase bg-danger-subtle text-danger">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            default:
              return (
                <span className="badge text-uppercase bg-primary-subtle text-primary">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
          }
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
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
                <DropdownItem href="/apps-invoices-details">
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  View
                </DropdownItem>

                <DropdownItem href="/apps-invoices-create">
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </DropdownItem>

                <DropdownItem href="/#">
                  <i className="ri-download-2-line align-bottom me-2 text-muted"></i>{" "}
                  Download
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem
                  href="#"
                  onClick={() => {
                    const invoiceData = cellProps.row.original;
                    onClickDelete(invoiceData);
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
    [checkedAll]
  );

  document.title = "Inspections List | Automotive Africa";

  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteModal
          show={deleteModal}
          onDeleteClick={() => handleDeleteInvoice()}
          onCloseClick={() => setDeleteModal(false)}
        />

        <Container fluid>
          <BreadCrumb title="Inspections List" pageTitle="Inspections" />

          <Row>
            <Col lg={12}>
              <Card id="invoiceList">
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">Inspections</h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex gap-2 flex-wrap">
                        <Link
                          to="/apps-invoices-create"
                          className="btn btn-secondary"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> New
                          Inspection
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <div>
                    {inspections.length > -1 ? (
                      <TableContainer
                        columns={columns}
                        data={inspections || []}
                        isGlobalFilter={true}
                        isAddUserList={false}
                        customPageSize={10}
                        className="custom-header-css"
                        isInvoiceListFilter={true}
                        theadClass="text-muted text-uppercase"
                        SearchPlaceholder="Search for customer, email, country, status or something..."
                      />
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

export default Inspections;
