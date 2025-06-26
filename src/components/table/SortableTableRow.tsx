// src/components/table/SortableTableRow.tsx
"use client";

import React from 'react';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useForm, Controller } from 'react-hook-form';
import { TableRow, TableCell, TextField, IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '@/lib/mock-data';
import { Column, updateUser, setEditingRowId } from '@/store/tableSlice';

interface Props {
  row: User;
  visibleColumns: Column[];
  isEditing: boolean;
  onDeleteClick: () => void;
}

export default function SortableTableRow({ row, visibleColumns, isEditing, onDeleteClick }: Props) {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: row.id });
  const { control, handleSubmit, reset, formState: { errors } } = useForm<User>({ defaultValues: row });

  const handleEdit = () => { reset(row); dispatch(setEditingRowId(row.id)); };
  const handleCancel = () => { dispatch(setEditingRowId(null)); };
  const onSubmit = (data: User) => { const payload = { ...data, id: row.id, age: Number(data.age) }; dispatch(updateUser(payload)); dispatch(setEditingRowId(null)); };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };


  return (
    <TableRow ref={setNodeRef} style={style} {...attributes} hover={!isEditing}>
      <TableCell padding="checkbox" {...listeners} sx={{ cursor: 'grab' }}>
        <DragIndicatorIcon />
      </TableCell>

      {isEditing ? (
        // Editing State Cells
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
      ) : (
        // Viewing State Cells
        <>
          {visibleColumns.map(column => (
            <TableCell key={column.id} onDoubleClick={handleEdit}>
              {String(row[column.id as keyof User] ?? '')}
            </TableCell>
          ))}
          <TableCell align="right">
            <IconButton onClick={handleEdit} size="small"><EditIcon /></IconButton>
            <IconButton onClick={onDeleteClick} size="small"><DeleteIcon /></IconButton>
          </TableCell>
        </>
      )}
    </TableRow>
  );
}