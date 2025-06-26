// src/components/table/EditableTableRow.tsx
"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TableCell, TextField, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '@/lib/mock-data';
import { Column, updateUser, deleteUser, setEditingRowId } from '@/store/tableSlice';
import ConfirmationDialog from './ConfirmationDialog';

interface Props {
    row: User;
    visibleColumns: Column[];
    isEditing: boolean;
}

export default function EditableTableRow({ row, visibleColumns, isEditing }: Props) {
    const dispatch = useDispatch();
    const { control, handleSubmit, reset, formState: { errors } } = useForm<User>({ defaultValues: row });
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleEdit = () => { reset(row); dispatch(setEditingRowId(row.id)); };
    const handleCancel = () => { dispatch(setEditingRowId(null)); };
    const onSubmit = (data: User) => { const payload = { ...data, id: row.id, age: Number(data.age) }; dispatch(updateUser(payload)); dispatch(setEditingRowId(null)); };
    const handleDelete = () => { dispatch(deleteUser(row.id)); setConfirmOpen(false); };

    if (isEditing) {
        return (
            <>
                {visibleColumns.map(column => (
                    <TableCell key={column.id}>
                        <Controller name={column.id} control={control} rules={{ required: 'This field is required', ...(column.id === 'age' && { valueAsNumber: true, min: { value: 18, message: 'Must be 18+' }}) }}
                            render={({ field }) => ( <TextField {...field} value={field.value || ''} type={column.id === 'age' ? 'number' : 'text'} variant="standard" fullWidth error={!!errors[column.id]} helperText={errors[column.id]?.message} /> )} />
                    </TableCell>
                ))}
                <TableCell align="right">
                    <IconButton onClick={handleSubmit(onSubmit)}><SaveIcon /></IconButton>
                    <IconButton onClick={handleCancel}><CancelIcon /></IconButton>
                </TableCell>
            </>
        );
    }

    return (
        <>
            {visibleColumns.map(column => (
                <TableCell key={column.id} onDoubleClick={handleEdit}>
                    {String(row[column.id as keyof User] ?? '')}
                </TableCell>
            ))}
            <TableCell align="right">
                <IconButton onClick={handleEdit} size="small"><EditIcon /></IconButton>
                <IconButton onClick={() => setConfirmOpen(true)} size="small"><DeleteIcon /></IconButton>
            </TableCell>
            <ConfirmationDialog open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete} title="Delete User" description={`Are you sure you want to delete ${row.name}? This action cannot be undone.`} />
        </>
    );
}