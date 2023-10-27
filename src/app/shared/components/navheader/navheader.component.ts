import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { getAuth, onAuthStateChanged, updateProfile } from '@angular/fire/auth';


@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.css']
})

export class NavheaderComponent implements OnInit{
  expanded = false;
  expanded2 = false;
  dataUser: any;
  admin: string = 'juanesbs2003@hotmail.com';
  adminButton = false;
  auth = getAuth();
      // console.log(user);

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.expanded2 = false; // Asegura que expanded2 esté en false cuando expanded cambie
  }

  toggleExpanded2() {
    this.expanded2 = !this.expanded2;
    this.expanded = false; // Asegura que expanded esté en false cuando expanded2 cambie
  }



  constructor(private userService: UserService, private router: Router,){}

  logOut() {
    this.userService.cerrarSesion()
      .then(() => {
        this.router.navigate(['auth/login']);
      })
      .catch(error => console.log(error));

  }

  defaultUser:string | undefined = this.auth.currentUser?.email?.substring(0,6);

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.expanded = !this.expanded2

    }
  }



  UserARRAY:string | undefined | string[] | Promise<void> = this.auth.currentUser?.displayName === null ? this.defaultUser : this.auth.currentUser?.displayName?.split(" ");

  UserName!:string | undefined;


  capitalizeFirstLetter(inputString: string): string {
    if (inputString.length === 0) {
      return inputString;
    }
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }


  ngOnInit(){

      this.UserName=this.capitalizeFirstLetter(this.UserARRAY!.toString());




     onAuthStateChanged(this.auth, (user) => {
      if (user?.email === this.admin) {
        this.adminButton = true;
      } else {
        this.adminButton = false;
      }
    });


    } ;

}



