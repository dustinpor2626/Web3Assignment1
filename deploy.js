const { Connection, PublicKey } = solanaWeb3;
var usdToSol;

fetch("https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT")
  .then((response) => response.json())
  .then((data) => {
    var price = data.price;
    usdToSol = 1 / price;
  });

async function main() {
  var publicKey = document.getElementById("publicKey").value;
  var amt = document.getElementById("amt").value;
  var tokens = document.getElementById("token").value;
  let tokenVal = 1;

  await fetch(
    "https://api.binance.com/api/v3/ticker/price?symbol=" + tokens + "USDT"
  )
    .then((response) => response.json())
    .then((data) => {
      tokenVal = data.price * usdToSol * amt;
      console.log(
        "Token value in SOL (converting from " + tokens + "to SOL):" + tokenVal
      );
    });

  const connection = new Connection("https://api.devnet.solana.com");
  let publicKeyObj = new PublicKey(publicKey);

  let amount = await BigInt(Math.round(tokenVal * 1e9));
  let txhash = await connection.requestAirdrop(publicKeyObj, Number(amount));
  console.log(`txhash: ${txhash}`);
}
