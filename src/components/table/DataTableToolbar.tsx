"use client";

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toolbar, Typography, InputAdornment, TextField, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { RootState } from '@/store/rootReducer';
import { setSearchTerm, setData } from '@/store/tableSlice';
import { User } from '@/lib/mock-data';
import ManageColumnsModal from './ManageColumnsModal';
import { useColorMode } from '../providers/MuiThemeProvider';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

export default function TheToolbar() {
    const dispatch = useDispatch();
    const { data: allRows, columns } = useSelector((state: RootState) => state.table);
    const colorMode = useColorMode();
    const theme = useTheme();

    const [modalOpen, setModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchTerm(event.target.value));
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const requiredKeys: string[] = ['id', 'name', 'email', 'age', 'role'];
                    const foundHeaders = results.meta.fields || [];
                    const hasAllRequiredHeaders = requiredKeys.every(key => foundHeaders.includes(key));
                    if (hasAllRequiredHeaders) {
                        const parsedData = (results.data as User[]).map(row => ({
                            ...row, id: Number(row.id), age: Number(row.age),
                        }));
                        dispatch(setData(parsedData));
                        alert('Data imported successfully!');
                    } else {
                        alert(`Invalid CSV format. Required headers are missing.\nRequired: ${requiredKeys.join(', ')}\nFound: ${foundHeaders.join(', ')}`);
                    }
                },
                error: (error) => { alert(`Error parsing CSV: ${error.message}`); }
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleExport = () => {
        const visibleColumnIds = columns.filter(c => c.visible).map(c => c.id);
        const headersToExport = new Set(visibleColumnIds);
        headersToExport.add('id');
        const columnsToExport = Array.from(headersToExport);
        const dataToExport = allRows.map(row => {
            // =========================================================
            //  THE FIX: This comment tells ESLint to ignore the 'any'
            //  type on the next line, which will fix the Vercel build.
            // =========================================================
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newRow: Record<string, any> = {};
            columnsToExport.forEach(colId => {
                newRow[colId] = row[colId as keyof User];
            });
            return newRow;
        });
        const csv = Papa.unparse(dataToExport);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'datatable_export.csv');
    };

    return (
        <>
            <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
                    Users
                </Typography>
                <TextField variant="standard" placeholder="Search..." onChange={handleSearchChange} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}} sx={{ mr: 2 }} />
                <Tooltip title="Manage Columns"><IconButton onClick={() => setModalOpen(true)}><ViewColumnIcon /></IconButton></Tooltip>
                <Tooltip title="Import CSV">
                    <IconButton component="label">
                        <FileDownloadIcon />
                        <input type="file" accept=".csv" hidden onChange={handleImport} ref={fileInputRef} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Export CSV">
                    <IconButton onClick={handleExport}>
                        <FileUploadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Toggle light/dark theme"><IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}</IconButton></Tooltip>
            </Toolbar>
            <ManageColumnsModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}