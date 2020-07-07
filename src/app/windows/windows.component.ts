import { Component, OnInit } from '@angular/core';
import { User, DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-windows',
  templateUrl: './windows.component.html',
  styleUrls: ['./windows.component.css']
})
export class WindowsComponent implements OnInit {

  users: User[];
  role: boolean;

  constructor(private service: DataService, private route: ActivatedRoute, private router: Router, ) { }

  ngOnInit(): void {
    if (localStorage.getItem('role') === 'Admin') this.role = true;
    else this.role = false;

    this.service.getAllUsers().subscribe(data => { this.users = data; }, error => {

    })
  }

  updateUser(id) {
    this.router.navigate(['update', id]);
  }

  openDetails(id: string) {
    this.router.navigate(['more', id])
  }

  deleteUser(id) {
    this.service.deleteById(id).subscribe(response => { this.ngOnInit(); })
  }
}
