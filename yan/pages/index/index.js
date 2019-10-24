//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
	urlImg:['../../image/border1.png','../../image/border2.png','../../image/border3.png'],
	urlIndex:0,
	uploadImg:''
  },
  
  leftClick(){
	  this.data.urlIndex--
	  this.data.urlIndex<0?this.data.urlIndex=2:this.data.urlIndex,
	  console.log(this.data.urlIndex)
	  this.canfn()
  },
  rightClick(){
  	  this.data.urlIndex++
  	  this.data.urlIndex>2?this.data.urlIndex=0:this.data.urlIndex,
  	  console.log(this.data.urlIndex)
	  this.canfn()
  },
  canfn(){
	  var mycanvas=wx.createCanvasContext('mycanvas')
	   mycanvas.setFillStyle('#5F6FEE')//文字颜色：默认黑色
	   mycanvas.setFontSize(20)//设置字体大小，默认10
	  
	   //调用draw()开始绘制
	  console.log(mycanvas)	
	  var imgUrl=this.data.urlImg[this.data.urlIndex]
	  if(this.data.uploadImg){
		  mycanvas.drawImage( this.data.uploadImg,0,0,150,150)
	  }
	  mycanvas.drawImage(imgUrl,0,0,150,150)
	  mycanvas.draw()
  },
  uploadImage(){
	  var _this=this
	  wx.chooseImage({
	    count: 1,
	    sizeType: 'original',
	    sourceType: ['album', 'camera'],
	    success (res) {
	      // tempFilePath可以作为img标签的src属性显示图片
	      const tempFilePaths = res.tempFilePaths
		  _this.data.uploadImg=tempFilePaths[0]
		  console.log(_this.data.uploadImg)
		   _this.canfn()
	    }
	  })
	 
  },
  bao(){
	  
	  wx.canvasToTempFilePath({
	    x: 0,
	    y: 0,
	    width: 150,
	    height: 150,
	    destWidth: 150,
	    destHeight: 150,
	    canvasId: 'mycanvas',
	    success(res) {
			wx.saveImageToPhotosAlbum({
				filePath: res.tempFilePath,
				success:function (data) {
					console.log(data);
					}
			
	    })
		}
	  })
  },
 
  onReady: function () {
	this.canfn()
  },
  
})
