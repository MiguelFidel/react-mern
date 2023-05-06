import React, {useState, useEffect} from 'react';
import AddIcon from '@mui/icons-material/Add';
import DataTable from './components/datatable';
import RefreshIcon from '@mui/icons-material/Refresh';
import Add from './components/add';
import { getUser } from '../../services/api';


export default function Home(){
    // variables
    const [addShow, setAddShow] = useState(false);
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);


    // getting data from database
    useEffect(() => {
        // Get API
        getUser().then((response)=> {
            setData(response);
            setLoader(false);
        });

    },[]);

    const Refresh = () =>{
        window.location.reload();
    }

    return (
        <div className='container mt-5'>
            <h1>Users</h1>
            <div className='d-flex my-5'>
                <button className='btn btn-primary mx-1' onClick={() => setAddShow(true)}><AddIcon/>Add User&nbsp;</button>
                <button className='btn btn-success' onClick={() => Refresh()}><RefreshIcon/>Refresh&nbsp;</button>
                <Add show={addShow} onHide={() => setAddShow(false)}/>
            </div>
            {loader? null : <DataTable data={data}/>}
        </div>
    );
}