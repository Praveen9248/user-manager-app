import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './services/user-service';
import { Router } from '@angular/router';
import { ActionSheetController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {
  userService = inject(UserService);
  router = inject(Router);
  actionSheetCtrl = inject(ActionSheetController);

  async onDelete(slidingItem: IonItemSliding, id: number) {
    await slidingItem.close();
    this.userService.deleteUser(id);
  }

  onCreate() {
    console.log('create button clicked!!!');
    this.router.navigate(['users', 'create-user']);
  }

  onDetail(id: number) {
    this.router.navigate(['users', `${id}`]);
  }

  async onUpdate(slidingItem: IonItemSliding, id: number) {
    await slidingItem.close();
    this.router.navigate(['users', 'edit', `${id}`]);
  }

  async openDeleteActionSheet(slidingItem: IonItemSliding, userId: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Delete User',
          role: 'destructive',
          handler: () => {
            this.onDelete(slidingItem, userId);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: async () => {
            await slidingItem.close();
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
