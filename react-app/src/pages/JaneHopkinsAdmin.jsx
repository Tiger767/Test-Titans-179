import React, { useEffect,Fragment} from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageIllustration from '../partials/PageIllustration';
import SideMenu from '../components/SideMenu';
import {listPatients, editPatient} from '../backend/janeHopkins';
import { Form } from 'react-router-dom';


function JaneHopkinsAdmin() {

 
  const [patients, setPatients] = React.useState([]);
  const [editingPatient, setEditingPatient] =  React.useState(null);
 

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

  const handleSaveEdit = async (event,updatedPatient) => {
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
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h2 className="h1">Jane Hopkins</h2>
              </div>
            </div>
            
                {/*Create a refresh button to refresh the page make the button a circle*/}
                  <button onClick ={() => window.location.reload()} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
                  ⭮
                </button>
                          
            <div className="flex flex-col">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-purple-500">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Patient ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Date of Birth
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Doses
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Weight
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Height
                    </th>
                    <th scope= "col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Blood Pressure
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      eligible
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                      Insurance #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
                       ICD Code
                    </th>
                    
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white-500 uppercase tracking-wider">
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
                          onBlur={(e) => handlePatientEdit(index, "_id", e.target.textContent)}
                          suppressContentEditableWarning
                          className="text-sm text-gray-900"
                        >
                          {patient._id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          contentEditable={editingPatient === patient._id}
                          onBlur={(e) => handlePatientEdit(index, "name", e.target.textContent)}
                          suppressContentEditableWarning
                          className="text-sm text-gray-900"
                        >
                          {patient.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          contentEditable={editingPatient === patient._id}  
                          onBlur={(e) => handlePatientEdit(index, "dob", e.target.textContent)}
                          suppressContentEditableWarning
                          className="text-sm text-gray-900"
                        >
                          {patient.dob}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          contentEditable={editingPatient === patient._id}
                          onBlur={(e) => handlePatientEdit(index, "currentTotalDoses", e.target.textContent)}
                          suppressContentEditableWarning
                          className="text-sm text-gray-900"
                        >
                          {patient.currentTotalDoses}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          contentEditable={editingPatient === patient._id}
                          onBlur={(e) => handlePatientEdit(index, "weight", e.target.textContent)}
                          suppressContentEditableWarning
                          className="text-sm text-gray-900"
                        >
                          {patient.weight}
                        </div>
                      </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            contentEditable={editingPatient === patient._id}
                            onBlur={(e) => handlePatientEdit(index, "height", e.target.textContent)}
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {patient.height}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">  
                          <div
                            contentEditable={editingPatient === patient._id}
                            onBlur={(e) => handlePatientEdit(index, "bloodPressure", e.target.textContent)}
                            suppressContentEditableWarning
                            className="text-sm text-gray-900"
                          >
                            {patient.bloodPressure}
                          </div>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                <div >
                      <Checkbox
                        //label based on if its true or false and make the label red if false and green if true
                        disabled={editingPatient !== patient._id}
                        label = {patient.eligibility ? "text" : "Not Eligible"}
                        sytle={{color: patient.eligibility ? "text-sm text-green-900": "text-sm text-red-900"}}
                        value={patient.eligibility}
                        onChange={(e) => handlePatientEdit(index, "eligibility", e.target.checked)}
                  
                     
                       
                          
                      />
      
                      {patient.eligibility}
                      </div>
                      
                       
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          contentEditable={editingPatient === patient._id}
                          onBlur={(e) => handlePatientEdit(index, "insuranceNumber", e.target.textContent)}
                          suppressContentEditableWarning
                          className="text-sm text-gray-900"
                        >
                          {patient.insuranceNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                       
                          contentEditable={editingPatient === patient._id}
                          onBlur={(e) => handlePatientEdit(index, "icdHealthCodes", e.target.textContent)}
                          suppressContentEditableWarning
                          className="text-sm text-gray-900"
                          
                        >
                          {JSON.stringify(patient.icdHealthCodes)}
                          
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editingPatient === patient._id ? (
                          <Fragment>
                            <button
                              onClick={ (event) => handleSaveEdit(event,patient)}
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
                          
            <SideMenu />
          </div>
        </section>
      </main>
      <Footer />
    </div>

  );
                      

}  
export default JaneHopkinsAdmin;