import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";

import HeaderSection from "./HeaderSection";
import InspectionDetails from "./InspectionDetails";

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

// import useParams from react-router-dom
import { useParams } from "react-router-dom";
//Import actions
import { getInspection as onGetInspection } from "../../../slices/thunks";
import { useNavigate } from "react-router-dom";

const Inspect = () => {
  const { navigate } = useNavigate();
  const dispatch = useDispatch();

  // Get :id from url
  const { id: inspectionId } = useParams();

  useEffect(() => {
    dispatch(onGetInspection(inspectionId));
  }, [dispatch, inspectionId]);

  const selectLayoutState = (state) => state.Inspections;
  const selectInspectionProperties = createSelector(
    selectLayoutState,
    (state) => ({
      inspection: state.inspection,
    })
  );
  // Inside your component
  const { inspection } = useSelector(selectInspectionProperties);
  console.log("Inspection", inspection);

  useEffect(() => {
    if (inspection?.status === "completed") {
      // Redirect to view inspection page
      navigate("/inspections/view/" + inspection.id);
    }
  });

  document.title = "Inspect | Automotive Africa";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <HeaderSection inspection={inspection} />
          </Row>
          <Row>
            <InspectionDetails inspection={inspection} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Inspect;
