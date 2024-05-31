import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDollarSign,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const InfoBoard = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://vtechshop-be.onrender.com/admin/getReports",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const resData = await response.json();
        if (response.ok) {
          setReports(resData);
        } else {
          console.log(resData.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="d-flex flex-row w-100 shadow-sm">
        <div className="px-3 py-3 flex-fill d-flex align-items-center justify-content-between">
          <div>
            <h4 className="text-start">{reports[0]}</h4>
            <p className="text-start text-secondary">Clients</p>
          </div>
          <FontAwesomeIcon icon={faUser} className="px-2 text-secondary" />
        </div>
        <div className="px-3 py-3 flex-fill d-flex align-items-center justify-content-between border-start border-end">
          <div>
            <h4 className="text-start">
              {(+reports[1]).toLocaleString("vi-VN")}{" "}
              <span className="fs-6">VND</span>
            </h4>
            <p className="text-start text-secondary">Avg Earning of Month</p>
          </div>
          <FontAwesomeIcon
            icon={faDollarSign}
            className="px-2 text-secondary"
          />
        </div>
        <div className="px-3 py-3 flex-fill d-flex align-items-center justify-content-between">
          <div>
            <h4 className="text-start">{reports[2]}</h4>
            <p className="text-start text-secondary">Orders</p>
          </div>
          <FontAwesomeIcon
            icon={faFileInvoiceDollar}
            className="px-2 text-secondary"
          />
        </div>
      </div>
    </>
  );
};

export default InfoBoard;
