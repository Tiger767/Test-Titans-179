import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreatePatientForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [doses, setDoses] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [oxygen, setOxygen] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [temperature, setTemperature] = useState('');
  const [insuranceNumber, setInsurance] = useState('');
  const [insured, setInsured] = useState(false);
  const [currentMedications, setCurrentMedications] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [currentlyEmployed, setEmployed]= useState(false);

  const [icdHealthCodes, setIcdHealthCodes] = useState([]);
  const [newIcdCode, setNewIcdCode] = useState([]);
  const [newAllergy, setNewAllergy] = useState([]);
  const [newMedication, setNewMedication] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
  
  
    const updatedAllergies = allergies.map((allergy) => ({ allergy }));
    const updatedMedications = currentMedications.map((medication) => ({ medication }));
    const updatedIcdCodes = icdHealthCodes.map((code) => ({ code }));
  
  
    onSubmit({
      name,
      address,
      dob,
      doses,
      height,
      weight,
      oxygen,
      bloodPressure,
      temperature,
      insuranceNumber,
      insured: insured ? 'true' : 'false',
      currentlyEmployed: currentlyEmployed ? 'true' : 'false',
      currentMedications: updatedMedications,
      allergies: updatedAllergies,
      icdHealthCodes: updatedIcdCodes,
    });
    setFormSubmitted(true);
  };
  
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };
  const handleInsuredChange = (event) => {

      setInsured(event.target.checked);
    
  };
  const handleEmployedChange = (event) => {
      setEmployed(event.target.checked);
  };
  const handleAddAllergy = (event) => {
    event.preventDefault();
    const newAllergy = document.getElementById('allergies').value;
    if (newAllergy) {
      setAllergies([...allergies, newAllergy]);
      document.getElementById('allergies').value = '';
    }
  };
  
  const handleAddMedication = (event) => {
    event.preventDefault();
    const newMedication = document.getElementById('medications').value;
    if (newMedication) {
      setCurrentMedications([...currentMedications, newMedication]);
      document.getElementById('medications').value = '';
    }
  };
  
  const handleAddIcdCode = (event) => {
    event.preventDefault();
    const newIcdCode = document.getElementById('IcdCodes').value;
    if (newIcdCode) {
      setIcdHealthCodes([...icdHealthCodes, newIcdCode]);
      document.getElementById('IcdCodes').value = '';
    }
  };
  
  const handleRemoveAllergy = (index) => {
    const newAllergies = [...allergies];
    newAllergies.splice(index, 1);
    setAllergies(newAllergies);
  };
  
  const handleRemoveMedication = (index) => {
    const newMedications = [...currentMedications];
    newMedications.splice(index, 1);
    setCurrentMedications(newMedications);
  };
  
  const handleRemoveIcdCode = (index) => {
    const newIcdCodes = [...icdHealthCodes];
    newIcdCodes.splice(index, 1);
    setIcdHealthCodes(newIcdCodes);
  };

  return (

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="form-input w-full text-gray-800"
                placeholder="Jane Hopkins"
                value={name}
                onChange={(event) => setName(event.target.value)}
                row="1"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="dob">
                Date Of Birth
              </label>
              <DatePicker
                id="dob"
                selected={dob}
                type="date"
                onChange={(date) => setDob(date)}
                showDateSelect
                className="form-input w-full text-purple-800"
              />
            </div>
          </div>
  
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              className="form-input w-full text-gray-800"
              placeholder="123 Main St, City, State, Zip"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
  
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="doses">
                Doses
              </label>
              <input
                id="doses"
                type="text"
                className="form-input w-full text-gray-800"
                placeholder="2"
                value={doses}
                onChange={(event) => setDoses(event.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="height">
                Height
              </label>
              <input
                id="height"
                type="text"
                className="form-input w-full text-gray-800"
                placeholder="5' 10"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="weight">
                Weight
              </label>
              <input
                id="weight"
                type="text"
                className="form-input w-full text-gray-800"
                placeholder="150 lbs"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />
            </div>
          </div>
  
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="oxygen">
                Oxygen
              </label>
              <input
                id="oxygen"
                type="text"
                className="form-input w-full text-gray-800"
                placeholder="98%"
                value={oxygen}
                onChange={(event) => setOxygen(event.target.value)}
              />
            </div>
            <div>
        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="bloodPressure">
          Blood Pressure
        </label>
        <input
          id="bloodPressure"
          type="text"
          className="form-input w-full text-gray-800"
          placeholder="120/80"
          value={bloodPressure}
          onChange={(event) => setBloodPressure(event.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="temperature">
          Temperature
        </label>
        <input
          id="temperature"
          type="text"
          className="form-input w-full text-gray-800"
          placeholder="98.6"
          value={temperature}
          onChange={(event) => setTemperature(event.target.value)}
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        
        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="insuranceNumber">
          Insurance Number
        </label>
        <input
          id="insuranceNumber"
          type="text"
          className="form-input w-full text-gray-800"
          placeholder="123456789"
          value={insuranceNumber}
          onChange={(event) => setInsurance(event.target.value)}
        />
      </div>
      </div>
      

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Checkbox
            className="block text-gray-800 text-sm font-medium mb-1"
            label={insured ? "Insured" : "Not Insured"}
            value={insured}
            onChange={handleInsuredChange}
          />
        </div>
        <div>
          <Checkbox
            className="block text-gray-800 text-sm font-medium mb-1"
            label={currentlyEmployed ? "Employed" : "Unemployed"}
            value={currentlyEmployed}
            onChange={handleEmployedChange}
          />
        </div>
      </div>
 
 
      <div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="allergies">
      Allergies
    </label>
    <div className="flex items-center">
      <input
        id="allergies"    
        type="text"
        className="form-input w-full text-gray-800 mr-2"
        placeholder="Peanuts"
        value={newAllergy}
        onChange={(event) => setNewAllergy(event.target.value)}
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={(event) => handleAddAllergy(event)}>+</button>

    </div>
    <ul className="list-disc list-inside">
      {allergies.map((allergy, index) => (
        <li key={index}>
          {allergy}
          <button className="ml-2 text-red-500" onClick={() => handleRemoveAllergy(index)}>Remove</button>
        </li>
      ))}
    </ul>
  </div>
</div>

<div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="medications">
      Medications
    </label>
    <div className="flex items-center">
      <input
        id="medications"
        type="text"
        className="form-input w-full text-gray-800 mr-2"
        placeholder="Tylenol"
        value={newMedication}
        onChange={(event) => setNewMedication(event.target.value)}
      />
     <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={(event) => handleAddMedication(event)}>+</button>

    </div>
    <ul className="list-disc list-inside">
      {currentMedications.map((medication, index) => (
        <li key={index}>
          {medication}
          <button className="ml-2 text-red-500" onClick={() => handleRemoveMedication(index)}>Remove</button>
        </li>
      ))}
    </ul>
  </div>
</div>

<div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="IcdCodes">
      ICD Codes
    </label>
    <div className="flex items-center">
      <input
        id="IcdCodes"
        type="text"
        className="form-input w-full text-gray-800 mr-2"
        placeholder="A00.0"
        value={newIcdCode}
        onChange={(event) => setNewIcdCode(event.target.value)}
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={(event) => handleAddIcdCode(event)}>+</button>

    </div>
    <ul className="list-disc list-inside">
      {icdHealthCodes.map((icdCode, index) => (
        <li key={index}>
          {icdCode}
          <button className="ml-2 text-red-500" onClick={() => handleRemoveIcdCode(index)}>Remove</button>
        </li>
      ))}
    </ul>
  </div>
</div>
<button
        type="submit"
        className="btn btn-primary w-full mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Patient
      </button>

    </form>

  );
};

export default CreatePatientForm;
