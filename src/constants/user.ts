export interface IUser {
  uid: string;
  vote?: string;
  email: string | null;
  photoURL: string | null;
  displayName: string | null;
}
