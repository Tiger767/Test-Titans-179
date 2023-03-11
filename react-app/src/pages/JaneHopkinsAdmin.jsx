import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';
import Button from "react-bootstrap/Button";
import SideMenu from '../components/SideMenu';
//Create a page for admin view the includes the following:
//1. A side menu with the following options:
//a. Dashboard
//b. users
//c. appointments
//d. reports
//e. settings
////2. A dashboard that includes the following:
//a. A list of patients
//b. A list of appointments
//c. A list of reports
//d. A list of settings
//e. A list of users
//f. A list of roles
////Other notes:
//1. The dashboard should be the default page
//2. The dashboard should be the only page that is visible to the admin
//3. The admin should be able to add, edit, and delete users, appointments, reports, settings, and roles
//4. The admin should be able to view the list of users, appointments, reports, settings, and roles
//Code for the dashboard page
function JaneHopkinsAdmin() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />
      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h2 className="h1">Jane Hopkins</h2>
                <h3 className="h\3">Adminstration Page</h3>
                </div>
              </div>
           {/*Create query table*/}
            <div className="flex flex-col">
             
              <div className="-my-2 overflow-x-auto sm:-mx-8 lg:-mx-15">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <div className= "bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                       
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Id
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Appointment
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          # of Doses Given
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                          </th>
                         
                          </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-20 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                
                                
                                </div>
                                </div>
                                </td>
                                </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            {/*Side Menu*/}   
             <SideMenu />
                   
       </section>
        
      </main>
      {/*  Site footer */}
      <Footer />
    </div>  
   )
}  
export default JaneHopkinsAdmin;