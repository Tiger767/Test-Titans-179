import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddVisitForm = ({ onSubmit }) => {
    const [dateTime, setDateTime] = useState('');
    const [notes, setNotes] = useState('');
    const [hivViralLoad, setHivLoad] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ dateTime, notes, hivViralLoad: hivViralLoad.toString()});
    };
    return ( 
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="date">
                    Date and Time
                    </label>
                    <DatePicker
                        id="dateTime"
                        selected={dateTime}
                        type = "datetime-local"
                        onChange={(date) => setDateTime(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="form-input w-full text-purple-800"
                
                    />
                    
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="notes">    
                        Notes
                    </label>
                    <textarea
                        id="notes"
                        className="form-input w-full text-gray-800"
                        placeholder="Notes"

                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        rows = "4"
                        data-gramm_editor="true"

                    />
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="hivLoad">
                        HIV Load
                    </label>
                    <input
                        id="hivViralLoad"
                        className="form-input w-full text-gray-800"
                        placeholder="HIV Load"
                        value={hivViralLoad}
                        onChange={(event) => setHivLoad(event.target.value)}
                        type="number"
                        min="0"
                        max="1000000000"
                        step="1"
                    />
                  
                

                    
                    
                    <button
                        type="submit"
                        className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
        
    );
};
export default AddVisitForm;

                
    

   