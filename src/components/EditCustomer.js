import React, { useState}  from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function EditCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, SetCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
        url: '',
    });

    const handleClickOpen = () => {
//      console.log(props.customer);
      SetCustomer({
        firstname: props.customer.firstname,
        lastname: props.customer.lastname,
        streetaddress: props.customer.streetaddress,
        postcode: props.customer.postcode,
        city: props.customer.city,
        email: props.customer.email,
        phone: props.customer.phone,
        url: props.customer.links[0].href
      });  
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSave = () => {
// send customer state to EditCustomer function (define in Customers.js)
        props.editCustomer(customer);
// close modal
        setOpen(false);    
    };

    const inputChanged = (event) => {
        SetCustomer({...customer, [event.target.name]: event.target.value});
    }

    return (
      <div>
        <IconButton color="primary" onClick={handleClickOpen}>
            <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="First Name"
              name="firstname"
              value={customer.firstname}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Last Name"
              name="lastname"
              value={customer.lastname}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Street Address"
              name="streetaddress"
              value={customer.streetaddress}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Post Code"
              name="postcode"
              value={customer.postcode}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="City"
              name="city"
              value={customer.city}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={customer.email}
              onChange={inputChanged}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Phone"
              name="phone"
              value={customer.phone}
              onChange={inputChanged}
              fullWidth
            />      
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

export default EditCustomer;