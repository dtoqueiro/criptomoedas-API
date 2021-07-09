import { config } from "./config.js";

/**
 * API Key in the config.js FILE 
 * 
 * config.js sample:
 * 
 *  export const config = {
    SECRET_API_KEY: "99999999-9999-9999-9999-3999999999",
    };
 */

let apiKey = config.SECRET_API_KEY;

let myHeaders = new Headers();
myHeaders.append("X-CMC_PRO_API_KEY", apiKey);

let myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

let myRequest = new Request(
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
  myInit
);

fetch(myRequest)
  .then((response) => {
    if (!response.ok)
      throw new Error(
        "Erro ao executar a requisição, status " + response.status
      );
    return response.json();
  })
  .then((api) => {
    var texto = "";
    // Get 10 coins, symbols and first_historical_data
    for (let i = 0; i < 10; i++) {
      //Show API information
      let date = new Date(api.data[i].first_historical_data);

      texto =
        texto +
        ` 
               <div class="media col-6">
                   <img src="coin.jpg" class="align-self-center me-3" alt="coin" width="100" height="60">
                   <div class="media-body">
                   <h5>${api.data[i].name}</h5>
                   <p class="mb-0">${api.data[i].symbol}</p>
                   <p class="mb-5">${date.toLocaleDateString()}</p>
                   </div>
               </div>
          
               `;

      document.getElementById("coins").innerHTML = texto;
    }
  })
  .catch((error) => {
    console.error(error.message);
  });
