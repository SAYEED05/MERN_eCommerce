import bcrypt from "bcryptjs";

const Users = [
  {
    name: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: true,
  },
  {
    name: "userOne",
    email: "userOne@example.com",
    password: bcrypt.hashSync("password", 10),
  },
  {
    name: "userTwo",
    email: "userTwo@example.com",
    password: bcrypt.hashSync("password", 10),
  },
];

export default Users;
