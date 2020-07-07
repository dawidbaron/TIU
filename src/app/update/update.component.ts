import { Component, OnInit } from '@angular/core';
import { User, DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id: string
  user: User
  FirstName: string
  LastName: string

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.dataService.getUserById(this.id).subscribe(data => {

      this.user = data;
      this.FirstName = data.firstName
      this.LastName = data.lastName

    }, error => { console.log(error); })
  }

  update() {

    this.user.lastName = this.LastName
    this.user.firstName = this.FirstName

    this.dataService.updateUserById(this.user).subscribe(response => { }, error => {
      console.log(error);
    })
    this.redirectTo('table')
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
