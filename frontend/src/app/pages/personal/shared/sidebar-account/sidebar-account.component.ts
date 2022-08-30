import { Component, OnInit } from '@angular/core';
import UserModel from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar-account',
  templateUrl: './sidebar-account.component.html',
  styleUrls: ['./sidebar-account.component.scss'],
})
export class SidebarAccountComponent implements OnInit {
  imageUrl: string = '';

  user?: UserModel;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (res) => {
        console.log('got the user ->', res);
        const imageUrl = res.imageUrl || 'https://via.placeholder.com/300';
        this.imageUrl = imageUrl;
        this.user = res._doc;
      },
      (err) => {
        console.error(err);
      }
    );

  }

  onSelectFile(e: any) {
    console.log('selecting a file now.');
    if (e.target.files) {
      const reader = new FileReader();
      this.userService.uploadImage(e.target.files[0]).subscribe((res) => {
        // this.url = res.url;
        console.log('image poster', res);
      });
      console.log('got target files');
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (event: any) => {

        this.imageUrl = event.target.result;

      };
    }
  }
}
