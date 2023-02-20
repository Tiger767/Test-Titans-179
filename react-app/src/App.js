import logo from './logo.svg';
import './App.css';
import useJaneHopkins from './hooks/useJaneHopkins';
import useBavaria from './hooks/useBavaria';
import useFDA from './hooks/useFDA';

// Permissions
// https://www.vendia.com/docs/share/fine-grained-data-permissions
// https://www.vendia.com/docs/share/rbac
// CLient SDK https://www.vendia.com/docs/share/vendia-client-sdk

function App() {
  const {entities} = useBavaria();

  const addPatient = async() => {
    console.log(entities)
    const addPatientResponse = await entities.patient.add({
      name: "Billy3"
    }, {
      aclInput: {
        acl: [
          {
            principal: {
              nodes: ["*"]
            },
            operations: [ ]
          }
        ]
      }
    });
    console.log(addPatientResponse);
  };

  return (
    <div className="App">
      <button onClick={() => {addPatient();}}>Add Patient</button>
    </div>
  );
}

export default App;
