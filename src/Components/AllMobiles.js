import React,{ useState,useEffect} from "react";
import axios from "axios"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';

function AllMobiles(){
  const[mobiles,setMobiles] = useState([]);

  const fetchData = async () => {
    let res = await axios.get("http://localhost:8080/getMobiles");
    setMobiles(res.data);
    console.log(res.data);
  }

  useEffect(
    () => {
      fetchData()
    },
  []);
  

  return(
    <div style={{position: "absolute", top:"40%", left: "50%", transform: "translate(-50%,-50%)"}}>
      <TableContainer  component={Paper}>
      <Table sx={{minWidth: 1000, border: 5}} >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >BRAND</TableCell>
            <TableCell >MODEL</TableCell>
            <TableCell >COLOR</TableCell>
            <TableCell >PRICE</TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mobiles.map((row) => {
            return(
              <Mobile key={row.id} row={row} />
            )
          })}
        </TableBody>
      </Table>
      </TableContainer>
    </div>  

  )

  function Mobile(props){
    const Mobile = props.row;

    const handleDelete = async () => {
      await axios.delete("http://localhost:8080/delete/" + Mobile.id);
      window.location.reload(false);
    }

    const increasePrice= async () => {
      let increment;
      increment = prompt("Enter price");

      while (increment < 0) {
          alert("Please enter a valid number");
          increment = prompt("Enter price");
      }

      await axios.put("http://localhost:8080/increasePrice/" + increment + "/" + Mobile.id);
      window.location.reload(false);
  }
    const decreasePrice = async () => {
      let increment;
      increment = prompt("Enter price");

      while (increment < 0) {
          alert("Please enter a valid number");
          increment = prompt("Enter price");
      }

      await axios.put("http://localhost:8080/decreasePrice/" + increment + "/" + Mobile.id);
      window.location.reload(false);
  }


    return(
      <TableRow>
        <TableCell>{Mobile.id}</TableCell>
        <TableCell>{Mobile.brand}</TableCell>
        <TableCell>{Mobile.model}</TableCell>
        <TableCell>{Mobile.color}</TableCell>
        <TableCell>
          {Mobile.price}
          <Button variant="contained" onClick={increasePrice}>INCREASE</Button>
          <Button variant="contained" onClick={decreasePrice}>DECREASE</Button>
        </TableCell>
         <TableCell>
          <IconButton onClick={handleDelete}><DeleteOutlineIcon color="secondary"/></IconButton>
        </TableCell>
      </TableRow>
    )
  }
  
}

export default AllMobiles;