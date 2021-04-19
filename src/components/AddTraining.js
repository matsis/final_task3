import React, { useState}  from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";

// Material UI date & picker
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


function AddTraining(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [training, SetTraining] = useState({
        date: '',
        formattedDate: '',
        activity: '',
        duration: '',
        customer: props.customerUrl
    });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSave = () => {
 //     console.log(training);
      // send training state to AddTraining function (define in Customers.js)
      props.addTraining(training);
      // close modal
      setOpen(false);    
    };

    // To save also time of the training (for example 27.11.19 09:00) the format must be ISO-8601 
    const dateChanged = (event) => {
      const newFormat = moment(event.target.value).toISOString();
      SetTraining({...training, formattedDate: event.target.value, date: newFormat})
    }
    const inputChanged = (event) => {
        SetTraining({...training, [event.target.name]: event.target.value});
    }

    return (
      <div>
        <Button color="primary" onClick={handleClickOpen}>
          Add Training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New Training</DialogTitle>
          <DialogContent>
            <form className={classes.container} noValidate>
              <TextField
                id="datetime-local"
                label="Date and time"
                type="datetime-local"
                defaultValue="2021-04-14T10:30"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                name="date"
                onChange={dateChanged}
                //ei toimi jos value on inputDate
                value={training.formattedDate}
              />
              <TextField
                margin="dense"
                label="Activity"
                name="activity"
                value={training.activity}
                onChange={inputChanged}
                fullWidth
              /> 
              <TextField
                margin="dense"
                label="Duration"
                name="duration"
                value={training.duration}
                onChange={inputChanged}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default AddTraining;