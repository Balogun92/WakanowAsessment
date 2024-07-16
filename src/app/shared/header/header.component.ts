import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private route: Router){
    
  }

  @Input() userName: any;
  @Input() userRole: any;

  logOut(){
    localStorage.clear();
    this.route.navigate(['/home'])
  }

}
