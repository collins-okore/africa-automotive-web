import React, { Fragment, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useRowSelect,
} from "react-table";
import { Table, Row, Col, CardBody } from "reactstrap";
import { DefaultColumnFilter } from "./filters";
import {
  ProductsGlobalFilter,
  CustomersGlobalFilter,
  OrderGlobalFilter,
  ContactsGlobalFilter,
  CompaniesGlobalFilter,
  LeadsGlobalFilter,
  CryptoOrdersGlobalFilter,
  TicketsListGlobalFilter,
  NFTRankingGlobalFilter,
  TaskListGlobalFilter,
} from "../../Components/Common/GlobalSearchFilter";
import { Link } from "react-router-dom";
import { PaginationType } from "../../common/types";

// Define a default UI for filtering
function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  isCustomerFilter,
  isOrderFilter,
  isContactsFilter,
  isCompaniesFilter,
  isCryptoOrdersFilter,
  // isInvoiceListFilter,
  isTicketsListFilter,
  isNFTRankingFilter,
  isTaskListFilter,
  isProductsFilter,
  isLeadsFilter,
  SearchPlaceholder,
}) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <React.Fragment>
      <CardBody className="border border-dashed border-end-0 border-start-0">
        <form>
          <Row>
            <Col sm={5}>
              <div
                className={
                  isProductsFilter ||
                  isContactsFilter ||
                  isCompaniesFilter ||
                  isNFTRankingFilter
                    ? "search-box me-2 mb-2 d-inline-block"
                    : "search-box me-2 mb-2 d-inline-block col-12"
                }
              >
                <input
                  onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  id="search-bar-0"
                  type="text"
                  className="form-control search /"
                  placeholder={SearchPlaceholder}
                  value={value || ""}
                />
                <i className="bx bx-search-alt search-icon"></i>
              </div>
            </Col>
            {isProductsFilter && <ProductsGlobalFilter />}
            {isCustomerFilter && <CustomersGlobalFilter />}
            {isOrderFilter && <OrderGlobalFilter />}
            {isContactsFilter && <ContactsGlobalFilter />}
            {isCompaniesFilter && <CompaniesGlobalFilter />}
            {isLeadsFilter && <LeadsGlobalFilter />}
            {isCryptoOrdersFilter && <CryptoOrdersGlobalFilter />}
            {/* {isInvoiceListFilter && (
              <InvoiceListGlobalSearch />
            )} */}
            {isTicketsListFilter && <TicketsListGlobalFilter />}
            {isNFTRankingFilter && <NFTRankingGlobalFilter />}
            {isTaskListFilter && <TaskListGlobalFilter />}
          </Row>
        </form>
      </CardBody>
    </React.Fragment>
  );
}

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func,
  isCustomerFilter: PropTypes.bool,
  isOrderFilter: PropTypes.bool,
  isContactsFilter: PropTypes.bool,
  isCompaniesFilter: PropTypes.bool,
  isCryptoOrdersFilter: PropTypes.bool,
  // isInvoiceListFilter,
  isTicketsListFilter: PropTypes.bool,
  isNFTRankingFilter: PropTypes.bool,
  isTaskListFilter: PropTypes.bool,
  isProductsFilter: PropTypes.bool,
  isLeadsFilter: PropTypes.bool,
  SearchPlaceholder: PropTypes.string,
};

