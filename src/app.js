import "../public/app.scss";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { sha256 } from "crypto-hash";
import UAuth from "@uauth/js";
import { s0x, Friends, Groups } from "./bin/contracts";
import { bg, dev_inf, stage, nav, head, move, modal, modalbox, foot } from "./bin/mainelements";
import { name, email, country, mobile, pin, submit, closer } from "./bin/formelements";
import { iii6, design, develop, launch, info, account, token, network } from "./bin/navelements";
import { show } from "./bin/dynelements";
import { login, signup, edit } from "./bin/forms";
import { iii6_stage, design_stage, develop_stage, launch_stage, info_stage } from "./bin/dyncontent";
import { checkSnapshotValid } from "copy-webpack-plugin";

const client = require("ipfs-http-client");
const ipfs = client.create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

let accounts;
let networks;
let balance;

const navigate = (e) => {
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
};
const checkIn = () => {
  let check = checkState();
  if (check == true) {
    modalbox.innerHTML = signup;
    modal.style.display = "grid";
    console.log(":: new account ::");
  } else {
    modalbox.innerHTML = login;
    modal.style.display = "grid";
    console.log(":: known user ::");
  }
};
const checkState = () => {
  return true;
};
const connected = () => {};
const loggedIn = () => {};
document.addEventListener("DOMContentLoaded", loaded);
