// src/components/table/ManageColumnsModal.tsx

import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, FormGroup, FormControlLabel, Checkbox, DialogActions, Button } from '@mui/material';
import { RootState } from '@/store/rootReducer';
import { setColumnVisibility, Column } from '@/store/tableSlice';
import { User } from '@/lib/mock-data'; // FIX: Import User type

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ManageColumnsModal({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.table.columns);

  // FIX: Change 'keyof any' to the specific 'keyof User' type.
  const handleToggle = (id: keyof User, checked: boolean) => {
    dispatch(setColumnVisibility({ id, visible: checked }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <FormGroup>
          {columns.map((column: Column) => (
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  checked={column.visible}
                  onChange={(e) => handleToggle(column.id, e.target.checked)}
                />
              }
              label={column.label}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}