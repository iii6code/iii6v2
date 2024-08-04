import "../public/app.scss";
import Web3 from "web3";
import { ethers } from "ethers";
import { BrainWallet, Eip1193Bridge, NonceManager } from "@ethersproject/experimental";
import { sha256 } from "crypto-hash";
import UAuth from "@uauth/js";

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


$("#mobile_code").intlTelInput({
	initialCountry: "de",
	separateDialCode: true,
	// utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.4/js/utils.js"
});
