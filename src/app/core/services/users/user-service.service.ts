import { Injectable } from '@angular/core';


interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  status: string
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private users: User[] = [];
  private currentUser: User | null = null;
  private nextId: number = 1;


  constructor() {

    this.users = [
      {
      id: 1,
      firstName: 'Oluwatoyin',
      lastName: 'Balogun',
      email: 'OBalogun@wakanow.com',
      role: 'Admin',
      password: 'Wakanow@123',
      status: 'Approved'
      },
      {
        id: 2,
        firstName: 'Oreoluwa',
        lastName: 'George',
        email: 'OGeorge@wakanow.com',
        role: 'User',
        password: 'Wakanow@453',
        status: 'Pending'
      },

      {
        id: 3,
        firstName: 'Lateef',
        lastName: 'Bamishe',
        email: 'LBamishe@wakanow.com',
        role: 'User',
        password: 'Wakanow@234',
        status: 'Pending'
      },
      {
        id: 4,
        firstName: 'Samuel',
        lastName: 'Olalekan',
        email: 'SOlalekan@wakanow.com',
        role: 'User',
        password: 'Wakanow@567',
        status: 'Rejected'
      },
      {
        id: 5,
        firstName: 'Rufai',
        lastName: 'Adamu',
        email: 'RAdamu@wakanow.com',
        role: 'User',
        password: 'Wakanow@324',
        status: 'Approved'
      },

    ];
    this.nextId = 6;
   }

   login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password && u.status === 'Approved');
    if (user) {
      this.currentUser = user;
      localStorage.setItem( 'firstName', user.firstName,)
      localStorage.setItem( 'userRole', user.role,)

      return true;
    }
    return false;
  }

  addUser(user: User): boolean {
    if (this.users.find(u => u.email === user.email)) {
      return false;
    }
    user.id = this.nextId++;
    this.users.push(user);
    localStorage.setItem('list of users', JSON.stringify(this.users))

    console.log('New user added:', user);
    return true;
  }

getAllUsers(){
  return this.users
}


editUser(id: number, updatedUser: Partial<User>): boolean {
  const userIndex = this.users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    return false; // User not found
  }

  this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
  return true;
}

}

