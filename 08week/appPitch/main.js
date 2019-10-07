const loginPage = `<button onclick="loadUserPage()">LOG IN</button>`;
const userPage = `<h2>shipping address</h2>
<div>
  <p>One Infinite Loop</p>
  <p>Cupertino, CA 95014</p>
</div>
<h2>billing address</h2>
<input type="checkbox" checked=true><span>(same as shipping address)</span>
<div id="billing"></div>
<h2>alternate/previous addresses</h2>
<div>
<button id="save" onclick="saveProgress()">SAVE</button>
<button onclick="loadLoginPage()">LOG OUT</button>
</div>`;
const main = document.querySelector("main");

window.onload = () => {
  loadLoginPage();
}

const loadUserPage = () => {
  main.innerHTML = userPage;
}
const loadLoginPage = () => {
  main.innerHTML = loginPage;
}
const saveProgress = () => {
  window.alert("Addresses saved.");
}