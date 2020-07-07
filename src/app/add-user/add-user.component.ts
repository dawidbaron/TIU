import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

export class Image {
  img1: string;
  img2: string;
  img3: string;
  img4: string;

  constructor() {
    this.img1 = 'https://images2.minutemediacdn.com/image/upload/c_fill,w_912,h_516,f_auto,q_auto,g_auto/shape/cover/sport/fbl-eur-c1-schalke-manchester-5c7a85af7d311abc94000001.jpg';
    this.img2 = 'https://ichef.bbci.co.uk/news/410/cpsprodpb/BBE2/production/_102689084_gettyimages-999516806.jpg';
    this.img3 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Francesco_Totti_Chelsea_vs_AS-Roma_10AUG2013.jpg/282px-Francesco_Totti_Chelsea_vs_AS-Roma_10AUG2013.jpg';
    this.img4 = 'https://www.tongafootball.to/cms/wp-content/uploads/2018/07/Shannon-01-1-e1532035536495.jpg';  }
}

export class PostUser {

  FirstName: string;
  LastName: string;
  ImgPath: string;

  constructor(
    FirstName: string,
    LastName: string,
    ImgPath: string
  ) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.ImgPath = ImgPath;
  }
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})


export class AddUserComponent implements OnInit {

  FirstName: string;
  LastName: string;
  ImgPath: string;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    var image = new Image();
    if (this.ImgPath === 'img1') {
      this.ImgPath = image.img1;
    } else if (this.ImgPath === 'img2') {
      this.ImgPath = image.img2;
    } else if (this.ImgPath === 'img3') {
      this.ImgPath = image.img3;
    } else if (this.ImgPath === 'img4') {
      this.ImgPath = image.img4;
    }

    var user = new PostUser(this.FirstName, this.LastName, this.ImgPath);
    this.dataService.addUser(user).subscribe(x => { }, error => { console.log(error) });
    this.router.navigate(['table']);
  }
}
