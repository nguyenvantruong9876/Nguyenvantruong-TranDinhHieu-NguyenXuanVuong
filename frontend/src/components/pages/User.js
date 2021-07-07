import React from 'react';
import { useState } from 'react' 
import { TextField ,Box ,  Button , TableContainer , Table ,  TableBody  ,  TableRow , TableCell} from '@material-ui/core';
import axios from 'axios'

export default function User() {
  const [users , setUsers] = useState([])
  const [ user , setUser] = useState({})
  const fetchUsers = async()=>{
    const response= await axios.get('http://localhost:8000')
    return setUsers(response.data)
  }
  const  fetchUser = async(id)=>{
    const response = await axios.get(`http://localhost:8000/${id}`)
    return setUser(response.data)
  }
  const createOrEditUser = async()=>{
    if (user.id){
      await axios.put(`http://localhost:8000/${user.id}` , user)
    }
    else{
      await axios.post(`http://localhost:8000/` , user)
    }
    await fetchUsers()
    await setUser({ id: 0 , name: ' ', email: ' ' , password: ' '})
  }
  const deleteUser = async(id)=>{
    await axios.delete(`http://localhost:8000/${id}`)
    await fetchUsers()
  }
 
  return (
    <div>
      
        <Box m = {10}>
            <TableContainer>
            <Button color="primary" >users</Button>
              <TextField value={user.id} type="hidden"/>

              <Table  aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                    <TextField value={user.name} onChange={(e) => setUser({...user,name:e.target.value })} id = "standard-basic" label ="Name" />
                    </TableCell>
                    <TableCell>
                    <TextField value={user.email} onChange={(e) => setUser({...user,email:e.target.value })} id = "standard-basic" label ="Email" />
                    </TableCell>
                    <TableCell>
                    <TextField value={user.password} onChange={(e) => setUser({...user,password:e.target.value })} id = "standard-basic" label ="Password" />
                    </TableCell>
                    <TableCell>
                      <Button onClick={()=> createOrEditUser()} varian="contained" color="primary">
                        Submit</Button>
                    </TableCell>
                </TableRow>
                  <TableRow>
                      <TableCell >Name</TableCell>
                      <TableCell >Email</TableCell>
                      <TableCell >Password</TableCell>
                      <TableCell >Edit</TableCell>
                      <TableCell>Delete</TableCell>
                  </TableRow>
                  {users.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell >{row.name}</TableCell>
                        <TableCell >{row.email}</TableCell>
                        <TableCell >{row.password}</TableCell>
                    <TableCell>
                      <Button onClick={() => fetchUser(row.id)} variant="contained" color ="primary" > 
                      edit
                      </Button>
                </TableCell>
                 <TableCell>
                      <Button onClick={()=>deleteUser(row.id)} variant="contained" color ="secondary" > 
                      delete
                      </Button>
                </TableCell>
                </TableRow>
                  ))}
              </TableBody>
        </Table>
        </TableContainer>
        </Box>
    </div>
  );
}

