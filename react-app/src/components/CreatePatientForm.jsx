import React, { useState } from 'react';

const CreatePatientForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [doses, setDoses] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [oxygen, setOxygen] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, dob, doses, height, weight, oxygen, bloodPressure });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
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
          />
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="dob">
            Date of Birth
          </label>
          <input
            id="dob"
            type="text"
            className="form-input w-full text-gray-800"
            placeholder="01/01/2000"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
          />
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
          <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="weight">
            Weight
          </label>
          <input
            id="weight"
            type="text"
            className="form-input w-full text-gray-800"
            placeholder="150"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
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
          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Patient
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePatientForm;
