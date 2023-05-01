const { ethers } = require("ethers");
const formWei = (number, unit = 18) => {
    return ethers.formatUnits(String(number), parseInt(unit))
}

const toWei = (number, unit = 18) => {
    return ethers.parseUnits(String(number), parseInt(unit))
}
console.log(String(toWei('11111111111',4)));
// const provider = new ethers.BrowserProvider("");

// const ar = provider.getRpcRequest({
//     method: "getGasPrice"
// })
// ar.args
// ar.method
// provider.send("getGasPrice",[])
// const signer = await provider.getSigner()

// const gas = await signer.sendTransaction({
//     from: "",
//     to: "",
//     data: "",
//     value: "",
// })

console.log({
    address:"0xfa14Da3198f452DEc8C72714D3B90593Ec9e9abe"
}
   
);