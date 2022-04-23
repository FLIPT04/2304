import "./App.css";
import { useState, useEffect } from "react";
import ethereum from "ethers";
import User_Profile from "./components/User_Profile";
import image_PT_T_One from "./assets/images/image_PT-T-1.png";
import image_PT_T_Two from "./assets/images/image_PT-T-2.png";
import image_PT_T_Three from "./assets/images/image_PT-T-3.png";
import image_PT_T_Four from "./assets/images/image_PT-T-4.png";
import image_PT_T_Five from "./assets/images/image_PT-T-5.png";
import image_PT_T_Six from "./assets/images/image_PT-T-6.png";

import UserDataEXT from "./UserData";
function App() {
  /* Ethereum Data */

  const [currentNetwork, setcurrentNetwork] = useState("Please Connect");
  const [currentgasPrice, setcurrentgasPrice] = useState("Please Connect");
  const [currentBlock, setcurrentBlock] = useState("Please Connect");
  /* User Data */

  const [MMStatus, setMMStatus] = useState("Please install MetaMask");
  const [publicAdress, setpublicAdress] = useState("Please Connect");
  const [currentBalance, setcurrentBalance] = useState("Please Connect");

  /* Token Data */

  useEffect(() => {
    getEthereumData();
    getTokenData();
    document.title = "Prototyp: 1.0";
  }, []);

  /*   Getter Ethereum Data   */
  function getEthereumData() {
    /* Connect Account */
    function connectToMM() {
      const promise = window.ethereum.request({
        method: "eth_requestAccounts",
      });
      promise.then(function (result) {});
    }
    /*   GET currentChain  */
    function setcurrentchain() {
      const promise = window.ethereum.request({ method: "eth_chainId" });
      promise.then(function (result) {
        setcurrentNetwork(result);
      });
    }
    /*   GET Ropsten?  */

    /*   GET gasPrice  */
    function showGasPrice() {
      const promise = window.ethereum.request({ method: "eth_gasPrice" });
      promise.then(function (result) {
        setcurrentgasPrice(parseInt(result, 16));
      });
    }
    setcurrentchain();
    showGasPrice();
  }
  /*   Getter User Data      */
  function getUserData() {
    /*   Is MetaMask installed ?  */
    function testMMinstall() {
      if (typeof window.ethereum !== "undefined") {
        setMMStatus("MetaMask ist installiert");
      }
    }
    function getUserMMacsess() {
      window.ethereum.request({ method: "eth_requestAccounts" });
    }

    /*   Get public Adress   */
    function setPubAdress() {
      const promise = window.ethereum.request({ method: "eth_accounts" });
      promise.then(function (result) {
        setpublicAdress(result);
        showBalance(result);
      });
    }

    /*   Get Balance   */
    function showBalance(publicAdress) {
      const promise = window.ethereum.request({
        method: "eth_getBalance",
        params: [publicAdress.toString(), "latest"],
      });
      promise.then(function (result) {
        const IntBalance = parseInt(result, 16);
        const ETHBalance = IntBalance * 1e-18;

        setcurrentBalance(ETHBalance);
      });
    }
    getUserMMacsess();
    testMMinstall();
    setPubAdress();
  }

  /*   Getter Token Data      */

  function setTokenImages(title) {
    switch (title) {
      case "Prototyp-Token-1":
        return (
          <div id="">
            <img src={image_PT_T_One} id="Token_Show_Room_Img" />
          </div>
        );
      case "Prototyp-Token-2":
        return (
          <div id="">
            <img src={image_PT_T_Two} id="Token_Show_Room_Img" />
          </div>
        );
      case "Prototyp-Token-3":
        return (
          <div id="">
            <img src={image_PT_T_Three} id="Token_Show_Room_Img" />
          </div>
        );
      case "Prototyp-Token-4":
        return (
          <div id="">
            <img src={image_PT_T_Four} id="Token_Show_Room_Img" />
          </div>
        );
      case "Prototyp-Token-5":
        return (
          <div id="">
            <img src={image_PT_T_Five} id="Token_Show_Room_Img" />
          </div>
        );
      case "Prototyp-Token-6":
        return (
          <div id="">
            <img src={image_PT_T_Six} id="Token_Show_Room_Img" />
          </div>
        );
    }
  }
  function setallUserBalance(publicAdress) {
    const promise = window.ethereum.request({
      method: "eth_getBalance",
      params: [publicAdress.toString(), "latest"],
    });
    promise.then(function (result) {
      const IntBalance = parseInt(result, 16);
      const ETHBalance = IntBalance * 1e-18;
      return { ETHBalance };
    });
  }

  function getTokenData() {}
  function isropsten() {
    if (currentNetwork === "0x3") {
      return <div>(Ropsten)</div>;
    }
  }
  return (
    <div className="App">
      <div id="Flint_Header_Wrapper">
        <h1 id="Flint_Header_H1">Prototyp für NFT Collection</h1>
      </div>

      <div id="Info_Wrapper">
        <div id="Info_Wrapper_Left">
          <h2 id="Info_Wrapper_Left_h2">Welcome! </h2>
          <div
            id="Info_Wrapper_Left_Connect_Button"
            onClick={() => getUserData()}
          >
            Connect
          </div>
        </div>
        <div id="Info_Wrapper_Right">
          <div id="Info_Wrapper_Row">
            <h3 id="InfoWrapper_h3">Netzwerk:</h3>
            <h5 id="InfoWrapper_h5">
              {currentNetwork}
              {isropsten()}
            </h5>
          </div>
          <div id="Info_Wrapper_Row">
            <h3 id="InfoWrapper_h3">Gas Price:</h3>
            <h5 id="InfoWrapper_h5">{currentgasPrice}</h5>
          </div>
          <div id="Info_Wrapper_Row">
            <h3 id="InfoWrapper_h3">Block:</h3>
            <h5 id="InfoWrapper_h5">{currentBlock}</h5>
          </div>
        </div>
      </div>

      <div id="Main_Wrapper">
        <div id="Main_Wrapper_Game_Infos">
          <h2 id="Info_Wrapper_Left_h2">Game Info</h2>
          <h3 id="InfoWrapper_h3">Aktuell verfügbare Token</h3>
          <div id="Token_Show_Room">
            <div id="Token_Show_Room_Row">
              {/* Token Item 1 */}

              <div id="Token_Show_Room_Item">
                {setTokenImages("Prototyp-Token-1")}
                <h5 id="Token_Show_Room_Item_Title">Prototyp-Token-1</h5>
                <h5 id="Token_Show_Room_Item_Kürzel">PT-T-1 </h5>
                <h5 id="Token_Show_Room_Item_Menge">Menge: 10.000</h5>
              </div>
              {/* Token Item 2 */}

              <div id="Token_Show_Room_Item">
                {" "}
                {setTokenImages("Prototyp-Token-2")}
                <h5 id="Token_Show_Room_Item_Title">Prototyp-Token-2</h5>
                <h5 id="Token_Show_Room_Item_Kürzel">PT-T-2 </h5>
                <h5 id="Token_Show_Room_Item_Menge">Menge: 1000</h5>
              </div>

              {/* Token Item 3 */}

              <div id="Token_Show_Room_Item">
                {" "}
                {setTokenImages("Prototyp-Token-3")}
                <h5 id="Token_Show_Room_Item_Title">Prototyp-Token-3</h5>
                <h5 id="Token_Show_Room_Item_Kürzel">PT-T-3 </h5>
                <h5 id="Token_Show_Room_Item_Menge">Menge: 100</h5>
              </div>
            </div>

            <div id="Token_Show_Room_Row">
              {/* Token Item 1 */}

              <div id="Token_Show_Room_Item">
                {setTokenImages("Prototyp-Token-1")}
                <h5 id="Token_Show_Room_Item_Title">Prototyp-Token-4</h5>
                <h5 id="Token_Show_Room_Item_Kürzel">PT-T-4 </h5>
                <h5 id="Token_Show_Room_Item_Menge">Menge: 50</h5>
              </div>
              {/* Token Item 2 */}

              <div id="Token_Show_Room_Item">
                {" "}
                {setTokenImages("Prototyp-Token-2")}
                <h5 id="Token_Show_Room_Item_Title">Prototyp-Token-5</h5>
                <h5 id="Token_Show_Room_Item_Kürzel">PT-T-5 </h5>
                <h5 id="Token_Show_Room_Item_Menge">Menge: 25</h5>
              </div>

              {/* Token Item 3 */}

              <div id="Token_Show_Room_Item">
                {" "}
                {setTokenImages("Prototyp-Token-6")}
                <h5 id="Token_Show_Room_Item_Title">Prototyp-Token-6</h5>
                <h5 id="Token_Show_Room_Item_Kürzel">PT-T-6 </h5>
                <h5 id="Token_Show_Room_Item_Menge">Menge: 10</h5>
              </div>
            </div>
          </div>
        </div>
        <div id="Main_Wrapper_User_Infos">
          <h2 id="Info_Wrapper_Left_h2">User Info</h2>
          <div id="User_Hard_Facts">
            <div id="User_Hard_Facts_Row">
              <h4 id="User_Hard_Facts_Row_h4">Public Adress:</h4>

              <h4 id="User_Hard_Facts_Row_h4">{publicAdress}</h4>
            </div>

            <div id="User_Hard_Facts_Row">
              <h4 id="User_Hard_Facts_Row_h4">Balance (in ETH):</h4>

              <h4 id="User_Hard_Facts_Row_h4">{currentBalance}</h4>
            </div>
          </div>
        </div>
      </div>

      <div id="User_Wrapper">
        <div id="User_Wrapper_Map">
          {UserDataEXT.map((UserDataEXT) => (
            <User_Profile
              Title={UserDataEXT[0]}
              publicAdress={UserDataEXT[1]}
              Balance={setallUserBalance(UserDataEXT[1])}
              img={UserDataEXT[2]}
              Holding1={UserDataEXT[3]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
