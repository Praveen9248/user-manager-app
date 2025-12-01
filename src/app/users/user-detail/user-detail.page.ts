import { Component, inject, OnInit } from '@angular/core';
import { UserModelInterface } from '../interfaces/user-model-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  userData!: UserModelInterface;

  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  actionSheetCtrl = inject(ActionSheetController);

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userData = this.userService.fetchUserDetail(+id)!;
    }
  }

  onEdit(id: number) {
    this.router.navigate(['users', 'edit', `${id}`]);
  }

  onDelete(id: number) {
    this.userService.deleteUser(id);
    this.router.navigate(['users']);
  }

  async openDeleteActionSheet(userId: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Delete User',
          role: 'destructive',
          handler: () => {
            this.onDelete(userId);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }
}
