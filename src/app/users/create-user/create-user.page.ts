import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
})
export class CreateUserPage {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    gender: ['male', Validators.required],
  });

  onSubmit() {
    if (this.userForm.valid) {
      console.log('User Data:', this.userForm.value);
      this.userService.createUser(
        this.userForm.value.name as string,
        this.userForm.value.email as string,
        this.userForm.value.gender as 'female' | 'male'
      );
      this.router.navigate(['users']);
    }
  }
}
