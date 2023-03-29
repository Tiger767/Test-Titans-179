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
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const patient = {
            name: name,
            dob: dob,
            doses: doses
        }
        
        addPatient(patient).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
            }
        });
    }

  
    return (
      <div className="flex flex-col min-h-screen overflow-hidden">
        {/* Site header */}
        <Header />
    
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
                  <p className="text-xl text-gray-600">
                    Create a patient
                  </p>
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