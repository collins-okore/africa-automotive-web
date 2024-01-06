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
        <h5>Thank you ! Your Order is Completed !</h5>
        <p className="text-muted">
          You will receive an order confirmation email with details of your
          order.
        </p>

        <h3 className="fw-semibold">
          Order ID:{" "}
          <a
            href="apps-ecommerce-order-details"
            className="text-decoration-underline"
          >
            VZ2451
          </a>
        </h3>
      </div>
    </TabPane>
  );
};

export default Finish;
