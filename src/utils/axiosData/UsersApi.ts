import { api } from "../api";
class UsersApi {
  static getAll() {
    return api.get(`users`);
  }
  static getOne(id: number) {
    return api.get(`users/${id}`);
  }
  static create(values: any) {
    return api.post(`users`, values);
  }
  static update(id: number) {
    return api.patch(`users/${id}`);
  }
  static delete(id: number, token: string) {
    return api.delete(`users/${id}`);
  }
}
export default UsersApi;
