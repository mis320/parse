
const formWei = (number, unit = 18) => {
    return ethers.formatUnits(String(number), parseInt(unit))
}
const toWei = (number, unit = 18) => {
    return ethers.parseUnits(String(number), parseInt(unit))
}

const decodeParameters = (types, arg) => {
    const abic = new ethers.AbiCoder()
    const decode = abic.decode(types, arg)
    return decode
}
const decodeInteface = (abi) => {
    const inf = new ethers.Interface(abi)
    console.log(inf.format());
    inf.forEachFunction((f, n) => {
        console.log(f.selector, n);
    },)
    return
}



function getWbe3Methods(web30, abi, address) {
    if (abi == undefined) {
        return new web30.eth.Contract(abi.abi, abi.address).methods;
    } else {
        try {
            return new web30.eth.Contract(abi, address).methods;
        } catch (error) {
            console.log(String(error));
        }
    }
}


function $set(p1, p2) {
    let t = document.getElementById(p1);

    if (
        t.nodeName.toUpperCase() == 'SPAN' ||
        t.nodeName.toUpperCase() == 'P' ||
        t.nodeName.toUpperCase() == 'DIV'
    ) {
        t.innerHTML = p2
    } else if (t.nodeName.toUpperCase() == 'IMG') {
        t.src = p2
    } else {
        t.value = p2
    }
}

function $get(p1) {
    let t = document.getElementById(p1);
    if (t.nodeName.toUpperCase() != 'SPAN') {
        return t.value.trim()
    } else {
        return t.innerHTML.trim()
    }

}

async function getabi(token) {
    let url = 'https://api.bscscan.com/api?module=contract&action=getabi&address=' + token + '&apikey=8KG7TAZVS5AZ2NAIBN79PY3PPDMEHBUEGW'
    console.log(url);
    const res = await fetch(url, {
        "headers": {
            "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    }).then(res => res.text()).then(
        data => {
            return data
        }
    );
    return JSON.parse(res).result
}

function getTxHash() {
    const txHash = $get("txHash")
    if (txHash.length > 32) {
        setItemTxHash(txHash)
    }

    return txHash
}
function setTxHash(txt) {
    return $set("txHash", txt)
}
function setItemTxHash(txt) {
    return localStorage.setItem("parse_data_txHash", txt)
}

function getItemTxHash() {
    return localStorage.getItem("parse_data_txHash")
}

function getTxTo() {
    return $get("to")
}


function setTxTo(txt) {
    return $set("to", txt)
}
function getTxFee() {
    return toWei($get("fee"))
}
function setTxFee(txt) {
    return $set("fee", txt)
}
function getTxAbi() {
    return $get("txAbi")
}
function setTxAbi(txt) {
    return $set("txAbi", txt)
}

function setItemTxAbi(txt) {
    return localStorage.setItem("parse_data_txAbi", txt)
}

function getItemTxAbi() {
    return localStorage.getItem("parse_data_txAbi")
}
function getTxLocal() {
    return $get("local")
}
function setTxLocal(txt) {
    return $set("local", txt)
}
function getDecimals() {
    return $get("Decimals")
}

function getParseTxt() {
    return $get("div_text")
}

function setParseTxt(txt) {
    return $set("div_text", txt)
}

function setEncodeTxt(txt) {
    return $set("div_text2", txt)
}
function getEncodeTxt(txt) {
    return $get("div_text2")
}
const getUser = async () => {
    const listAccounts = await provider.listAccounts()

    console.log(listAccounts);
    return listAccounts[0].address
}


function init() {

    setTimeout(() => {
        setTxHash(getItemTxHash())
        setTxAbi(getItemTxAbi())
    }, 500);

}