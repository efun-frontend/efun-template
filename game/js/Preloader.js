H5.Preloader=function () {
    
}
H5.Preloader.prototype={
    preload:function () {
        this.load.image("","");
    },
    create:function () {
        this.state.start('Game');
    }
}