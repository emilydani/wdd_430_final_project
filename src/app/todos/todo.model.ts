export class Todo {
  constructor(
    public _id: string,
    public id: string,
    public name: string,
    public status: string,
    public time: number,
    public details: string,
    public date: Date
  ) {}
}
