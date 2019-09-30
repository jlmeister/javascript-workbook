'use strict'

let arrUsers = [];

window.onload = () => {
  getUser(3)
}

const getUser = (numberOfUsersRequested = 1) => {
  fetch(`https://randomuser.me/api/?results=${numberOfUsersRequested}`)
  .then(response => response.json())
  .then(response => response.results)
  .then(response => response.forEach(user => arrUsers.push(user)))
}

const displayUsers = () => {
  const allUsers = document.getElementById('all-users');
  allUsers.innerHTML = ''; // clear the page of any displayed users first
  arrUsers.map((user, index) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    const text = document.createTextNode(`Name: ${user.name.first} ${user.name.last}`);
    const moreText = document.createElement('pre');
    const img = document.createElement('img');
    img.src = user.picture.large;
    btn.innerHTML = 'more info';
    li.appendChild(text);
    li.appendChild(document.createElement('br'));
    li.appendChild(moreText);
    li.appendChild(document.createElement('br'));
    li.appendChild(img);
    li.appendChild(document.createElement('br'));
    li.appendChild(btn);

    btn.onclick = () => {
      const email = `email: ${arrUsers[index].email}`;
      const phone = `phone: ${arrUsers[index].phone}`;
      const age = `age: ${arrUsers[index].dob.age}`;
      const dob = `DOB: ${arrUsers[index].dob.date.substring(0,10)}`;

      if(!moreText.innerHTML.length) {
        moreText.innerHTML = `${email}\n${phone}\n${age}\n${dob}`;
        btn.innerHTML = 'show less';
      }
      else {
        moreText.innerHTML = '';
        btn.innerHTML = 'more info';
      }
    };

    allUsers.append(li);
  });
}