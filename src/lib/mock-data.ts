export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: 'Admin' | 'User' | 'Editor';
  department?: string;
  location?: string;
}

export const initialUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', age: 28, role: 'Admin', department: 'Engineering', location: 'New York' },
  { id: 2, name: 'Bob Smith', email: 'bob.s@example.com', age: 34, role: 'User', department: 'Marketing', location: 'San Francisco' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', age: 45, role: 'Editor', department: 'Sales', location: 'Chicago' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', age: 31, role: 'Admin', department: 'Human Resources', location: 'London' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan.h@example.com', age: 38, role: 'User', department: 'Operations', location: 'Los Angeles' },
  { id: 6, name: 'Fiona Glenanne', email: 'fiona.g@example.com', age: 33, role: 'Editor', department: 'Product', location: 'Miami' },
  { id: 7, name: 'George Costanza', email: 'george.c@example.com', age: 52, role: 'User', department: 'Finance', location: 'New York' },
  { id: 8, name: 'Heidi Turner', email: 'heidi.t@example.com', age: 29, role: 'User', department: 'Customer Support', location: 'Denver' },
  { id: 9, name: 'Ivan Drago', email: 'ivan.d@example.com', age: 41, role: 'Editor', department: 'Engineering', location: 'Moscow' },
  { id: 10, name: 'Jane Doe', email: 'jane.d@example.com', age: 26, role: 'User', department: 'Marketing', location: 'Austin' },
  { id: 11, name: 'Kyle Broflovski', email: 'kyle.b@example.com', age: 29, role: 'Admin', department: 'IT', location: 'South Park' },
  { id: 12, name: 'Laura Palmer', email: 'laura.p@example.com', age: 22, role: 'Editor', department: 'Media', location: 'Twin Peaks' },
  { id: 13, name: 'Michael Scott', email: 'michael.s@example.com', age: 48, role: 'Admin', department: 'Sales', location: 'Scranton' },
  { id: 14, name: 'Nina Williams', email: 'nina.w@example.com', age: 35, role: 'User', department: 'Security', location: 'Dublin' },
  { id: 15, 'name': 'Oscar Martinez', email: 'oscar.m@example.com', age: 43, role: 'User', department: 'Accounting', location: 'Scranton' },
  { id: 16, name: 'Pam Beesly', email: 'pam.b@example.com', age: 32, role: 'Editor', department: 'Design', location: 'New York' },
  { id: 17, name: 'Quentin Coldwater', email: 'quentin.c@example.com', age: 25, role: 'User', department: 'Magic', location: 'Brakebills' },
  { id: 18, name: 'Rachel Green', email: 'rachel.g@example.com', age: 36, role: 'User', department: 'Fashion', location: 'New York' },
  { id: 19, name: 'Steve Rogers', email: 'steve.r@example.com', age: 105, role: 'Admin', department: 'Leadership', location: 'Brooklyn' },
  { id: 20, name: 'Tony Stark', email: 'tony.s@example.com', age: 53, role: 'Admin', department: 'Engineering', location: 'Malibu' }
];