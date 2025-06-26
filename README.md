# Dynamic Data Table Manager

A feature-rich, enterprise-grade data table built with Next.js, Redux Toolkit, and Material-UI. This project demonstrates a robust architecture for managing complex state, handling dynamic UI updates, and implementing real-world features like sorting, filtering, inline editing, and CSV import/export.

[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC.svg?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-v5-0081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**Live Demo:** *https://surefy-assignment-7v62.vercel.app*

---

## ✨ Features

### Core Functionality
-   **📊 Dynamic Table View**: Displays data with a default set of columns (`Name`, `Email`, `Age`, `Role`).
-   **🔄 Bi-Directional Sorting**: Sort data by any column in ascending or descending order.
-   **🔍 Global Search**: A single search bar to filter data across all visible fields.
-   **📄 Client-Side Pagination**: Efficiently navigate through large datasets with paginated results (10 rows per page).
-   **⚙️ Dynamic Column Management**:
    -   Add or remove columns (`Department`, `Location`) on the fly.
    -   Show/hide columns using a "Manage Columns" modal.
    -   User's column visibility preferences are persisted in `localStorage`.
-   **📤 CSV Export**: Export the current, filtered, and sorted view of the table (visible columns only) to a `.csv` file.
-   **📥 CSV Import**: Upload a `.csv` file to populate or replace the table data, with basic validation.

### 🌟 Bonus Features (Included)
-   **✏️ Inline Row Editing**: Double-click any row to enter edit mode. Inputs are validated (e.g., age must be a number).
-   **✅ Row Actions**: Edit or Delete individual rows, with a confirmation dialog for destructive actions.
-   **🌓 Light/Dark Mode**: Toggle between light and dark themes, powered by MUI Theming.
-   **↔️ Column Reordering**: Drag and drop column headers to reorder them to your liking.
-   **📱 Fully Responsive Design**: The table and controls adapt gracefully to all screen sizes, from mobile to desktop.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **UI Library**: [Material-UI (MUI) v5](https://mui.com/)
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) for centralized and predictable state.
-   **State Persistence**: [Redux Persist](https://github.com/rt2zz/redux-persist) to save UI preferences to `localStorage`.
-   **Form Handling**: [React Hook Form](https://react-hook-form.com/) for performant and scalable form state management (used in inline editing).
-   **CSV Handling**: [PapaParse](https://www.papaparse.com/) for robust CSV parsing and [FileSaver.js](https://github.com/eligrey/FileSaver.js/) for exporting files.
-   **Drag & Drop**: [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) for column reordering.
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   Node.js (v18.x or later)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/dynamic-data-table.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd dynamic-data-table
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts a production server.
-   `npm run lint`: Lints the codebase using ESLint.

## 🏗️ Architectural Decisions

This project was built with scalability and maintainability in mind.

-   **Component-Based Architecture**: The UI is broken down into logical, reusable components (e.g., `DataTable`, `DataTableToolbar`, `EditableTableRow`) located in the `src/components` directory. This promotes separation of concerns and code reuse.

-   **Centralized State with Redux Toolkit**: For an application with many interconnected state variables (data, sorting, filtering, pagination, UI state), Redux provides a single source of truth. Redux Toolkit was chosen to minimize boilerplate and enforce best practices like immutability via Immer.

-   **Memoized Selectors for Performance**: To prevent unnecessary re-renders and expensive computations, memoized selectors (created with `reselect`, which is built into RTK) are used. The `selectVisibleRows` selector, for example, only re-calculates the filtered and sorted data when the underlying state it depends on actually changes.

-   **Client-Side Logic**: Features like sorting, filtering, and pagination are handled on the client-side for a fast and responsive user experience. This is suitable for datasets of a moderate size. For larger datasets, this architecture could be extended to handle server-side operations by dispatching async thunks to an API.

-   **Graceful State Persistence**: `redux-persist` is configured to only save the user's UI preferences (like column visibility and order) to `localStorage`. The core application data is fetched fresh on each load, ensuring the user always sees the most recent data while their layout customizations are preserved.
