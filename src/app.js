import "../public/app.scss";
import Web3 from "web3";
import { ethers } from "ethers";
import { BrainWallet } from "@ethersproject/experimental";
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

let provider;
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
const web2 = async () => {
  console.log(":: new web2 user ::");
  modalbox.innerHTML = signup;
  console.log(":: sign up new user ::");
  resetFormElements();
  mm.addEventListener("click", clickMM);
  ud.addEventListener("click", clickUD);
  logg.addEventListener("click", doSignUp);
  modal.style.display = "grid";
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
  token.addEventListener("click", navigate);
  network.addEventListener("click", navigate);
  closer.addEventListener("click", closeModal);
  console.log(":: iii6v2 navigation initialised ::");

  if (isMetaMaskInstalled()) account.addEventListener("click", navigate);
  else account.addEventListener("click", web2);

  web3init();
};
const checkIn = async () => {
  provider = new ethers.providers.Web3Provider(web3.currentProvider);
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
  } else {
    web2();
  }
  modal.style.display = "grid";
};
const doSignUp = async (e) => {
  console.log(":: checking web2 user data ::");
  const wallet = await BrainWallet.generate(email.value, pin.value);
  logg.innerText = "LOADING";
  console.log(wallet);
};
const mmSignUp = async (e) => {
  const S0X = await s0xData();
  console.log(":: checking metamask user data ::");
  let profile = await S0X.showUser(user);
  const sign = await signer.signMessage(user);
  console.log(profile);
  closeModal();
  let pro = JSON.parse(profile);
  show.innerHTML = profile;
  account.innerText = pro.name;
  account.removeEventListener("click", navigate);
  account.addEventListener("click", goProfile);
};
const udSignUp = async (e) => {
  console.log(":: checking unstoppable user data ::");
};
const goProfile = () => {
  console.log(":: checking profile data ::");
};
const checkUser = async () => {
  const S0X = await s0xData();
  // Is User
  const isUser = await S0X.isUser(user)
    .then((res) => {
      console.log(":: makeUser response :", Number(res._hex), "::");
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
        console.log(":: makeUser response :", Number(res._hex), "::");
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
  if (Number(net.chainId) === 137) a = 2;
  if (Number(net.chainId) === 43113) a = 1;
  if (Number(net.chainId) === 43114) a = 2;
  if (Number(net.chainId) === 80001) a = 0;
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
const isMetaMaskInstalled = () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};
const clickMM = (e) => {
  e.preventDefault();
  alert("You are being redirected to the official download of Metamask.io ... Please Follow their installation instructions.");
  window.open("https://metamask.io");
};
const clickUD = (e) => {
  e.preventDefault();
  alert("You are being redirected to the official Unstoppable Domains Website ... You will need an UDDomain to continue this path.");
  window.open("https://unstoppabledomains.com");
};
const MetaMaskClientCheck = () => {
  console.log(isMetaMaskInstalled());
  //Now we check to see if MetaMask is installed
  if (!isMetaMaskInstalled()) {
    //If it isn't installed we ask the user to click to install it
    account.addEventListener("click", web2);
    account.innerText = "CONNECT";
  } else {
    //If it is installed we change our button text
    account.innerText = "CONNECT";
  }
  console.log(":: iii6v2 web3 initialised ::");
};
const web3init = async () => {
  MetaMaskClientCheck();
};
document.addEventListener("DOMContentLoaded", loaded);
