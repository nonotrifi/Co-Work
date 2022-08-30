import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  imageUrl: string = '';

  constructor(
    private userService:  UserService,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    // this.authService.getUser().subscribe(
    //   (res) => {
    //     console.log('got the user ->', res);
    //     const imageUrl = res.imageUrl || 'https://via.placeholder.com/300';
    //     this.imageUrl = imageUrl;
    //   },
    //   (err) => {
    //     console.error(err);
    //   }
    // );
    this.authService.getUser().subscribe(
      (res) => {
        console.log('got the user -> ', res);
         const imageUrl = res.imageUrl || '';
         this.imageUrl = imageUrl;
      },
      (err) => {
        console.error(err);
      }
    );
  }


  url=""


  onSelectFile(e: any) {
    console.log('selecting a file now.');
    this.userService.uploadImage(e.target.files[0]).subscribe(
      (res) => {
        // this.url = res.url;
        console.log('image poster', res);
      },
      (err) => {
        console.log('error', err);
      }
    );
    console.log('got target files');

    if (e.target.files) {
      const reader = new FileReader();
      console.log('got target files');
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (event: any) => {
        console.log('on loadid ', reader.onload);
        const result = reader.result;
        console.log('result of file reading:', result);

        this.imageUrl = event.target.result;
      };
    }
  }
}
