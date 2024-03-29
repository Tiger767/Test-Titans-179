import React, { useEffect, Fragment } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PageIllustration from "../partials/PageIllustration";
import SideBar from "../components/SideBar";
import CreatePatientForm from "../components/CreatePatientForm";
import AddVisitForm from "../components/AddVisitForm";

import {
  getAllPatients,
  editPatient,
  getAllDrugs,
  givePatientDose,
  addPatient,
  addPatientVisit,
  addPatientDrug
} from "../backend/janeHopkins";
import ShowVisitForm from "../components/ShowVisitForm";

//The Doctor Page
function JaneHopkinsDoctor() {
  const [patients, setPatients] = React.useState([]);
  const [drugs, setDrugs] = React.useState([]);
  const [editingPatient, setEditingPatient] = React.useState(null);

  useEffect(() => {
    getAllPatients(false).then((patients) => {
      setPatients(patients);
    });

    getAllDrugs().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setDrugs(data);
      }
    });
  }, []);

  const handlePatientEdit = (patientIndex, field, value) => {
    const updatedPatients = [...patients];
    updatedPatients[patientIndex][field] = value;
    setPatients(updatedPatients);
  };

  const handleCancelEdit = () => {
    setEditingPatient(null);
  };

  const handleSaveEdit = async (event, updatedPatient) => {
    event.preventDefault();
    await editPatient(updatedPatient);
    const updatedPatients = patients.map((patient) => {
      if (patient._id === updatedPatient._id) {
        return updatedPatient;
      } else {
        return patient;
      }
    });
    setPatients(updatedPatients);
    setEditingPatient(null);
  };
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };
  const [query, setQuery] = React.useState("");
  const [filteredPatients, setFilteredPatients] = React.useState(patients);

  React.useEffect(() => {
    setFilteredPatients(
      patients.filter((patient) =>
        patient.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, patients]);

  const [showForm, setShowForm] = React.useState(false);
  const [showVisitForm, setShowVisitForm] = React.useState(false);
  const openForm = () => {
    setShowForm(true);

  };
  const closeForm = () => {
    setShowForm(false);
  };
  const openVisitForm = (updatedPatient) => {
    setShowVisitForm(true);
    
    setEditingPatient(updatedPatient);
    return updatedPatient;
  }
  const closeVisitForm = () => {
    setShowVisitForm(false);
    setEditingPatient(null);

  }
  const [showShowVisitForm, setShowShowVisitForm] = React.useState(false);
const [Visits, setVisits] = React.useState([]);
  const closeShowVisitForm = () => {
    setShowShowVisitForm(false);
    setEditingPatient(null);
    setVisits(null);
  };
  
  const openShowVisitForm = (patient) => {
    if(patient){
    setShowShowVisitForm(true);
    setEditingPatient(patient);
    setVisits(patient.visits);
    }
  };



  
  
  
  const handleAddVisit = async (formData, updatedPatient) => {

  
    if (!updatedPatient) {
      console.error("No patient selected");
      return;
    }
  
    await addPatientVisit(updatedPatient, formData.dateTime, formData.notes, formData.hivViralLoad);
    closeVisitForm();
    

   

  };
  const handleCreatePatient = (formData) => {
    addPatient(formData);
    closeForm();
  };


  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-zinc-200">
      <Header />
      <main className="grow ml-100">
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center text-black pb-12 md:pb-20">
                <h2 className="h1">Jane Hopkins Doctor Page</h2>
              </div>
            </div>

            {/*Create a refresh button to refresh the page make the button a circle*/}

            <div
              className={`flex flex-col`}
              style={{ maxWidth: "100%", overflowX: "auto" }}
            >
              <div
                className={`bg-purple-500`}
                style={{ maxWidth: "100%", overflowX: "auto" }}
              >
                <input
                  type="text"
                  placeholder="Search Patients"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className={`p-6`}
                  style={{ width: "90%", height: "100%", indent: "50px" }}
                />

                <button
                  class="bg-purple-500 hover:bg-purple-700 text-2xl text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => window.location.reload()}
                  style={{ width: "10%", height: "100%", indent: "50px" }}
                >
                  ⭮
                </button>

                <button
                  onClick={openForm}
                  className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4"
                >
                  Add Patient
                </button>

                <div style={{ marginLeft: "auto", marginRight: "50px" }}></div>
                <table
                  className="divide-y divide-gray-200"
                  style={{ width: "100%" }}
                >
                  <thead className="bg-purple-500">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Patient UUID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Date of Birth
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Doses
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Weight
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Height
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Blood Pressure
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        eligible
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Insurance #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        ICD Code
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPatients.map((patient, index) => (
                      <tr key={patient._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            contentEditable={editingPatient === patient._id}
                            onBlur={(e) =>
                              handlePatientEdit(
                                index,
                                "_id",
                                e.target.textContent
                              )
                            }
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {patient.uuid}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            contentEditable={editingPatient === patient._id}
                            onBlur={(e) =>
                              handlePatientEdit(
                                index,
                                "name",
                                e.target.textContent
                              )
                            }
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {patient.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            contentEditable={editingPatient === patient._id}
                            onBlur={(e) =>
                              handlePatientEdit(
                                index,
                                "dob",
                                e.target.textContent
                              )
                            }
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {patient.dob}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            contentEditable={editingPatient === patient._id}
                            onBlur={(e) =>
                              handlePatientEdit(
                                index,
                                "currentTotalDoses",
                                e.target.textContent
                              )
                            }
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {patient.currentTotalDoses}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            contentEditable={editingPatient === patient._id}
                            onBlur={(e) =>
                              handlePatientEdit(
                                index,
                                "weight",
                                e.target.textContent
                              )
                            }
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {patient.weight}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            contentEditable={editingPatient === patient._id}
                            onBlur={(e) =>
                              handlePatientEdit(
                                index,
                                "height",
                                e.target.textContent
                              )
                            }
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {patient.height}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            contentEditable={editingPatient === patient._id}
                            onBlur={(e) =>
                              handlePatientEdit(
                                index,
                                "bloodPressure",
                                e.target.textContent
                              )
                            }
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {patient.bloodPressure}
                          </div>
                        </td>

                        {/*<td className="px-6 py-4 whitespace-nowrap">
                        <div
                          contentEditable={editingPatient === patient._id}
                          onBlur={(e) => handlePatientEdit(index, "bloodType", e.target.textContent)}
                          suppressContentEditableWarning
                          className="text-sm text-gray-900"
                        >
                          {patient.bloodType}
                        </div>
                  </td>*/}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            value={patient.eligibility}
                            className={
                              patient.eligibility
                                ? "text-sm text-green-900"
                                : "text-sm text-red-900"
                            }
                          >
                            {" "}
                            {patient.eligibility ? "Eligible" : "Not Eligible"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            contentEditable={editingPatient === patient._id}
                            onBlur={(e) =>
                              handlePatientEdit(
                                index,
                                "insuranceNumber",
                                e.target.textContent
                              )
                            }
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {patient.insuranceNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/*<div
                            contentEditable={editingPatient === patient._id}
                            onBlur={(e) =>
                              handlePatientEdit(
                                index,
                                "icdHealthCodes",
                                e.target.textContent
                              )
                            }
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >*/}
                          <div className="text-sm text-gray-900">
                            {patient.icdHealthCodes
                              .map((code) => code.code)
                              .join(", ")}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingPatient === patient._id ? (
                            <Fragment>
                              <button
                                onClick={(event) =>
                                  handleSaveEdit(event, patient)
                                }
                                className="text-white bg-green-500 hover:bg-green-700 px-3 py-1 rounded mr-2"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </Fragment>
                          ) : (
                            <Fragment>
                              <button
                                onClick={() => setEditingPatient(patient._id)}
                                className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded mr-2"
                              >
                                Edit
                              </button>
                              {patient.eligibility ? (
                                <Fragment>
                                  <button
                                    onClick={() => addPatientDrug(patient)}
                                    className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
                                  >
                                    Give a Dose
                                  </button>
                                  <button
                                      onClick={() => openVisitForm(patient)}
                                      className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
                                    >
                                      Add Visit
                                      
                                    </button>
                                    <button
                                      onClick={() => openShowVisitForm(patient)}
                                      className="text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
                                    >
                                      Show Visits
                                    </button>
                                </Fragment>
                              ) : (<></>)
                              }
                            </Fragment>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table
                  className="mw-100 divide-y divide-gray-200"
                  style={{ width: "100%" }}
                >
                  <thead className="bg-purple-500">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        FDA ID (Tracking Number)
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Patient UUID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Used
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {drugs.map((drug) => (
                      <tr key={drug.fid}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {drug.fid}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {drug.patientUuid}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {drug.used ? "Yes" : "No"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => givePatientDose(drug.patientUuid)}
                          >
                            Give Dose
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {showForm && (
            <div className="flex flex-col h-full overflow-y-scroll">
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
         <div
          className="bg-white w-1/2 p-6 rounded shadow-lg"
          style={{
            maxWidth: "95%",
            maxHeight: "95%",
            overflow: "auto"
         }}
          >

            <button
              onClick={closeForm}
              className="float-right text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <CreatePatientForm onSubmit={handleCreatePatient} className="form-container" style={{ height: "500px", overflow: "auto" }}/>

         


          </div>
        </div>
        </div>
      )}
    
  {showVisitForm && (
    <div className="flex flex-col h-full overflow-y-scroll">
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
          <div
          className="bg-white w-1/2 p-6 rounded shadow-lg"
          style={{
            maxWidth: "95%",
            maxHeight: "95%",
            overflow: "auto"
         }}
      >
        <button
          onClick={closeVisitForm}
          className="float-right text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <AddVisitForm onSubmit={(formData)=> handleAddVisit(formData, editingPatient)} />
      </div>
    </div>
    </div>
  )}
  {showShowVisitForm && (
  <div className="flex flex-col h-full overflow-y-scroll">
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        className="bg-white w-1/2 p-6 rounded shadow-lg"
        style={{
          maxWidth: "95%",
          maxHeight: "95%",
          overflow: "auto",
        }}
      >
        <button
          onClick={closeShowVisitForm}
          className="float-right text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <ShowVisitForm visits={Visits} />
      </div>
    </div>
  </div>
)}

</div>


  );
}
export default JaneHopkinsDoctor;
