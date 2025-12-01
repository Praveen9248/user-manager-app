import { Component, inject, OnInit } from '@angular/core';
import { UserModelInterface } from '../interfaces/user-model-interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-update-user',
  standalone: false,
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
})
export class UpdateUserPage implements OnInit {
  userData!: UserModelInterface;
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  router = inject(Router);

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userData = this.userService.fetchUserDetail(+id)!;
      this.userUpdateForm.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        gender: this.userData.gender,
        status: this.userData.status,
      });
    }
  }

  userUpdateForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    gender: ['', Validators.required],
    status: [false, Validators.required],
  });

  onUpdate() {
    if (this.userUpdateForm.valid) {
      let updatedData = this.userUpdateForm.value;
      this.userService.updateUser(
        this.userData.id,
        updatedData.name as string,
        updatedData.email as string,
        updatedData.status as boolean,
        updatedData.gender as 'male' | 'female'
      );
      this.router.navigate(['/users']);
    }
  }
}
