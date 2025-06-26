import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, initialUsers } from '@/lib/mock-data';
// The arrayMove utility from dnd-kit makes reordering much easier and safer
import { arrayMove } from '@dnd-kit/sortable';

// Define the shape of a column, used for both display and configuration
export interface Column {
  id: keyof User;
  label: string;
  visible: boolean;
}

// Define the shape of the sorting state
interface SortState {
  key: keyof User | '';
  direction: 'asc' | 'desc';
}

// Define the shape of the entire slice state
export interface TableState {
  data: User[];
  columns: Column[];
  searchTerm: string;
  sort: SortState;
  pagination: {
    page: number;
    rowsPerPage: number;
  };
  editingRowId: number | null;
}

// Define the initial state for the table
export const initialState: TableState = {
  data: initialUsers,
  columns: [
    { id: 'name', label: 'Name', visible: true },
    { id: 'email', label: 'Email', visible: true },
    { id: 'age', label: 'Age', visible: true },
    { id: 'role', label: 'Role', visible: true },
    { id: 'department', label: 'Department', visible: false },
    { id: 'location', label: 'Location', visible: false },
  ],
  searchTerm: '',
  sort: { key: '', direction: 'asc' },
  pagination: { page: 0, rowsPerPage: 10 },
  editingRowId: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    // Replaces the entire dataset, useful for importing CSV data
    setData: (state, action: PayloadAction<User[]>) => {
      state.data = action.payload;
    },
    // Updates a single user's data after inline editing
    updateUser: (state, action: PayloadAction<Partial<User> & { id: number }>) => {
      const index = state.data.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
    },
    // Deletes a user from the dataset
    deleteUser: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(user => user.id !== action.payload);
    },
    // Updates the global search term
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    // Toggles sorting direction or changes the sort key
    setSort: (state, action: PayloadAction<keyof User>) => {
      const isAsc = state.sort.key === action.payload && state.sort.direction === 'asc';
      state.sort.direction = isAsc ? 'desc' : 'asc';
      state.sort.key = action.payload;
    },
    // Toggles the visibility of a single column
    setColumnVisibility: (state, action: PayloadAction<{ id: keyof User; visible: boolean }>) => {
      const column = state.columns.find(c => c.id === action.payload.id);
      if (column) {
        column.visible = action.payload.visible;
      }
    },
    // Sets the current page for pagination
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    // Sets the number of rows per page and resets to the first page
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.rowsPerPage = action.payload;
      state.pagination.page = 0;
    },
    // Sets which row is currently in inline-edit mode
    setEditingRowId: (state, action: PayloadAction<number | null>) => {
        state.editingRowId = action.payload;
    },
    // Replaces the entire columns array, used for column reordering
    setColumns: (state, action: PayloadAction<Column[]>) => {
        state.columns = action.payload;
    },
    // Reorders the user data array based on a drag-and-drop action
    reorderUsers: (state, action: PayloadAction<{ activeId: number; overId: number }>) => {
      const { activeId, overId } = action.payload;
      
      const oldIndex = state.data.findIndex((user) => user.id === activeId);
      const newIndex = state.data.findIndex((user) => user.id === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        state.data = arrayMove(state.data, oldIndex, newIndex);
      }
    },
  },
});

// Export all the actions for use in components
export const {
  setData,
  updateUser,
  deleteUser,
  setSearchTerm,
  setSort,
  setColumnVisibility,
  setPage,
  setRowsPerPage,
  setEditingRowId,
  setColumns,
  reorderUsers,
} = tableSlice.actions;

// Export the reducer to be included in the store
export default tableSlice.reducer;