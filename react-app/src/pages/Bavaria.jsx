/** @format */

import React, { useEffect, Fragment } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PageIllustration from "../partials/PageIllustration";
import SideMenu from "../components/SideMenu";
import { listPatients, editPatient } from "../backend/janeHopkins";
import { Form } from "react-router-dom";

function Bavaria() {
  const [patients, setPatients] = React.useState([]);
  const [editingPatient, setEditingPatient] = React.useState(null);

  useEffect(() => {
    listPatients().then((patients) => {
      setPatients(patients);
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

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="grow">
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true">
          <PageIllustration />
        </div>
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h2 className="h1">Bavaria</h2>
                <h3 className="h2">Adminstration page </h3>
              </div>
            </div>

            {/*Create a refresh button to refresh the page make the button a circle*/}
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
              ⭮
            </button>

            <div class="flex flex-col justify-end float-left">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-purple-500" col-span="3">
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                    col-span="3">
                    Create Drug
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                    Doses
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Actions
                    </th>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-black">Bavaria Drug </td>
                    <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                        <div>
                        <input type="number" step="1" style={{ width: "100px" }} />
                        </div>
                      </td>
                    </tr>
                    <td class="px-6 py-4 whitespace-nowrap text-black">
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create
                      </button>
                    </td>
                  
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-black">Placebo</td>
                    <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                        <div>
                        <input type="number" step="1" style={{ width: "100px" }} />
                        </div>
                      </td>
                    </tr>
                    <td class="px-6 py-4 whitespace-nowrap text-black">
                      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create
                      </button>
                    </td>
                  </tr>
                  {/* MOre rows here  */}
                </tbody>
              </table>
            </div>

            {/* <div className="flex flex-col justify-end float-left">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-purple-500">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Create Drug 
                    </th>
                  </tr>
                </thead>
              </table>
                </div> */}
            <div className="flex flex-col justify-end float-right">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-purple-500">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      ID
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Doses
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      HIV Status
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient, index) => (
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
                          className="text-sm text-gray-900">
                          {patient._id}
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
                          className="text-sm text-gray-900">
                          {patient.currentTotalDoses}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <Checkbox
                            //label based on if its true or false and make the label red if false and green if true
                            disabled={editingPatient !== patient._id}
                            label={patient.eligibility ? "HIV" : "No HIV"}
                            sytle={{
                              color: patient.eligibility
                                ? "text-sm text-green-900"
                                : "text-sm text-red-900",
                            }}
                            value={patient.eligibility}
                            onChange={(e) =>
                              handlePatientEdit(
                                index,
                                "eligibility",
                                e.target.checked
                              )
                            }
                          />

                          {patient.eligibility}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editingPatient === patient._id ? (
                          <Fragment>
                            <button
                              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={(event) =>
                                handleSaveEdit(event, patient)
                              }>
                              Save
                            </button>
                            {/* <td class="px-6 py-4 whitespace-nowrap">
                        <button  Edit
                        </button>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          Delete
                        </button>
                      </td> */}

                            <button
                              class="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={handleCancelEdit}>
                              Cancel
                            </button>
                          </Fragment>
                        ) : (
                          <button
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setEditingPatient(patient._id)}>
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SideMenu />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default Bavaria;
