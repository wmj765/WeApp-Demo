Page({
  data: {
      phonenum:'010-82781699',
  },
  call:function(e){
        wx.makePhoneCall({
             phoneNumber: this.data.phonenum
        })
    }
})
