class Users {
  constructor(){
    this.users = [];
  }

  //**********Add User************//
  addUser(id, username, room){
    const  user = {id, username, room};
    this.users.push(user);

  }

  //**********Remove User************//
  removeUser(id){
    const  user = this.getUser(id)

    if(user){
      this.users = this.users.filter((user) => user.id != id);
    }
    return user
  }

  //**********Get User************//
  getUser(id){
    return this.users.filter((user) => user.id === id )[0];
  }

  //**********Get List of User************//
  getUserList(room){
    const user = this.users.filter((user) => user.room === room);
    const namesArray = user.map((user) => user.username);

    return namesArray;
  }
}

module.exports = { Users };


console.log("this is made for fun !!");
