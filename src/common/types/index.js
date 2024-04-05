import PropTypes from "prop-types";

export const PaginationType = PropTypes.shape({
  page: PropTypes.number,
  pageSize: PropTypes.number,
  pageCount: PropTypes.number,
  total: PropTypes.number,
});

export const VehicleMake = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  code: PropTypes.string,
});
