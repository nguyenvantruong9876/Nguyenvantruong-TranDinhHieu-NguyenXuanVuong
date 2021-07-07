import React from 'react';
import { useState } from 'react' 
import { TextField ,Box ,  Button , TableContainer , Table ,  TableBody  ,  TableRow , TableCell} from '@material-ui/core';
import axios from 'axios'

export default function Consulting() {
  const [products , setProducts] = useState([])
  const [ product , setProduct] = useState({})
  const fetchProduct = async()=>{
    const response= await axios.get('http://localhost:8000/product/')
    return setProducts(response.data)
  }
  const  fetchProducts = async(id)=>{
    const response = await axios.get(`http://localhost:8000/product/${id}`)
    return setProducts(response.data)
  }
  const createOrEditProduct = async()=>{
    if (product.id){
      await axios.put(`http://localhost:8000/product/${product.id}` , product)
    }
    else{
      await axios.post(`http://localhost:8000/product/` , product)
    }
    await fetchProducts()
    await setProduct({ id: 0 , productName: ' ', supplierID: ' ' , categoryID: ' ', unit: ' ', price: ' '})
  }
  const deleteProduct = async(id)=>{
    await axios.delete(`http://localhost:8000/product/${id}`)
    await fetchProduct()
  }
 
  return (
    <div>
      
        <Box m = {10}>
            <TableContainer>
            <Button color="primary" >products</Button>
              <TextField value={product.id} type="hidden"/>

              <Table  aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                    <TextField value={product.productName} onChange={(e) => setProduct({...product,productName:e.target.value })} id = "standard-basic" label ="Name" />
                    </TableCell>
                    <TableCell>
                    <TextField value={product.supplierID} onChange={(e) => setProduct({...product,supplierID:e.target.value })} id = "standard-basic" label ="supplierID" />
                    </TableCell>
                    <TableCell>
                    <TextField value={product.categoryID} onChange={(e) => setProduct({...product,categoryID:e.target.value })} id = "standard-basic" label ="categoryID" />
                    </TableCell>
                    <TableCell>
                    <TextField value={product.unit} onChange={(e) => setProduct({...product,unit:e.target.value })} id = "standard-basic" label ="unit" />
                    </TableCell>
                    <TableCell>
                    <TextField value={product.price} onChange={(e) => setProduct({...product,price:e.target.value })} id = "standard-basic" label ="price" />
                    </TableCell>
                    <TableCell>
                      <Button onClick={()=> createOrEditProduct()} varian="contained" color="primary">
                        Submit</Button>
                    </TableCell>
                </TableRow>
                  <TableRow>
                      <TableCell >Name</TableCell>
                      <TableCell >SupplierID</TableCell>
                      <TableCell >CategoryID</TableCell>
                      <TableCell >Unit</TableCell>
                      <TableCell >Price</TableCell>
                      <TableCell >Edit</TableCell>
                      <TableCell>Delete</TableCell>
                  </TableRow>
                  {products.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell >{row.productName}</TableCell>
                        <TableCell >{row.supplierID}</TableCell>
                        <TableCell >{row.categoryID}</TableCell>
                        <TableCell >{row.unit}</TableCell>
                        <TableCell >{row.price}</TableCell>
                    <TableCell>
                      <Button onClick={() => fetchProduct(row.id)} variant="contained" color ="primary" > 
                      edit
                      </Button>
                </TableCell>
                 <TableCell>
                      <Button onClick={()=> deleteProduct(row.id)} variant="contained" color ="secondary" > 
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

