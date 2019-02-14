var H5={};
H5.Boot=function () {
    
}
H5.Boot.prototype={
    preload:function () {
        this.input.maxPointers = 1,
        this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE,
        this.scale.pageAlignHorizontally = true,
        this.scale.pageAlignVertically = true,
        this.state.start("Preloader")
    },
    created:function () {
        
    }
}