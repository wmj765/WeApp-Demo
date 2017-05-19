var calculate = require('../calculate.js');
var util = require('../../../../util/util.js');
Page({
    data:{
        selected:true,
        selected1:false,
        array: ['山西省'],
        array1: ['年度双边协商','年度集中竞价','月度双边协商','月度集中竞价'],
        contUnitArray:['千瓦时','兆瓦时'],
        priceUnitArray:['元/千瓦时','元/兆瓦时'],
        index: 0,
        index1: 0,
        contIndex: 0,//公司电量Index
        powerIndex:0,//用户电量index
        comPriceIndex: 0,//公司申报电价index
        agcyPriceIndex: 0,//公司代理电价index
        priceIndex: 0,//用户电价index
        phonenum:'010-82781699',
        applyPower:'',
        comApplyPower:'',
        applyPrice:'',
        comApplyPrice:'',
        agcyPrice:'',
        totalBenefit:''
        },
    selected:function(e){
        this.setData({
            selected1:false,
            selected:true
        })
    },
    selected1:function(e){
        this.setData({
            selected:false,
            selected1:true
        })
    },
    bindPickerChange: function(e) {
    this.setData({
        index: e.detail.value,
        applyPower:'',
        applyPrice:'',
        totalBenefit:''
      })
    },
    bindStylePickerChange: function(e) {
    this.setData({
        index1: e.detail.value,
        applyPower:'',
        applyPrice:'',
        totalBenefit:''
      })
    },
    bindComPickerChange: function(e) {
    this.setData({
        index: e.detail.value,
        comApplyPower:'',
        comApplyPrice:'',
        agcyPrice:'',
        consTotalBenefit:'',
        compTotalBenefit:''
      })
    },
    contUnitSwith: function(e) {
        var comId = e.target.id;
        if(comId === 'comApplyPowerUnitSwitch'){
            var indexFlag = this.data.contIndex==0?1:0;
            var contApplyPower = this.data.comApplyPower;
            var result = '';
            if(contApplyPower!=''){
                result = calculate.contUnitSwitch(
                indexFlag,
                contApplyPower
            );
            }
            this.setData({
                contIndex: indexFlag,
                comApplyPower:result==''?'':util.formatNum(result,9,16)
            })
        }else if(comId === 'applyPowerUnitSwitch'){
            var indexFlag = this.data.powerIndex==0?1:0;
            var perApplyPower = this.data.applyPower;
            var result = '';
            if(perApplyPower!=''){
                result = calculate.contUnitSwitch(
                indexFlag,
                perApplyPower
            );
            }
            this.setData({
                powerIndex: indexFlag,
                applyPower:result==''?'':util.formatNum(result,9,16)
            })
        }

    },
    comApplyUnitSwith: function(e) {
        var comId = e.target.id;
        if(comId === 'comApplyPriceUnitSwitch'){
            var indexFlag = this.data.comPriceIndex==0?1:0;
            var applyPrice = this.data.comApplyPrice;
            var result = '';
            if(applyPrice!=''){
                result = calculate.priceUnitSwitch(
                    indexFlag,
                    applyPrice
            );
            }
            this.setData({
                comPriceIndex: indexFlag,
                comApplyPrice:result==''?'':util.formatNum(result,9,16)
            })
        }
        else if(comId === 'agcyPriceUnitSwitch'){
            var indexFlag = this.data.agcyPriceIndex==0?1:0;
            var comAgcyPrice = this.data.agcyPrice;
            var result = '';
            if(comAgcyPrice!=''){
                result = calculate.priceUnitSwitch(
                    indexFlag,
                    comAgcyPrice
            );
            }
            this.setData({
                agcyPriceIndex: indexFlag,
                agcyPrice:result==''?'':util.formatNum(result,9,16)
            })
        }
        else if(comId === 'applyPriceUnitSwitch'){
            var indexFlag = this.data.priceIndex==0?1:0;
            var perApplyPrice = this.data.applyPrice;
            var result = '';
            if(perApplyPrice!=''){
                result = calculate.priceUnitSwitch(
                    indexFlag,
                    perApplyPrice
            );
            }
            this.setData({
                priceIndex: indexFlag,
                applyPrice:result==''?'':util.formatNum(result,9,16)
            })
        }

    },
    bindComStylePickerChange: function(e) {
    this.setData({
        index1: e.detail.value,
        comApplyPower:'',
        comApplyPrice:'',
        agcyPrice:'',
        consTotalBenefit:'',
        compTotalBenefit:''
      })
    },
    formSubmit: function(e) {
        var  result = calculate.doConsCalc(
            this.data.applyPower==''?0:this.data.applyPower,
            this.data.applyPrice==''?0:this.data.applyPrice,
            this.data.powerIndex==''?0:this.data.powerIndex,
            this.data.priceIndex==''?0:this.data.priceIndex
          );
          this.setData({
            totalBenefit:util.formatNum(result[0],9,16)
          })
    },
    comFormSubmit: function(e) {
        var  result = calculate.doComsCalc(
            this.data.comApplyPower==''?0:this.data.comApplyPower,
            this.data.comApplyPrice==''?0:this.data.comApplyPrice,
            this.data.agcyPrice==''?0:this.data.agcyPrice,
            this.data.contIndex==''?0:this.data.contIndex,
            this.data.comPriceIndex==''?0:this.data.comPriceIndex,
            this.data.agcyPriceIndex==''?0:this.data.agcyPriceIndex
          );
          this.setData({
            consTotalBenefit:util.formatNum(result[0],9,16),//用户收益
            compTotalBenefit:util.formatNum(result[1],9,16)//公司收益
          })
    },
    formReset: function() {
        this.setData({
            applyPower:'',
            applyPrice:'',
            totalBenefit:''
        })
    },
    comFormReset: function() {
        this.setData({
            comApplyPower:'',
            comApplyPrice:'',
            agcyPrice:'',
            consTotalBenefit:'',
            compTotalBenefit:''
        })
    },
    bindKeyInput: function(e) {
        var obj={};
        var num = e.detail.value;
        num = util.clearNoNum(num);
        if(e.target.id=='spreads'||e.target.id=="clearingFeeSpreads"){
            num = num==""?num:"-"+num;
        }
        obj[e.target.id]=num;
        this.setData(obj);
    },
    bindKeyblur:function(e){
        if(e.target.id=='monthPower'||e.target.id=="monthDealPower"){
        var cp = util.numAdd(this.data.monthPower,this.data.monthDealPower);
        }
        this.setData({
            contPower:cp==0?'':cp
        });
    },
    call:function(e){
        wx.makePhoneCall({
             phoneNumber: this.data.phonenum
        })
    }
})


