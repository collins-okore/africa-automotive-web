import React from "react";
import Proptypes from "prop-types";

const PrintReportLayout = ({ children }) => {
  return <>{children}</>;
};

PrintReportLayout.propTypes = {
  children: Proptypes.node,
};

export default PrintReportLayout;
