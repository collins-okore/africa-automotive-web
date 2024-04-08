import React from "react";
import { Spinner } from "reactstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

const Loader = (props) => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center mx-2 mt-2">
        <Spinner color="primary"> Loading... </Spinner>
      </div>
      {toast.error(props.error, {
        position: "top-right",
        hideProgressBar: false,
        progress: undefined,
        toastId: "",
      })}
    </React.Fragment>
  );
};

// Add prop-types for typechecking
Loader.propTypes = {
  error: PropTypes.string,
};

export default Loader;
