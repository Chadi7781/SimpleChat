const expect = require('expect');

const { Users } = require('./users');

describe('Users' , () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id : '1',
      username : 'Chadi',
      room: 'Contact pour un immobilere',
    } ,{
      id : '2',
      username : 'Nour',
      room: 'Contacte Agent',
    },
      {
        id : '3',
        username : 'Boubaker',
        room: 'Contact pour un immobilere',
    }];
  });

  it('should add new user' , () =>{
    const users = new Users();
    const user ={
      id : '123',
      username : 'Mohammed',
      room : 'Agence'
    };

    const resUser = users.addUser(user.id, user.username, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user' , () => {
    const userId = '1';
    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove  user' , () => {
    const userId = '42';
    const user = users.removeUser(userId);

    expect(user).toNotExist;
    expect(users.users.length).toBe(3);
  });

  it('should find user ' , () =>{
    const userId = '2';
    user = users.getUser(userId);

    expect(userId).toBe(userId);

  });


  it('should not find user ' , () =>{
    const userId = '42';
    user = users.getUser(userId);

    expect(userId).toBe(userId);
  });

  it('should return names for Contact pour un immobilere' , () =>{
    const userList = users.getUserList('Contact pour un immobilere');
    expect(userList).toEqual(['Chadi' , 'Boubaker']);
  });

  it('should return names for Agence' , () =>{
    const userList = users.getUserList('Agence');
    expect(userList).toEqual(['Mohammed']);
  });





})
