import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isNewInspection, setIsNewInspection] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isInspections, setIsInspections] = useState(false);
  const [isClients, setIsClients] = useState(false);
  const [isPayments, setIsPayments] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isVehicleMake, setIsVehicleMake] = useState(false);
  const [isVehicleModel, setIsVehicleModel] = useState(false);
  const [isBodyColor, setIsBodyColor] = useState(false);
  const [isBodyType, setIsBodyType] = useState(false);
  const [isInspectionFees, setIsInspectionFees] = useState(false);
  const [isReports, setIsReports] = useState(false);
  const [isUsers, setIsUsers] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "NewInspection") {
      setIsNewInspection(false);
    }
    if (iscurrentState !== "Inspections") {
      setIsInspections(false);
    }
    if (iscurrentState !== "Clients") {
      setIsClients(false);
    }
    if (iscurrentState !== "Payments") {
      setIsPayments(false);
    }
    if (iscurrentState !== "BodyColor") {
      setIsBodyColor(false);
    }
    if (iscurrentState !== "BodyType") {
      setIsBodyType(false);
    }
    if (iscurrentState !== "VehicleMake") {
      setIsVehicleMake(false);
    }
    if (iscurrentState !== "VehicleModel") {
      setIsVehicleModel(false);
    }
    if (iscurrentState !== "Verification") {
      setIsVerification(false);
    }
    if (iscurrentState !== "Reports") {
      setIsReports(false);
    }
    if (iscurrentState !== "Users") {
      setIsUsers(false);
    }
    // if (iscurrentState === "Widgets") {
    //   history("/widgets");
    //   document.body.classList.add("twocolumn-panel");
    // }
    if (iscurrentState !== "InspectionFees") {
      setIsInspectionFees(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isNewInspection,
    isInspections,
    isInspectionFees,
    isPayments,
    isClients,
    isReports,
    isVehicleMake,
    isVehicleModel,
    isBodyColor,
    isBodyType,
    isVerification,
    isUsers,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },

    {
      id: "dashboard",
      label: "Dashboard",
      icon: "ri-dashboard-2-line",
      link: "/dashboard",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "new-inspection",
      label: "New Inspection",
      icon: "ri-file-add-line",
      link: "/new-inspection",
      stateVariables: isNewInspection,
      click: function (e) {
        e.preventDefault();
        setIsNewInspection(!isNewInspection);
        setIscurrentState("NewInspection");
        updateIconSidebar(e);
      },
    },
    {
      id: "inspections",
      label: "Inspections",
      icon: "ri-apps-2-line",
      link: "/#",
      stateVariables: isInspections,
      click: function (e) {
        e.preventDefault();
        setIsInspections(!isInspections);
        setIscurrentState("Inspections");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "new-inspections",
          label: "New Inspections",
          link: "/inspections/new",
          parentId: "inspections",
        },
        {
          id: "all-nspections",
          label: "All Inspections",
          link: "/inspections",
          parentId: "inspections",
        },
        {
          id: "completed-inspections",
          label: "Completed Inspections",
          link: "/inspections/completed",
          parentId: "inspections",
        },
      ],
    },
    {
      id: "clients",
      label: "Clients",
      icon: "ri-user-shared-line",
      link: "/clients",
      stateVariables: isClients,
      click: function (e) {
        e.preventDefault();
        setIsClients(!isClients);
        setIscurrentState("Clients");
        updateIconSidebar(e);
      },
    },
    {
      id: "payments",
      label: "Payments",
      icon: "ri-money-dollar-circle-line",
      link: "/payments",
      stateVariables: isPayments,
      click: function (e) {
        e.preventDefault();
        setIsPayments(!isPayments);
        setIscurrentState("Payments");
        updateIconSidebar(e);
      },
    },
    {
      id: "verification",
      label: "Verification",
      icon: "ri-file-search-line",
      link: "/verification",
      stateVariables: isVerification,
      click: function (e) {
        e.preventDefault();
        setIsVerification(!isVerification);
        setIscurrentState("Verification");
        updateIconSidebar(e);
      },
    },
    {
      label: "Configuration",
      isHeader: true,
    },
    {
      id: "vehicle-make",
      label: "Vehicle Make",
      icon: "ri-car-washing-line",
      link: "/vehicle-make",
      stateVariables: isVehicleMake,
      click: function (e) {
        e.preventDefault();
        setIsVehicleMake(!isDashboard);
        setIscurrentState("VehicleMake");
        updateIconSidebar(e);
      },
    },
    {
      id: "vehicle-model",
      label: "Vehicle Model",
      icon: "ri-roadster-line",
      link: "/vehicle-model",
      stateVariables: isVehicleModel,
      click: function (e) {
        e.preventDefault();
        setIsVehicleModel(!isVehicleModel);
        setIscurrentState("VehicleModel");
        updateIconSidebar(e);
      },
    },
    {
      id: "vehicle-body-color",
      label: "Body Color",
      icon: "ri-brush-3-line",
      link: "/body-color",
      stateVariables: isBodyColor,
      click: function (e) {
        e.preventDefault();
        setIsBodyColor(!isBodyColor);
        setIscurrentState("BodyColor");
        updateIconSidebar(e);
      },
    },
    {
      id: "vehicle-body-type",
      label: "Body Type",
      icon: "ri-truck-line",
      link: "/body-type",
      stateVariables: isBodyType,
      click: function (e) {
        e.preventDefault();
        setIsBodyType(!isBodyType);
        setIscurrentState("BodyType");
        updateIconSidebar(e);
      },
    },
    {
      id: "inspection-fees",
      label: "Inspection Fees",
      icon: "ri-exchange-funds-line",
      link: "/inspection-fees",
      stateVariables: isInspectionFees,
      click: function (e) {
        e.preventDefault();
        setIsInspectionFees(!isInspectionFees);
        setIscurrentState("InspectionFees");
        updateIconSidebar(e);
      },
    },
    {
      label: "Reports",
      isHeader: true,
    },
    {
      id: "reports",
      label: "Reports",
      icon: "ri-file-text-line",
      link: "/reports",
      stateVariables: isReports,
      click: function (e) {
        e.preventDefault();
        setIsReports(!isReports);
        setIscurrentState("Reports");
        updateIconSidebar(e);
      },
    },
    {
      label: "User",
      isHeader: true,
    },
    {
      id: "users",
      label: "Users",
      icon: "ri-user-2-line",
      link: "/users",
      stateVariables: isUsers,
      click: function (e) {
        e.preventDefault();
        setIsUsers(!isUsers);
        setIscurrentState("Users");
        updateIconSidebar(e);
      },
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
