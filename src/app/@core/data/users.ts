import { Observable } from 'rxjs';
import { Usuario } from 'src/app/auth/usuario';

export interface User {
  name: string;
  picture: string;
}

export interface Contacts {
  usuario: Usuario;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}

export abstract class UserData {
  abstract getUsers(): Observable<User[]>;
  abstract getContacts(): Observable<Contacts[]>;
  abstract getRecentUsers(): Observable<RecentUsers[]>;
}
