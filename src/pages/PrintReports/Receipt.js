/* eslint-disable react/display-name */
import React, { useEffect, useRef } from "react";

import { useReactToPrint } from "react-to-print";

const ComponentToPrint = React.forwardRef((props, ref) => {
  console.log(props);
  return (
    <div
      ref={ref}
      className="container"
      style={{
        fontFamily: "Tahoma, sans-serif !important",
        fontSize: "18px !important",
      }}
    >
      <div className="row">
        <div className="col-md-12">
          <div className="card" style={{ border: "1px solid #636363" }}>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-8">
                  <div className="navbar-header">
                    <a
                      className="navbar-brand"
                      href="<? echo base_url('admin/dashboard') ?>"
                    >
                      <b>
                        <img
                          src="https://www.automotiveafrica.com/assets/front/assets/img/aaa_logo.png"
                          alt="Logo"
                        />
                      </b>
                    </a>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="navbar-header text-right">
                    <a
                      className="navbar-brand"
                      href="<? echo base_url('admin/dashboard') ?>"
                    >
                      <b>
                        <img
                          style={{ width: "198px" }}
                          src="https://www.automotiveafrica.com/assets/images/logo.png"
                          alt="ATJ Logo"
                          className="img-responsive dark-logo"
                        />
                      </b>
                    </a>
                  </div>
                </div>
                <div className="col-sm-12">Monday, March 11th, 2024</div>
              </div>
              <hr style={{ border: "double 1px" }} />
              <div className="row">
                <div className="col-sm-6">
                  <ul className="list-unstyled">
                    <li style={{ marginBottom: "20px" }}>
                      <h4 style={{ color: "green" }}>
                        <b>
                          <b> Paid </b>
                        </b>
                      </h4>
                    </li>
                    <li>
                      Receipt Number: &nbsp;
                      <b> ZN24030599#67569 </b>
                    </li>
                  </ul>
                  <ul className="list-inline">
                    <li>
                      Inspection Fee : &nbsp;
                      <b> ZMW. 2,175 </b>
                    </li>
                  </ul>
                  <ul className="list-inline">
                    <li>
                      Payment Mode : &nbsp;
                      <b> mobile (ZMW) </b>
                    </li>
                  </ul>

                  <ul className="list-inline">
                    <li>
                      Acc No : &nbsp;
                      <b> Airtel Money Merchant-MSISDN:889001577 </b>
                    </li>
                  </ul>
                  <ul className="list-inline">
                    <li>
                      Transaction ID : &nbsp;
                      <b> MP240310.1642.H96392 </b>
                    </li>
                  </ul>
                  <ul className="list-inline">
                    <li>
                      Tax Invoice Number : &nbsp;
                      <b> INV0013569 </b>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-6">
                  <div className="text-right">
                    <img
                      alt="testing"
                      src="https://www.automotiveafrica.com/cert/qrcode/65732/837d79e6b97276c661aa536bb2074a031617a6e1qrcode?codetype=Code128&size=50&text=Receipt No : 65732-65498&print=true"
                      style={{ width: "30%" }}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <hr style={{ border: "double 1px" }} />
                </div>

                <div className="col-sm-6">
                  <ul className="list-inline">
                    <li style={{ marginBottom: "10px" }}>
                      Invoiced To: &nbsp;
                      <b> EDITH MUNKONDYA </b>
                    </li>
                  </ul>
                  <ul className="list-inline">
                    <li>
                      Invoice Number: &nbsp; #<b>INS-67569</b>
                    </li>
                  </ul>

                  <ul className="list-inline">
                    <li>
                      Invoice Date: &nbsp;
                      <b> 10th Mar, 2024 </b>
                    </li>
                  </ul>
                  <ul className="list-inline">
                    <li>
                      Date Paid: &nbsp;
                      <b> 10th Mar, 2024 </b>
                    </li>
                  </ul>
                </div>

                <div className="col-sm-6"></div>

                <div className="col-12">
                  <hr style={{ border: "double 1px" }} />
                  <div>
                    <table className="table custom table-bordered table-striped table-hover">
                      <thead id="head_tr">
                        <tr id="head_tr" style={{ width: "30%" }}>
                          <td colSpan="2">
                            <b> Inspection Description </b>
                          </td>
                          <td colSpan="2">
                            <b> Info </b>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr id="body_tr">
                          <td colSpan="2">
                            <h4 style={{ color: "#ff7507" }}>Chassis Number</h4>
                          </td>
                          <td colSpan="2">NCP81-0075209</td>
                        </tr>
                        <tr id="body_tr">
                          <td colSpan="2">
                            <h4 style={{ color: "#ff7507" }}>
                              Customs Reference Number
                            </h4>
                          </td>
                          <td colSpan="2">C 16790</td>
                        </tr>
                        <tr id="body_tr">
                          <td>
                            <h4 style={{ color: "#ff7507" }}>Vehicle Make</h4>
                          </td>
                          <td>TOYOTA</td>
                          <td>
                            <h4 style={{ color: "#ff7507" }}>Vehicle Model</h4>
                          </td>
                          <td>SIENTA</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="text-center">
                      <br />
                      <h6>
                        ZCSA RoadWorthiness Inspection (RWI) for Used Motor
                        Vehicle
                      </h6>
                    </div>
                    <hr
                      // style="border: double 1px"
                      style={{ border: "double 1px" }}
                    />
                    <div className="row">
                      <div className="col-6">
                        <h5 style={{ color: "green" }}>
                          Paid in by : &nbsp;
                          <b> MATHEWS MUGALA </b>
                        </h5>
                      </div>
                      <div className="col-6">
                        <h5 style={{ color: "green" }}>
                          Issued by : &nbsp;
                          <b> JOYCE MUBANGA </b>
                        </h5>
                      </div>
                    </div>
                    <div className="text-center">
                      <br />
                      Thank you for choosing AutoTerminal Japan Ltd. Nakonde
                      Zambia
                    </div>
                    <hr style={{ border: "double 1px" }} />

                    <div className="row">
                      <div className="col-sm-3">
                        <img
                          src="https://www.automotiveafrica.com/assets/front/assets/img/aaa_logo.png"
                          alt="Logo"
                        />
                      </div>
                      <div
                        className="col-sm-9 text-right"
                        style={{
                          fontFamily: "Comic Sans MS, Comic Sans, cursive",
                        }}
                      >
                        <b>
                          Africa Automotive Analysis (AutoTerminal Japan Ltd.
                          Nakonde Zambia)
                          <br />
                          ZAMESCO Compound, Plot No. 1501 – Off Mbala Road,
                          Nakonde, Zambia
                          <br />
                          <a
                            href="mailto:info@automotiveafrica.com"
                            style={{ textDecoration: "none" }}
                          >
                            info@automotiveafrica.com
                          </a>
                          | +260 970 295 834 <br />
                          <a
                            href="https://www.automotiveafrica.com/"
                            style={{ textDecoration: "none" }}
                          >
                            https://www.automotiveafrica.com/
                          </a>
                        </b>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <br />
                        <br />
                        <div className="text-center"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
});
const Receipt = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    handlePrint();
  }, []);
  return <ComponentToPrint ref={componentRef} />;
};

export default Receipt;
