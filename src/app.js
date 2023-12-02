import "../public/app.scss";
import Web3 from "web3";
import { ethers } from "ethers";
import { sha256 } from "crypto-hash";
import UAuth from "@uauth/js";
import { s0x, Friends, Groups } from "./bin/contracts";
import { bg, dev_inf, stage, nav, head, move, modal, modalbox, foot } from "./bin/mainelements";
import { name, email, country, mobile, pin, submit, closer } from "./bin/formelements";
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
let networks;
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
    await checkIn();
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
  account.addEventListener("click", checkIn);
  token.addEventListener("click", navigate);
  network.addEventListener("click", navigate);
  closer.addEventListener("click", navigate);
  console.log(":: iii6v2 navigation initialised ::");
  web3init();
};
const checkIn = async () => {
  signer = provider.getSigner(0);
  console.log("::", signer, "::");
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
