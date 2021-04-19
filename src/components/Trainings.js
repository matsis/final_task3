import React, { useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from "moment";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Trainings() {
  const [trainings, setTrainings] = useState([]);
 
  useEffect(() => {
    fetchTrainings();
  }, []);


  const deleteTraining = (id) => {
//    console.log(id);
    if(window.confirm('Are you sure you want to delete this training?')) {
      let url = "https://customerrest.herokuapp.com/api/trainings/" + id;
//      console.log(url); 
      fetch(url, { method: 'DELETE'})
      .then(response => {
      //if response 2XX
      if (response.ok)
      //fetch Training list again
        fetchTrainings();
      else
        alert('Something went wrong!');
      })
      .catch(err => console.error(err))
      }
   }
   

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  const columns = [
    { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
    { headerName: 'Time', field: 'date', sortable: true, filter: true, 
        cellRendererFramework: params => {
          return moment(params.value).format("DD.MM.yyyy HH:mm")
        }        
    }, 
    { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true },
    { headerName: 'First Name', field: 'customer.firstname', sortable: true, filter: true},
    { headerName: 'Last Name', field: 'customer.lastname', sortable: true, filter: true },    
    { headerName: '', 
      field: 'deletetraining',
      width: 100,
      sortable: false, filter: false,
      cellRendererFramework: params => 
      <IconButton color="secondary" onClick={() => deleteTraining(params.data.id)}>
        <DeleteIcon />
      </IconButton>
    },
  ]
 
  return (
    <div className="Trainings">
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
          <AgGridReact
            defaultColDef={{
              flex: 1,
              minWidth: 150,
              filter: true,
              sortable: true,
              floatingFilter: true,
            }}                     
            rowData={trainings}
            columnDefs={columns}
            animateRows={true}
            pagination={true}
            paginationPageSize={5}
            // poistetaan solujen valinta
            suppressCellSelection={true}
          />
        </div>      
    </div>
  );
  
}

export default Trainings;