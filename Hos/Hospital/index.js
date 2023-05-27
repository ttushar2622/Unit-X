let LoginForm = document.querySelector(".login");
let register = document.querySelector(".register");
let Input = document.querySelector(".Input");

LoginForm.onclick = () => {
  Input.innerHTML = `
    <input type="text" placeholder="Email">
    <input type="text" placeholder="Password">
    <button class="loginfetch">Login</button>
    `;
};

register.onclick = () => {
  Input.innerHTML = `
    <input type="text" placeholder="Username">
    <input type="text" placeholder="Email">
    <input type="text" placeholder="Password">
    <input type="checkbox" class="check">
    <button class="Register-Fetch">Register</button>
    
    `;
};

Input.onclick = async (e) => {
  if (e.target.classList.contains("Register-Fetch")) {
    let username = document.querySelector("input:nth-child(1)").value;
    let email = document.querySelector("input:nth-child(2)").value;
    let password = document.querySelector("input:nth-child(3)").value;
    let doctor = document.querySelector(".check").checked;

    let obj = {
      username,
      email,
      password,
      doctor,
    };
    console.log(obj);
    Registeruser(obj);
  }
  if (e.target.classList.contains("loginfetch")) {
    let email = document.querySelector("input:nth-child(1)").value;
    let password = document.querySelector("input:nth-child(2)").value;
    let obj = {
      email,
      password,
    };
    console.log(obj);
    loginuser(obj);
  }
};

function Registeruser(data) {
  axios
    .post("https://bramble-absorbing-dumpling.glitch.me/users", data)
    .then((res) => {
      console.log(res.data);
      alert("Register success");
    });
}

function loginuser(data) {
  let get;
  let user = false;
  let doctor = false;
  axios
    .get("https://bramble-absorbing-dumpling.glitch.me/users")
    .then((res) => {
      get = res.data;
      console.log(res.data);
      get.filter((element) => {
        if (element.email == data.email && element.password == data.password) {
          user = true;
          doctor = element.doctor;
        }
      });
      if (user) {
        alert("login success");
        console.log(doctor);

        if (doctor) {
          window.location.href = "./doctor.html";
        } else {
          window.location.href = "./book.html";
        }
      } else {
        alert("login failed");
      }
    });
}
