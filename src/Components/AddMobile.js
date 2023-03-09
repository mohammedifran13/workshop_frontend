import React,{useState} from 'react'
import axios from "axios"

import {Box, Button, Container, Grid, InputLabel, TextField, Typography} from '@mui/material/';

export default function AddMobile() {

  const[dets,setDets] = useState({});

  const handleDets = (e) => {
    setDets({...dets, [e.target.name] : e.target.value});
  }

const handleSubmit = (e) => {
  e.preventDefault();
    console.log(dets);
    postData();
}

const postData = async () => {
  await axios.post("http://localhost:8080/add", dets);
  alert("Mobile Added Successfully!");
}

  return (
    <Container component="main" maxWidth="xs" >
      <Box padding={3} sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
             borderRadius: 5
        }}
      >
      
      <Typography component="h1" variant='h4'>MOBILE</Typography>
     
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField fullWidth type='text' name='id' label='Mobile id' onChange={handleDets}  required/>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type='text' name='brand' label='Mobile brand' onChange={handleDets}  required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type='text' name='model' label='Model' onChange={handleDets} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type='text' name='color' label='Color' onChange={handleDets}  required/>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type='text' name='price' label='Price' onChange={handleDets} required />
          </Grid>
          </Grid>
          <Grid align='center' marginBottom='15px'>
            <Button onClick={handleSubmit} size='large' type='submit' variant='contained'sx={{mt: 3, mb: 2, background: 'black',color: '#ffffff' }}> ADD </Button>
          </Grid>
        </Box>
      </Box>
      </Container>
  )
}

