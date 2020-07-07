import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostUser } from '../add-user/add-user.component';
import  {LoginCredentail}  from '../login/login.component';

export class User {

    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    imgPath: string;
    token: string
    role: string

    constructor(
        UserId: string,
        FirstName: string,
        LastName: string,
        UserName: string,
        Password: string,
        ImgPath: string,
        token: string,
        role: string
    ) { }
};

@Injectable({
    providedIn: 'root'
})

export class DataService {

    url = 'http://localhost:5000/user/';
    token = 'Bearer ' + localStorage.getItem('token');

    constructor(
        private http: HttpClient) { }

    login(loginCredentail: LoginCredentail): Observable<User> {

        var val = this.http.post<User>(this.url + 'authenticate', loginCredentail);
        return val;
    }

    getAllUsers(): Observable<User[]> {
        const token = localStorage.getItem('token');
            const httpOptions = {
            headers: new HttpHeaders({ 
                'Authorization': 'Bearer ' + localStorage.getItem("token") })
        }
        return this.http.get<User[]>(this.url + 'all', httpOptions);
    }

    getUserById(userId: string): Observable<User> {

        var path = this.url + userId;
        var val = this.http.get<User>(path, {
            headers: {
                Authorization: this.token
            }
        });
        return val;
    }

    updateUserById(user: User) {

        var val = this.http.put<User>(this.url, user, {
            headers: {
                Authorization: this.token
            }
        });
        return val;

    }

    addUser(user: PostUser) {

        var val = this.http.post<User>(this.url, user, {
            headers: {
                Authorization: this.token
            }
        });
        return val;

    }

    deleteById(userId: string) {

        var path = this.url + 'delete/' + userId;

        var val = this.http.delete<User>(path, {
            headers: {
                Authorization: this.token
            }
        });
        return val;

    }
}