const TableContainer = ({
  columns,
  data,
  // isGlobalSearch,
  // isGlobalFilter,
  // isProductsFilter,
  // isCustomerFilter,
  // isOrderFilter,
  // isContactsFilter,
  // isCompaniesFilter,
  // isLeadsFilter,
  // isCryptoOrdersFilter,
  // isInvoiceListFilter,
  // isTicketsListFilter,
  // isNFTRankingFilter,
  // isTaskListFilter,
  // isAddOptions,
  // isAddUserList,
  // handleOrderClicks,
  // handleUserClick,
  // handleCustomerClick,
  // isAddCustList,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  pagination,
  onPageChange,
  FilterSection,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    // pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    canNextPage,
    canPreviousPage,
    // state,
    // preGlobalFilteredRows,
    // setGlobalFilter,
    setSortBy,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        selectedRowIds: 0,
        sortBy: [
          {
            id: "createdAt",
            desc: true,
          },
        ],
      },
      manualPagination: true,
      pageCount: pagination.pageCount,
      autoResetPage: false,
      manualSortBy: true,
      autoResetSortBy: false,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    setSortBy([{ id: "createdAt", desc: true }]);
  }, [setSortBy]);

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " " : "") : "";
  };

  // const onChangeInSelect = (event) => {
  //   setPageSize(Number(event.target.value));
  // };
  // const onChangeInInput = (event) => {
  //   const page = event.target.value ? Number(event.target.value) - 1 : 0;
  //   gotoPage(page);
  // };

  const [searchValue, setSearchValue] = useState("");

  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    onPageChange({ page: pageIndex + 1, sorted, searchValue });
  }, [pageIndex, pageSize, onPageChange, sorted, searchValue]);

  const onSort = (columnId, desc) => {
    // Update the sorted state and trigger data fetching
    if (columnId === "action") {
      return;
    }
    setSorted([{ id: columnId, desc }]);
    setSortBy([{ id: columnId, desc }]);
  };

  // Determine pages to be displayed in pagination
  const currentPage = pageIndex + 1;
  const totalPages = pagination.pageCount;

  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const endPage = Math.min(totalPages, startPage + 4);

  const renderPageNumbers = useMemo(() => {
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <React.Fragment key={i}>
          <li className="page-item">
            <Link
              to="#"
              className={currentPage === i ? "page-link active" : "page-link"}
              onClick={() => gotoPage(i - 1 || 0)}
            >
              {i}
            </Link>
          </li>
        </React.Fragment>
      );
    }
    return pageNumbers;
  }, [startPage, endPage, gotoPage, currentPage]);

  return (
    <Fragment>
      {/* <Row className="mb-3">
        {isGlobalSearch && (
          <Col md={1}>
            <select
              className="form-select"
              value={pageSize}
              onChange={onChangeInSelect}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Col>
        )}
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isProductsFilter={isProductsFilter}
            isCustomerFilter={isCustomerFilter}
            isOrderFilter={isOrderFilter}
            isContactsFilter={isContactsFilter}
            isCompaniesFilter={isCompaniesFilter}
            isLeadsFilter={isLeadsFilter}
            isCryptoOrdersFilter={isCryptoOrdersFilter}
            isInvoiceListFilter={isInvoiceListFilter}
            isTicketsListFilter={isTicketsListFilter}
            isNFTRankingFilter={isNFTRankingFilter}
            isTaskListFilter={isTaskListFilter}
            SearchPlaceholder={SearchPlaceholder}
          />
        )}
        {isAddOptions && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="rounded-pill  mb-2 me-2"
                onClick={handleOrderClicks}
              >
                <i className="mdi mdi-plus me-1" />
                Add New Order
              </Button>
            </div>
          </Col>
        )}
        {isAddUserList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="primary"
                className="btn mb-2 me-2"
                onClick={handleUserClick}
              >
                <i className="mdi mdi-plus-circle-outline me-1" />
                Create New User
              </Button>
            </div>
          </Col>
        )}
        {isAddCustList && (
          <Col sm="7">
            <div className="text-sm-end">
              <Button
                type="button"
                color="success"
                className="rounded-pill mb-2 me-2"
                onClick={handleCustomerClick}
              >
                <i className="mdi mdi-plus me-1" />
                New Customers
              </Button>
            </div>
          </Col>
        )}
      </Row> */}

      <>
        <FilterSection
          searchValue={searchValue}
          setSearchValue={(text) => {
            if (pageIndex != 0) {
              gotoPage(0);
            }
            setSearchValue(text);
          }}
        />
      </>

      <div className={divClass}>
        <Table hover {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr
                className={trClass}
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => {
                  return (
                    <th
                      key={column.id}
                      className={thClass}
                      {...column.getSortByToggleProps()}
                      onClick={() => onSort(column.id, !column.isSortedDesc)}
                    >
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                      {/* <Filter column={column} /> */}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="align-items-center mt-2 g-3 text-center text-sm-start">
        <div className="col-sm">
          <div className="text-muted">
            Showing<span className="fw-semibold ms-1">{currentPage}</span> of{" "}
            <span className="fw-semibold">{pagination.pageCount}</span> Pages
          </div>
        </div>
        <div className="col-sm-auto">
          <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
            <li
              className={!canPreviousPage ? "page-item disabled" : "page-item"}
            >
              <Link to="#" className="page-link" onClick={previousPage}>
                Previous
              </Link>
            </li>
            {/* {pageOptions.map((item, key) => (
              <React.Fragment key={key}>
                <li className="page-item">
                  <Link
                    to="#"
                    className={
                      pageIndex === item ? "page-link active" : "page-link"
                    }
                    onClick={() => gotoPage(item)}
                  >
                    {item + 1}
                  </Link>
                </li>
              </React.Fragment>
            ))} */}

            {renderPageNumbers}

            <li className={!canNextPage ? "page-item disabled" : "page-item"}>
              <Link to="#" className="page-link" onClick={nextPage}>
                Next
              </Link>
            </li>
          </ul>
        </div>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
  pagination: PaginationType,
  data: PropTypes.array,
  columns: PropTypes.array,
  isGlobalSearch: PropTypes.bool,
  isAddOptions: PropTypes.bool,
  isAddUserList: PropTypes.bool,
  handleOrderClicks: PropTypes.func,
  handleUserClick: PropTypes.func,
  handleCustomerClick: PropTypes.func,
  isAddCustList: PropTypes.bool,
  customPageSize: PropTypes.number,
  tableClass: PropTypes.string,
  theadClass: PropTypes.string,
  trClass: PropTypes.string,
  thClass: PropTypes.string,
  divClass: PropTypes.string,
  SearchPlaceholder: PropTypes.string,
  onPageChange: PropTypes.func,
  FilterSection: PropTypes.func,
};

export default TableContainer;
