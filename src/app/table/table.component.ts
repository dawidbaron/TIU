import { Component, OnInit } from '@angular/core';
import { DataService, User } from '../service/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  users: User[];
  id: string;
  role: boolean;

  constructor(
    private service: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem('role') === 'Admin') {
      this.role = true;
    }
    else {
      this.role = false;
    }

    this.id = this.route.snapshot.params['id'];
    this.service.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(this.users)
    }, error => {console.log(error);})
  }

  updateUser(id) {
    this.router.navigate(['update', id])
    console.log(`update ${id}`)
  }
  detailsUser(id) {
    this.router.navigate(['more', id])
  }

  deleteUser(id) {

    this.service.deleteById(id).subscribe(
      response => { this.ngOnInit(); }
    )
  }

  addNewUser(): void {
    this.router.navigate(['add'])
  }

  
  openDetails(id){
    this.router.navigate(['details',id]);
  }
}
