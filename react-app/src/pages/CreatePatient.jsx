import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';
import { addPatient } from '../backend/janeHopkins';



//Create a page that creates a patient

function CreatePatient() {
    
    const [name, setName] = React.useState("");
    const [dob, setDob] = React.useState("");
    const [doses, setDoses] = React.useState("");
    const [visits, setVisits] = React.useState("");
    const [height, setHeight] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [allergies, setAllergies] = React.useState("");
    const [oxygen, setOxygen] = React.useState("");
    const [bloodPressure, setBloodPressure] = React.useState("");
    const [currentMedications, setCurrentMedications] = React.useState("");
    const [familyHistory, setFamilyHistory] = React.useState("");
    const [currentlyEmployed, setCurrentlyEmployed] = React.useState("");
    const [icdHealthCodes, setIcdHealthCodes] = React.useState("");
    const [eligibility, setEligibility] = React.useState("");
    const [notes, setNotes] = React.useState("");


    //Need to work on fields with multiple objects as well as making the format better
    const handleSubmit = (event) => {
        event.preventDefault();
        const patient = {
            name: name,
            dob: dob,
            doses: doses,
            height: height,
            weight: weight,
            oxygen: oxygen,
            bloodPressure: bloodPressure,
        }
        
        addPatient(patient).then((patient) => {
            console.log(patient);
        })

    }

  
    return (
      <div className="flex flex-col min-h-screen overflow-hidden">
      
        {/* Page content */}
        <main className="grow">
          {/* Page illustration */}
          <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
            <PageIllustration />
          </div>
    
          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <Banner />
    
                {/* Page header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h2 mb-4">Create Patient</h1>
                </div>
              </div>
    
              {/* Form */}
              <div className="max-w-3xl mx-auto">
            
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
                      < label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="dob">
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
                          className="btn btn-primary w-full hover:bg-gray-900"
                        >
                          Create Patient
                        </button>
                      </div>
                  </div>
              </div>
          </form>
       </div>
      </div>             
   </section>
</main>
    
        {/* Site footer */}
        <Footer />
      </div>
    );
    }    
  export default CreatePatient;