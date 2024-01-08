import React from "react";

import { TabPane } from "reactstrap";

const Finish = () => {
  return (
    <TabPane tabId={4} id="pills-finish">
      <div className="text-center py-5">
        <div className="mb-4">
          <lord-icon
            src="https://cdn.lordicon.com/lupuorrc.json"
            trigger="loop"
            colors="primary:#0ab39c,secondary:#405189"
            style={{ width: "120px", height: "120px" }}
          ></lord-icon>
        </div>
        <h5>Inspection Confirmation</h5>
        <p className="text-muted">
          Please Confirm all the details of inspection then submit
        </p>

        <button
          type="button"
          className="btn btn-secondary btn-label right ms-auto nexttab"
          onClick={() => {}}
        >
          <i className="ri-check-double-line label-icon align-middle fs-16 ms-2"></i>
          Submit Inspection
        </button>

        {/* <h3 className="fw-semibold">
          Order ID:{" "}
          <a
            href="apps-ecommerce-order-details"
            className="text-decoration-underline"
          >
            VZ2451
          </a>
        </h3> */}
      </div>
    </TabPane>
  );
};

export default Finish;
