import { Injectable, signal } from '@angular/core';
import { UserModelInterface } from '../interfaces/user-model-interface';
import { IonRefresher } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users = signal<UserModelInterface[]>([]);

  data: UserModelInterface[] = [
    {
      id: 1,
      name: 'praveen',
      email: 'praveen@gmail.com',
      status: true,
      gender: 'male',
    },
    {
      id: 2,
      name: 'aditya',
      email: 'aditya@gmail.com',
      status: true,
      gender: 'male',
    },
    {
      id: 3,
      name: 'Varun',
      email: 'varun@gmail.com',
      status: false,
      gender: 'male',
    },
    {
      id: 4,
      name: 'Indrajith',
      email: 'indrajith@gmail.com',
      status: true,
      gender: 'male',
    },
    {
      id: 5,
      name: 'parthiv',
      email: 'parthiv@gmail.com',
      status: true,
      gender: 'male',
    },
    {
      id: 6,
      name: 'Isha',
      email: 'isha@gmail.com',
      status: false,
      gender: 'female',
    },
    {
      id: 7,
      name: 'Neha Chawla',
      email: 'nehachawla@gmail.com',
      status: true,
      gender: 'female',
    },
  ];

  constructor() {
    if (localStorage.getItem('users')) {
      let localData: UserModelInterface[] = JSON.parse(
        localStorage.getItem('users')!
      );
      if (localData) {
        this.users.set(localData);
      }
    } else {
      localStorage.setItem('users', JSON.stringify(this.data));
      this.users.set(this.data);
    }
  }

  ngOnInit() {}

  get fetchUsers() {
    return this.users();
  }

  createUser(name: string, email: string, gender: 'male' | 'female') {
    let newUser = {
      id: this.users().length
        ? Math.max(...this.users().map((u) => u.id)) + 1
        : 1,
      name: name,
      email: email,
      gender: gender,
      status: true,
    };
    this.users.update((currentUsers) => [...currentUsers, newUser]);
    this.loadUsers();
  }

  fetchUserDetail(id: number) {
    return this.users().find((user) => user.id === id);
  }

  updateUser(
    id: number,
    name: string,
    email: string,
    status: boolean,
    gender: 'male' | 'female'
  ) {
    const idx = this.users().findIndex((user) => user.id === id);
    this.users()[idx] = {
      id: id,
      name: name,
      email: email,
      status: status,
      gender: gender,
    };
    this.loadUsers();
  }

  deleteUser(id: number) {
    this.users.update((currentUsers) =>
      currentUsers.filter((user) => user.id !== id)
    );
    this.loadUsers();
  }

  loadUsers() {
    localStorage.setItem('users', JSON.stringify(this.users()));
  }
}
