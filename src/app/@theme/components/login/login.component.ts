// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/auth/auth.service';
// import { Usuario } from 'src/app/auth/usuario';
// import swal from 'sweetalert2';

// @Component({
//   selector: 'ngx-login',
//   templateUrl: './login.component.html',
// })
// export class LoginComponent {
//   titulo: string = 'Inicio De Sesion';
//   usuario: Usuario;

//   constructor(private router: Router, private authService: AuthService) {
//     this.usuario = new Usuario();
//   }

//   ngOnInit(): void {}

//   login(): void {
//     /*console.log(this.usuario);*/
//     if (this.usuario.username == null || this.usuario.password == null) {
//       swal.fire(
//         'Error Login',
//         'El usuario o contraseña no puede ser vacias!',
//         'error'
//       );
//       return;
//     }

//     this.authService.login(this.usuario).subscribe(
//       (response) => {
//         //console.log(response);

//         this.authService.guardarUsuario(response.access_token);
//         this.authService.guardarToken(response.access_token);
//         let usuario = this.authService.usuario.nombre;
//         this.router.navigate(['/clientes']);
//         swal.fire(
//           'Login',
//           `Hola ${usuario}, has iniciado sesion con exito!`,
//           'success'
//         );
//       },
//       (err) => {
//         if (err.status == 400) {
//           swal.fire(
//             'Error Login',
//             'El Usuario o contraseña son incorrectas',
//             'error'
//           );
//         }
//       }
//     );
//   }
// }
