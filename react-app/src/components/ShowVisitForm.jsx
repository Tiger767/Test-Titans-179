import React from "react";

const ShowVisitForm = ({ visits }) => {
    return (
      <div>
        {visits &&
          visits.map((visit, index) => (
            <div key={index}>
              <p style={{ color: "black" }}>Date and Time: {visit.dateTime}</p>
              <textarea
              style={{ color: "black", width: "100%" }}
              value={visit.notes}
              readOnly
            />
              <p style={{ color: "black" }}>HIV Load: {visit.hivViralLoad}</p>
              <hr /> {/* Optional: Add a horizontal line to separate each visit */}
            </div>
          ))}
      </div>
    );
  };
  
  export default ShowVisitForm;