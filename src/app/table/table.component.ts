import { Component, OnInit, Input } from '@angular/core';
import { DataService, User } from '../service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  users: User[];
  id: string;
  role: boolean;
  fileName= 'Pobierz dane.xlsx';  
  @Input() sortBy: string;
  searchName:string;
  

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
  onChangePage(users: User[]) {
    this.users = users;
}
  updateUser(id) {
    this.router.navigate(['update', id])
    console.log(`update ${id}`)
  }
  detailsUser(id) {
    this.router.navigate(['more', id])
  }
  exportexcel(): void 
    {
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
       XLSX.writeFile(wb, this.fileName);
			
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
