import { Component, OnInit } from '@angular/core';
import { User, DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user: User;
  Id: string;

  constructor(private service: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  this.Id = this.route.snapshot.params['id'];
    this.service.getUserById(this.Id).subscribe(x => {
      this.user = x;
    }, error => { console.log(error) });
  }

}
