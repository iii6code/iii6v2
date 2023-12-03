import "../public/app.scss";
import Web3 from "web3";
import { ethers } from "ethers";
import { sha256 } from "crypto-hash";
import UAuth from "@uauth/js";
import { s0x, Friends, Groups } from "./bin/contracts";
import { bg, dev_inf, stage, nav, head, move, modal, modalbox, foot } from "./bin/mainelements";
import { resetFormElements, name, email, country, mobile, pin, mm, ud, logg, closer } from "./bin/formelements";
import { iii6, design, develop, launch, info, account, token, network } from "./bin/navelements";
import { show } from "./bin/dynelements";
import { login, signup, edit } from "./bin/forms";
import { iii6_stage, design_stage, develop_stage, launch_stage, info_stage } from "./bin/dyncontent";

const client = require("ipfs-http-client");
const ipfs = client.create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

let accounts;
let user;
let net;
let balance;

const provider = new ethers.providers.Web3Provider(web3.currentProvider);
let signer;

const navigate = async (e) => {
  console.log(":: target :", e.target.id, "::");
  if (e.target.id == "iii6") {
    show.innerHTML = iii6_stage;
  } else if (e.target.id == "design") {
    show.innerHTML = design_stage;
  } else if (e.target.id == "develop") {
    show.innerHTML = develop_stage;
  } else if (e.target.id == "launch") {
    show.innerHTML = launch_stage;
  } else if (e.target.id == "info") {
    show.innerHTML = info_stage;
  } else if (e.target.id == "account") {
    checkIn();
  } else if (e.target.id == "token") {
  } else if (e.target.id == "network") {
  } else {
  }
};

const closeModal = () => {
  modal.style.display = "none";
};

const loaded = () => {
  console.log(":: loaded iii6v2 framework ::");
  iii6.addEventListener("click", navigate);
  design.addEventListener("click", navigate);
  develop.addEventListener("click", navigate);
  launch.addEventListener("click", navigate);
  info.addEventListener("click", navigate);
  account.addEventListener("click", navigate);
  token.addEventListener("click", navigate);
  network.addEventListener("click", navigate);
  closer.addEventListener("click", closeModal);
  console.log(":: iii6v2 navigation initialised ::");
  web3init();
};
const checkIn = async () => {
  signer = await provider.getSigner();
  accounts = await provider.send("eth_requestAccounts", []);
  user = accounts[0];
  net = await provider.getNetwork();
  console.log("::", accounts, net.chainId, "::");
  let uData = await checkUser();
  console.log(":: Check User :", uData, "::");
  if (uData == 0) {
    console.log(":: new user ::");
    modalbox.innerHTML = signup;
    console.log(":: sign up new user ::");
    resetFormElements();
    mm.addEventListener("click", mmSignUp);
    ud.addEventListener("click", udSignUp);
    logg.addEventListener("click", doSignUp);
  } else if (uData == 1) {
    console.log(":: known user ::");
    modalbox.innerHTML = login;
    console.log(":: login user ::");
    resetFormElements();
    mm.addEventListener("click", mmSignUp);
    ud.addEventListener("click", udSignUp);
    logg.addEventListener("click", doSignUp);
  } else if (uData == 99) {
    console.log(":: admin user ::");
    modalbox.innerHTML = login;
    console.log(":: login user ::");
    resetFormElements();
    mm.addEventListener("click", mmSignUp);
    ud.addEventListener("click", udSignUp);
    logg.addEventListener("click", doSignUp);
  }
  modal.style.display = "grid";
};
const doSignUp = async (e) => {
  console.log(":: checking web2 user data ::");
};
const mmSignUp = async (e) => {
  console.log(":: checking metamask user data ::");
};
const udSignUp = async (e) => {
  console.log(":: checking unstoppable user data ::");
};
const checkUser = async () => {
  const S0X = await s0xData();
  // Is User
  const isUser = await S0X.isUser(user)
    .then((res) => {
      console.log("// makeUser response : ", res);
      // action

      return res;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
  if (isUser === true) {
    const role = await S0X.roles(user)
      .then((res) => {
        console.log("// makeUser response : ", Number(res._hex));
        // action

        return Number(res._hex);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
    return isUser, role;
  } else return isUser, 0;
};
const netCheck = () => {
  let a;
  if (Number(net.chainId) === 80001) a = 0;
  if (Number(net.chainId) === 137) a = 1;
  return a;
};
const s0xData = async () => {
  let a = netCheck();
  const deploymentKey = await Object.keys(s0x.networks)[a];
  console.log(net, deploymentKey, s0x.networks);
  return new ethers.Contract(s0x.networks[deploymentKey].address, s0x.abi, signer);
};
const connected = () => {};
const loggedIn = () => {};
document.addEventListener("DOMContentLoaded", loaded);

const web3init = async () => {
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };
  const clickInstall = (e) => {
    e.preventDefault();
    alert("You are being redirected to the official download of Metamask.io ... Please Follow their installation instructions.");
    window.open("https://metamask.io");
  };
  const MetaMaskClientCheck = () => {
    console.log(isMetaMaskInstalled());
    //Now we check to see if MetaMask is installed
    if (!isMetaMaskInstalled()) {
      //If it isn't installed we ask the user to click to install it
      account.innerText = "install metamask!";
      account.addEventListener("click", clickInstall);
    } else {
      //If it is installed we change our button text
      account.innerText = "CONNECT";
    }
    console.log(":: iii6v2 web3 initialised ::");
  };
  MetaMaskClientCheck();
};
