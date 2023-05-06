import React, {useState} from 'react';
import Edit from './edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Swal from 'sweetalert2'
import { deleteUser } from '../../../services/api';


export default function DataTable({data}){
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [editShow, setEditShow] = useState(false);
    const [usernumber, setUsernumber] = useState(0);

    const handleChangePage = (event,newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    

    const handleEdit = (e) => {
        setUsernumber(e + (rowsPerPage * page));
        setEditShow(true);
    }

    // handles delete
    const handleDelete = (e) => {
        Swal.fire({
        title: 'Do you want to delete this?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        }).then((event) => {
            if (event.isConfirmed){
                // deleting a user
                return deleteUser(e._id);
            }
            else
                return Swal.fire({
                    title: 'Cancelled',
                    icon: 'error',
                    confirmButtonText: 'Confirm',
                })
        })
    }
    
    return (
        <div>
            {data.length === 0 ?  null : <Edit data={data[usernumber]} show={editShow} onHide={() => setEditShow(false)}/>} 
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell align="left">First Name</TableCell>
                        <TableCell align="left">Last Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Number</TableCell>
                        <TableCell align="left">Address</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                        <TableRow
                        key={i+1}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {i + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {row.fname}
                        </TableCell>
                        <TableCell>{row.lname}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.number}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell align="center">
                            <button className='btn btn-primary mx-1' onClick={() => handleEdit(i)}><EditIcon/></button>
                            <button className='btn btn-danger' onClick={() => handleDelete(row)}><DeleteOutlineIcon/></button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            rowsPerPageOptions={[5, 10, 25]}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}