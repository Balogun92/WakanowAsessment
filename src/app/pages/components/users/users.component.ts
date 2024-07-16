import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserServiceService } from '../../../core/services/users/user-service.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatMenuModule, MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit{
  users: any;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;
  selectedUser: any;
  showMenu = true;
  userFirstName: any;
  userRole: any;
  response!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: UserServiceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void{
    this.userFirstName = localStorage.getItem('firstName');
    this.userRole= localStorage.getItem('userRole');
    this.getUsers();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers(){
     this.users = this.apiService.getAllUsers();
    this.dataSource = new MatTableDataSource(this.users);
    console.log(this.dataSource)

  }

  onSelectUser(row:any){
    this.selectedUser = row;
    console.log(row)
    if(row.status === 'Approved'){
      this.showMenu = false;
    }if(row.status === 'Rejected'){
      this.showMenu = false;
    }if(row.status === 'Pending'){
      this.showMenu = true;
    }
    console.log(this.showMenu)
    console.log(row.status)
  }

  approveUser() {
    const row = this.selectedUser
    if (row.id !== null) {
      const updatedData = {
        firstName: row.firstName?.value,
        lastName: row.lastName?.value,
        email: row.email?.value,
        role: row.role?.value,
        password: row.password?.value,
        status: 'Approved',

      };
      const success = this.apiService.editUser(row, updatedData);
      this.response = success ? 'User edited successfully' : 'User not found';

      if (success) {
        this.openSnackBar('User approved successfully');
        this.getUsers();
      } else {
        this.openSnackBar('Update failed');
      }
    } else {
      this.openSnackBar('No user ID specified');
    }
  }

  rejectUser() {
    const row = this.selectedUser
    if (row.id !== null) {
      const updatedData = {
        firstName: row.firstName?.value,
        lastName: row.lastName?.value,
        email: row.email?.value,
        role: row.role?.value,
        password: row.password?.value,
        status: 'Rejected',

      };
      const success = this.apiService.editUser(row, updatedData);
      this.response = success ? 'User edited successfully' : 'User not found';

      if (success) {
        this.openSnackBar('User rejected');
        this.getUsers();
      } else {
        this.openSnackBar('Update failed');
      }
    } else {
      this.openSnackBar('No user ID specified');
    }
  }


  openSnackBar(response: any) {
    this._snackBar.open(response, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }
}

