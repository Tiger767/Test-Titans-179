import React, { useEffect, Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageIllustration from "../partials/PageIllustration";
import SideBar from "../components/SideBar";
import {
  listPatients,
  editPatient,
  sharePatients,
} from "../backend/janeHopkins";
import { Form } from "react-router-dom";
import CreatePatient from "../pages/CreatePatient";

function JaneHopkinsRealAdmin() {
  const [patients, setPatients] = React.useState([]);
  const [editingPatient, setEditingPatient] = React.useState(null);

  useEffect(() => {
    listPatients().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPatients(data);
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

  //Search filter by name
  const [query, setQuery] = React.useState("");
  const [filteredPatients, setFilteredPatients] = React.useState(patients);

  React.useEffect(() => {
    setFilteredPatients(
      patients.filter((patient) =>
        patient.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, patients]);

  const [isAdministrator, setIsAdministrator] = React.useState(false);

  React.useEffect(() => {
    sharePatients(isAdministrator);
  }, [isAdministrator]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-zinc-200">
      <Header />
      <main className="grow">
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20 text-black">
                <h2 className="h1">Jane Hopkins Admin Page </h2>
              </div>
            </div>

            {/*Create a refresh button to refresh the page make the button a circle*/}
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
            >
              ⭮
            </button>

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
                  style={{ width: "50%", height: "100%", indent: "50px" }}
                />
                <button
                  class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                  type="button"
                  onClick={() => setIsAdministrator(!isAdministrator)}
                  style={{ width: "50%", height: "100%" }}
                >
                  Submit Eligible Patients
                </button>

                <div style={{ marginLeft: "auto", marginRight: "50px" }}></div>

                <table
                  className="mw-100 divide-y divide-gray-200"
                  style={{ width: "100%" }}
                  patients={patients}
                >
                  <thead className="bg-purple-500">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Date of Birth
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Doses
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Eligible
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        HIV Viral Load
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Tracking Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
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
                            onBlur={(e) =>
                              handlePatientEdit(
                                index,
                                "visits",
                                e.target.textContent
                              )
                            }
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {" "}
                            {patient.visits.map(
                              (hivViralLoad) => hivViralLoad.hivViralLoad
                            )}{" "}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            onBlur={(e) =>
                              handlePatientEdit(
                                index,
                                "currentDoseFid",
                                e.target.textContent
                              )
                            }
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {patient.currentDoseFid}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingPatient === patient._id ? (
                            <Fragment>
                              <button
                                onClick={(event) =>
                                  handleSaveEdit(event, patient)
                                }
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Cancel
                              </button>
                            </Fragment>
                          ) : (
                            <button
                              onClick={() => setEditingPatient(patient._id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <SideBar
              firstItem="Dashboard"
              secondItem="Users"
              thirdItem="Notes"
              fourthItem="Payroll"
              fifthItem="Settings"
              sixthItem="Sign Out"
              firstIcon="browsers-outline"
              secondIcon="person-outline"
              thirdIcon="reader-outline"
              fourthIcon="today-outline"
              fifthIcon="settings-outline"
              sixthIcon="log-out-outline"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default JaneHopkinsRealAdmin;
