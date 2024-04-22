import React, { useState, useCallback, useMemo } from "react";
import { CardBody, Row } from "reactstrap";
import Loader from "../../Components/Common/Loader";
import TableContainer from "../../Components/Common/TableContainer";
import * as moment from "moment";
import { Link } from "react-router-dom";

//Import actions
import { getInspections as onGetInspections } from "../../slices/thunks";
//redux
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

const FilterSection = () => {
  return (
    <Row className="mb-3">
      <React.Fragment>
        <CardBody className="border border-dashed border-end-0 border-start-0"></CardBody>
      </React.Fragment>
    </Row>
  );
};

FilterSection.propTypes = {};

const FailedInspections = () => {
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
        Header: "Inspection No.",
        accessor: "id",
        id: "id",
        filterable: false,
      },
      {
        Header: "COR No.",
        accessor: "cor",
        id: "cor",
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
        Header: "Inspection Center",
        accessor: "inspectionCenter",
        id: "inspectionCenter",
        filterable: false,
        Cell: () => {
          return <div>Auto Terminal Japan - Zambia</div>;
        },
      },
      {
        Header: "Booking Date",
        accessor: "createdAt",
        id: "bookingDate",
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
        Header: "CC Rating",
        accessor: "vehicle.chasisNumber",
        id: "ccRating",
        filterable: false,
      },
      {
        Header: "Remarks",
        accessor: "vehicle.chasisNumber",
        id: "remarks",
        filterable: false,
      },
    ],
    []
  );
  return (
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
            tableClass="align-middle table-bordered table-striped table-nowrap mb-0"
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
  );
};

export default FailedInspections;
