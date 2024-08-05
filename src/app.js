import "../public/app.scss";
import "intl-tel-input";
import { land, signup, profile, newsafe, safe, closeAll, gosignup, gonewsafe, go, golog } from "./nav";
import Web3 from "web3";
import { ethers } from "ethers";
import { BrainWallet, Eip1193Bridge, NonceManager } from "@ethersproject/experimental";
import { sha256 } from "crypto-hash";
import UAuth from "@uauth/js";

let accounts;
let user;
let net;
let balance;
let loggd = false;
let provider;
let signer;

const back = () => {
  closeAll();

  if (loggd) profile.style.display = "grid";
  else land.style.display = "grid";
};
const gb0 = document.getElementById("goback0");
const gb1 = document.getElementById("goback1");
const gb2 = document.getElementById("goback2");
const gb3 = document.getElementById("goback3");
gosignup.addEventListener("click", go);
gonewsafe.addEventListener("click", go);
gb0.addEventListener("click", back);
gb1.addEventListener("click", back);
gb2.addEventListener("click", back);
// gb3.addEventListener("click", back);

const log = (e) => {
  console.log(e.target.id);
  closeAll();
  // check if metamask is installed
  // TRUE
  // check if user is on polygon
  // TRUE
  // check if user is known to contract
  // TRUE
  // send to profile
  // FALSE
  // send to signup
  signup.style.display = "grid";
  // FALSE
  // send to network switch
  // FALSE
  // send to "https://metamask.io"
};
golog.addEventListener("click", log);
