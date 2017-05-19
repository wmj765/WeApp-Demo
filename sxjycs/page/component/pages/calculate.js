var big = require('../../common/big.min.js');



// *******************************电力用户测算************************************* //
/**
 * 电力用户测算
 * @param applyPower 申报电量
 * @param applyPrice 申报电价
 * @param consTotalBenefit 用户收益
 * @param powerIndex 申报电量index
 * @param priceIndex 申报电价index
 */
function doConsCalc(applyPower, applyPrice,powerIndex,priceIndex) {
    var totalBenefit;//用户收益
    if(priceIndex === 1){// 元/兆瓦时
        applyPrice = big(applyPrice).times(0.001);
    }
    if(powerIndex === 0){// 千瓦时
        applyPower = big(applyPower).times(0.0001);
    }else{
        applyPower = big(applyPower).times(0.1);
    }
    totalBenefit = big(applyPower).times(big(0.3397).minus(applyPrice))
    return [
        toStr(totalBenefit) // 用户收益
    ];
}

/**
 *  电力公司测算
 * @param comApplyPower 申报电量
 * @param comApplyPrice 申报电价
 * @param agcyPrice 代理合同约定电价
 * @param consTotalBenefit 用户收益
 * @param compTotalBenefit 公司收益
 * @param contIndex 申报电量
 * @param comPriceIndex 申报电价
 * @param agcyPriceIndex 代理电价
 */
function doComsCalc(comApplyPower, comApplyPrice,agcyPrice,contIndex,comPriceIndex,agcyPriceIndex) {
    var consTotalBenefit;//用户收益
    var compTotalBenefit;//公司收益

    if(comPriceIndex === 1){// 元/兆瓦时
        comApplyPrice = big(comApplyPrice).times(0.001);
    }
    if(agcyPriceIndex === 1){// 元/兆瓦时
        agcyPrice = big(agcyPrice).times(0.001);
    }
    if(contIndex === 0){// 千瓦时
        comApplyPower = big(comApplyPower).times(0.0001);
    }else{
        comApplyPower = big(comApplyPower).times(0.1);
    }

    consTotalBenefit = big(comApplyPower).times(big(0.3397).minus(agcyPrice));
    compTotalBenefit = big(comApplyPower).times(big(agcyPrice).minus(comApplyPrice));

    return [
        toStr(consTotalBenefit), // 用户收益
        toStr(compTotalBenefit)  // 公司收益
    ];
}

/**
 * 申报电量转换
 * @param indexFlag 点击后的index
 * @param contApplyPower 申报电量
 */
function contUnitSwitch(indexFlag,contApplyPower){
    if(indexFlag == 0){
        contApplyPower = big(contApplyPower).times(1000);
    }else{
        contApplyPower = big(contApplyPower).times(0.001);
    }
    return toPowerStr(contApplyPower)
}

/**
 * 申报电量转换
 * @param indexFlag 点击后的index
 * @param contApplyPower 申报电量
 */
function priceUnitSwitch(indexFlag,applyPrice){
    if(indexFlag == 0){
        applyPrice = big(applyPrice).times(0.001);
    }else{
        applyPrice = big(applyPrice).times(1000);
    }
    return toPriceStr(applyPrice)
}

/**
 * 判断是否需要补位
 * @param numStr
 * @return {boolean}
 */
function needFixed(numStr) {
    if (numStr == null || numStr.length == 0) {
        return false;
    }
    var idx = numStr.indexOf(".");
    if (idx < 0) {
        return false;
    }
    var subNum = numStr.substring(idx + 1);
    return subNum.length > 2;
}

function toStr(num) {
    return needFixed(num.toString()) ? num.toFixed(2) : num.toString();
}

function toPriceStr(num) {
    return needFixed(num.toString()) ? num.toFixed(5) : num.toString();
}

function toPowerStr(num) {
    return needFixed(num.toString()) ? num.toFixed(3) : num.toString();
}

module.exports = {
  doConsCalc: doConsCalc,
  doComsCalc: doComsCalc,
  contUnitSwitch: contUnitSwitch,
  priceUnitSwitch: priceUnitSwitch
}


