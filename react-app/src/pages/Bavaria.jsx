import React, { useEffect, Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageIllustration from "../partials/PageIllustration";
import SideBar from "../components/SideBar";
import {
  getParticipants,
  getAllDrugs,
  addBatchDrug,
} from "../backend/bavaria";

function Bavaria() {
  const [patients, setPatients] = React.useState([]);
  const [drugs, setDrugs] = React.useState([]);

  useEffect(() => {
    getParticipants().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPatients(data);
      }
    });
    getAllDrugs().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setDrugs(data);
      }
    });
  }, []);

  //Search filter by name
  const [query, setQuery] = React.useState("");
  const [filteredPatients, setFilteredPatients] = React.useState(patients);

  React.useEffect(() => {
    setFilteredPatients(
      patients.filter((patient) =>
        patient.uuid.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, patients]);

  const [numDoses, setNumDoses] = React.useState(0);
  const [isPlacebo, setIsPlacebo] = React.useState(false);
  const handleAddDoses = () => {
    addBatchDrug(numDoses, isPlacebo);
  }

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
                <h2 className="h1">FDA Page </h2>
              </div>
            </div>

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
                  style={{ width: "90%", height: "100%", indent: "50px" }}
                />

                <button
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => window.location.reload()}
                  style={{ width: "10%", height: "100%", indent: "50px" }}
                >
                  ⭮
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
                          <div className="text-sm text-gray-900">
                            {patient.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.dob}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.currentTotalDoses}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {" "}
                            {patient.visits && patient.visits.map(
                              (hivViralLoad) => hivViralLoad.hivViralLoad
                            )}{" "}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {patient.currentDoseFid}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          None
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  className={`bg-purple-500`}
                  style={{ maxWidth: "100%", overflowX: "auto" }}
                >
                  <label className="text-white">
                    Number of Doses:
                    <input className="bg-purple-500 rounded-full" type="number" value={numDoses} onChange={(e) => setNumDoses(parseInt(e.target.value, 10))} />
                  </label>

                  <label className="text-white">
                    <input className="bg-purple-500 hover:bg-purple-700 py-2 px-2" type="checkbox" checked={isPlacebo} onChange={(e) => setIsPlacebo(e.target.checked)} />
                    Placebo
                  </label>

                  <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                    type="button"
                    onClick={handleAddDoses}
                  >
                    Add {numDoses} {isPlacebo ? 'Placebo' : 'Bavaria'} Doses
                  </button>

                  <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => window.location.reload()}
                  >
                    ⭮
                  </button>
                </div>

                <table className="mw-100 divide-y divide-gray-200" style={{ width: "100%" }}>
                  <thead className="bg-purple-500">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        FDA ID (Tracking Number)
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Bavaria ID (Tracking Number)
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Patient UUID
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Placebo
                      </th>
                      
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider"
                      >
                        Used
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {drugs.map((drug) => (
                      <tr key={drug.fid}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{drug.fid}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{drug.bid}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{drug.patientUuid}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {drug.placebo ? "Yes" : "No"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {drug.used ? "Yes" : "No"}
                          </div>
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
export default Bavaria;
