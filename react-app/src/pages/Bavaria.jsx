import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageIllustration from "../partials/PageIllustration";
import SideBar from "../components/SideBar";
import Modal from "../components/Modal";
import { getParticipants, getAllDrugs, addBatchDrug } from "../backend/bavaria";

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
  };

  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState([]);

  const handleOpenModal = (visits) => {
    if (visits === null) setSelectedData([0, 1, 2, 3, 4, 5]);
    else {
      setSelectedData(visits.map((visit) => visit.hivViralLoad));
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const convertToJsonString = (obj) => {
    return JSON.stringify(obj);
  };

  const preprocessData = (data) => {
    return data.map((item) => {
      const preprocessedItem = { ...item };

      for (const key in preprocessedItem) {
        if (Array.isArray(preprocessedItem[key])) {
          preprocessedItem[key] = convertToJsonString(preprocessedItem[key]);//preprocessedItem[key].map(convertToJsonString).join(', ');
        }
      }

      return preprocessedItem;
    });
  };

  const dictToCSV = (dictArray, delimiter = ',') => {
    if (!Array.isArray(dictArray) || dictArray.length === 0) {
      return '';
    }
  
    const headers = Object.keys(dictArray[0]).join(delimiter);
    const rows = dictArray
      .map((item) => {
        return Object.values(item)
          .map((value) => {
            if (typeof value === 'string') {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(delimiter);
      })
      .join('\n');
  
    return `${headers}\n${rows}`;
  };

  const downloadCSV = () => {
    const preprocessedData = preprocessData(patients);
    //const json2csvParser = new Parser();
    //const csv = json2csvParser.parse(preprocessedData);
    const csvBlob = new Blob([dictToCSV(preprocessedData)], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvBlob);

    const link = document.createElement('a');
    link.href = csvUrl;
    link.setAttribute('download', 'export.csv');
    link.click();
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
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20 text-black">
                <h2 className="h1">Bavaria Page</h2>
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
                  className={`p-6`}
                  style={{ width: "70%", height: "100%", indent: "50px" }}
                />

                <button
                  className="bg-purple-500 hover:bg-purple-700 text-1xl text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => downloadCSV()}
                  style={{ width: "20%", height: "100%", indent: "50px" }}
                >
                  Download Report
                </button>

                <button
                  className="bg-purple-500 hover:bg-purple-700 text-2xl text-white font-bold py-2 px-4 rounded-full"
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
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        UUID
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
                        HIV Viral Load
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Tracking Number
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
                          <div className="text-sm text-gray-900">
                            {patient.uuid}
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
                            {patient.visits &&
                              patient.visits.map(
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
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleOpenModal(patient.visits)}
                          >
                            View Plot
                          </button>
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
                    <input
                      className="bg-purple-500 rounded-full"
                      type="number"
                      value={numDoses}
                      onChange={(e) =>
                        setNumDoses(parseInt(e.target.value, 10))
                      }
                    />
                  </label>

                  <label className="text-white">
                    <input
                      className="bg-purple-500 hover:bg-purple-700 py-2 px-2"
                      type="checkbox"
                      checked={isPlacebo}
                      onChange={(e) => setIsPlacebo(e.target.checked)}
                    />
                    Placebo
                  </label>

                  <button
                    className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-full"
                    type="button"
                    onClick={handleAddDoses}
                  >
                    Add {numDoses} {isPlacebo ? "Placebo" : "Bavaria"} Doses
                  </button>

                  <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => window.location.reload()}
                  >
                    ⭮
                  </button>
                </div>

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
                        Bavaria ID (Tracking Number)
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
                        Placebo
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        Used
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
                            {drug.bid}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {drug.patientUuid}
                          </div>
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
          </div>
        </section>
      </main>
      <Footer />
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        data={selectedData}
      />
    </div>
  );
}
export default Bavaria;
