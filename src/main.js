// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//自定义键盘修饰
Vue.config.keyCodes.f2 = 113

//全局过滤器
// Vue.filter('过滤器的名字',回调函数)

//自定义全局指令
//  第一参数是你自定义指令的名称 不要加v- 但是调用的时候需要加
//  第二个参数是一个对象  里面的钩子函数会在相对应得阶段执行
//  这是一个是输入框自动获取焦点的自定义指令
Vue.directive('focus',{
  bind:function (el) {
    //当指令绑定到元素上面，会立即执行这个bind函数 只会执行一次
    //第一个参数永远是el 表示被绑定的元素 是一个原生的js对象
    //样式可以在bind里定义
  },
  inserted:function (el) {
    //表示元素插入dom中的时候 会执行inserted函数 只会执行一次
    //和js行为有关的最好在inserted定义
    el.focus();
  },
  updated:function () {
    //当Vnode更新的时候会执行updated这个函数 可能会执行多次

  }
})

//这是自定义一个让字体变色的指令
//binding是一个对象
Vue.directive("color",{
  bind:function (el,binding) {
    //样式只要绑定了就会被渲染
    el.style.color = binding.value;
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data:{
    msg:"ok"
  },
  methods:{
    show:function () {
      console.log("123");
    }
  },
  components: { App },
  template: '<App/>',
  beforeCreate:function () {
    //第一个生命周期函数，表示实例在完全被创建之前，会执行它
    //执行beforeCreate得时候，data和methods中的数据还没有被初始化出来
    // console.log(this.msg);//undefind
  },
  created:function () {
    //这是第二个生命周期函数
    //执行created得时候，data和methods中的数据已经被初始化好了
    //console.log(this.msg);//ok
    //this.show();//123
  },
  boforeMount:function () {
    //这是第三个生命周期函数 表示在模板已经在内存中编译完成，但在并未渲染到页面中去
    //此时要是去读取模板中的内容并不会读取到真正的数据，而是我们写的模板字符串
    // console.log(document.getElementById("h3").innerText);
  },
  mounted:function(){
    //这是第四个生命周期函数 表示内存中的模板已经被渲染到也免去了
    // console.log(document.getElementById("h3").innerText);//拿到innerText
    //注意 mounted 是实例创建期间最后一个生命周期函数，当执行完mounted之后就表示，实例已经完全被创建好了，此时，如果没有其他操作的话，这个实例就静静的躺在内存中一动不动
    //如果要操作dom最早也只能在mounted里面操作
  },
  beforeUpdate:function () {
    //beoforeUpdate和updated 这两个钩子函数只会当data中的数据被改变是触发
    //执行这个钩子函数时数据已经更新了  但是！！！ 页面并没有更新 显示的数据还是老数据
    // console.log(document.getElementById("h3").innerText);
  },
  updated:function () {
    //执行这个钩子函数时页面上的数据已经和data中的数据保持同步了，都是最新的数据
  },
  beforeDestroy:function () {
    //当执行beforeDestroy这个钩子函数时, Vue已经从运行阶段进入到销毁阶段了
    //此时data methods 过滤器....都是可用状态
  },
  destroyed:function () {
    //执行destroyed这个钩子函数时表示Vue实例已经被销毁
  }

})
