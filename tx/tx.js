
const TransactionResponse = async (txhash) => {
    let TransactionResponse = await provider.getTransaction(txhash)
    console.log(TransactionResponse);
    console.log(TransactionResponse.data);
    console.log(TransactionResponse.from);
    console.log(TransactionResponse.to);
    console.log(TransactionResponse.value);
    return TransactionResponse
}

let parseTransaction
const decode = async () => {

    const txHasx = getTxHash()
    const TransactionResponse0 = await TransactionResponse(txHasx)
    const txData = TransactionResponse0.data
    console.log(txData.slice(0, 10));
    let txAbi = getTxAbi()
    setTxTo(TransactionResponse0.to)
    setTxFee(formWei(TransactionResponse0.value, "18"))
    if (txAbi == "") {
        let abi = await getabi(TransactionResponse0.to)

        if (abi.indexOf("not verified" != -1)) {
            abi = JSON.stringify(TEMPLATE_ABI)
        }
        setTxAbi(abi)
        txAbi = abi
    }
    const JsonAbi = JSON.parse(txAbi)
    console.log(JsonAbi);

    const inf = new ethers.Interface(JsonAbi)
    console.log(inf.format());


    let argsArray = []
    if (getParseTxt().slice(0, 2) == "0x") {
        let args0 = inf.decodeFunctionData(inf.getFunction(getParseTxt().slice(0, 10)), getParseTxt())

        args0.forEach(element => {
            if (element != null || element != undefined) {
                console.log(typeof element);
                if (typeof element == "object") {
                    let array = []
                    element.forEach(e0 => {
                        array.push(String(e0))
                    });
                    argsArray.push(array)
                } else {
                    argsArray.push(String(element))
                }


            }
        });
        setParseTxt(JSON.stringify(argsArray))
        console.log(argsArray);
        return
    }
    let index = 0

    inf.forEachFunction((f, n) => {
        //console.log(f.selector, n);
        if (f.selector == txData.slice(0, 10)) {
            console.log(index, f.selector, f.name, f.format());

            setTxLocal(f.format())
        } else {
            index++
        }
    },)

    let args = inf.parseTransaction(TransactionResponse0).args
    console.log(args.toString());
    args.forEach(element => {
        if (element != null || element != undefined) {
            console.log(typeof element);
            if (typeof element == "object") {
                let array = []
                element.forEach(e0 => {
                    array.push(String(e0))
                });
                argsArray.push(array)
            } else {
                argsArray.push(String(element))
            }
        }
    });

    setParseTxt(JSON.stringify(argsArray))
    console.log(argsArray);
    console.log();
    console.log(inf.encodeFunctionData(getTxLocal(), argsArray));
    setItemTxAbi(txAbi)
}

const encode = async () => {
    const user = await getUser()

    let tx4byte = "test"
    if (getTxLocal().slice(0, 2) == "0x") {
        tx4byte = "test" + getTxLocal().slice(10)
    } else {
        tx4byte = getTxLocal()
    }
    let txAbi = ["function " + tx4byte]
    console.log(txAbi);
    //const JsonAbi = JSON.parse(txAbi)
    const inf = new ethers.Interface(txAbi)
    let args = JSON.parse(getParseTxt())
    args = args.map((r) => {

        if (r == "sender") {
            return user
        } else {
            return r
        }
    })
    let hex
    if (getTxLocal().slice(0, 2) == "0x") {
        hex = inf.encodeFunctionData(tx4byte, args)
        hex = getTxLocal().slice(0, 10) + hex.slice(10)
    } else {
        hex = inf.encodeFunctionData(getTxLocal(), args)
    }
    console.log(hex);
    setEncodeTxt(hex)

    return hex
}

const emit = async () => {
    const user = await getUser()
    const hexData = await encode()
    const to = getTxTo()
    const feel = getTxFee()
    const signer = await provider.getSigner()
    console.log(user,hexData,to,feel,signer);
    const ar = provider.getRpcRequest({
        method: "getGasPrice"
    })
    

    console.log(ar);
    //const getGasPrice =await provider._perform({method: "getGasPrice"})
    const getGasPrice =parseInt((await provider.send(ar.method,ar.args)),16)
    
    const gas = await signer.estimateGas({
        from: user,
        to: to,
        data: hexData,
        value: feel
    })
    let txt = `gasPrice: ${formWei(getGasPrice,9)} |1次交易: ${formWei((parseInt(gas) * getGasPrice))} ETH |1ETH可执行: ${Math.pow(10,18) /(parseInt(gas) * getGasPrice)} 次 `
    console.log(txt);
    // console.log(formWei(getGasPrice,9),formWei((parseInt(gas) * getGasPrice)));
    // console.log(Math.pow(10,18) /(parseInt(gas) * getGasPrice));
}

const start = async () => {
    const user = await getUser()
    const hexData = await encode()
    const to = getTxTo()
    const feel = getTxFee()
    const signer = await provider.getSigner()
    console.log(user,hexData,to,feel,signer);
    const gas = await signer.estimateGas({
        from: user,
        to: to,
        data: hexData,
        value: feel
    })
    console.log(gas);
    const success = await signer.sendTransaction({
        from: user,
        to: to,
        data: hexData,
        value: feel
    })

    console.log(success);

}