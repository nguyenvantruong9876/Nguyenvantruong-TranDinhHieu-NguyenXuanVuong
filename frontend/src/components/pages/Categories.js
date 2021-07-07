import React from 'react';
import { useState } from 'react' 
import { TextField ,Box ,  Button , TableContainer , Table ,  TableBody  ,  TableRow , TableCell} from '@material-ui/core';
import axios from 'axios'

export default function Categories() {
  const [Categories , setCategories] = useState([])
  const [ category , setCategory] = useState({})
  const fetchUsers = async()=>{
    const response= await axios.get('http://localhost:8000/Categories')
    return setCategories(response.data)
  }
  const  fetchUser = async(id)=>{
    const response = await axios.get(`http://localhost:8000/Categories${id}`)
    return setCategory(response.data)
  }
  const createOrEditUser = async()=>{
    if (category.id){
      await axios.put(`http://localhost:8000/Categories${category.id}` , category)
    }
    else{
      await axios.post(`http://localhost:8000/Categories` , category)
    }
    await fetchUsers()
    await setCategory({ id: 0 , name: ' ', description: ' '})
  }
  const deleteUser = async(id)=>{
    await axios.delete(`http://localhost:8000/Categories${id}`)
    await fetchUsers()
  }
 
  return (
    <div>
      
        <Box m = {10}>
            <TableContainer>
            <Button color="primary" >Categories</Button>
              <TextField value={category.id} type="hidden"/>

              <Table  aria-label="simple table">
                <TableBody>
                  <TableRow>
                   
                  <TableCell>
                    <TextField value={category.categoryName} onChange={(e) => setCategory({...category,categoryName:e.target.value })} id = "standard-basic" label ="Name" />
                    </TableCell>
                    <TableCell>
                    <TextField value={category.description} onChange={(e) => setCategory({...category,description:e.target.value })} id = "standard-basic" label ="Description" />
                    </TableCell>
                    
                    <TableCell>
                      <Button onClick={()=> createOrEditUser()} varian="contained" color="primary">
                        Submit</Button>
                    </TableCell>
                </TableRow>
                  <TableRow>
                      <TableCell >Category Name</TableCell>
                      <TableCell >Description</TableCell>
                      <TableCell >Edit</TableCell>
                      <TableCell>Delete</TableCell>
                  </TableRow>
                  {Categories.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell >{row.name}</TableCell>
                        <TableCell >{row.description}</TableCell>
                       
                    <TableCell>
                      <Button onClick={() => fetchUser(row.id)} variant="contained" color ="primary" > 
                      edit
                      </Button>
                </TableCell>
                 <TableCell>
                      <Button onClick={()=> deleteUser(row.id)} variant="contained" color ="secondary" > 
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