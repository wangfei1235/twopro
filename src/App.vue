<template>
  <div id="app">
    <p id="h3">{{msg | formart}}</p>
    <div class="container">
      <p v-fontweight="800">
        id:
        <input type="text" v-model="id">
      </p>
      <p v-fontsize="'100px'">
        车型 :
        <input type="text" v-model="car" @keyup.enter="add">
        <!-- 可以直接使用键盘码 @keyup.112='add' -->
      </p>
      <input type="button" value="提交" @click="add">
      <p>
        查找：
        <input type="text" v-model="importents" v-focus v-color="'blue'">
      </p>
    </div>
    <table border="1" style="border-collapse: collapse;margin:0 auto">
      <thead>
      <tr>
        <td v-fontweight="800">id</td>
        <td>车型</td>
        <td>时间</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in find(importents)">
        <td>{{item.id}}</td>
        <td>{{item.car}}</td>
        <td>{{item.time | getTime}}</td>
        <td><a href="#" @click.prevent="remove(item.id)">删除</a></td>
      </tr>
      </tbody>

    </table>


  </div>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        id: "",
        car: "",
        importents: "",
        list: [
          {id: 1, car: "宝马", time: new Date()},
          {id: 2, car: "奔驰", time: new Date()}
        ],
        msg: "哈哈我哈哈"
      }
    },
    components: {},
    methods: {
      add() {
        var obj = {};
        obj.id = this.id;
        obj.car = this.car;
        obj.time = new Date();
        this.list.push(obj);
      },
      remove(id) {
        //两种方法都可以实现
        // this.list.some((item,index) => {
        //   if(item.id == id){
        //     this.list.splice(index,1);
        //    返回true就会终止循坏
        //     return true;
        //   }
        // })
        var index = this.list.findIndex(item => {
          if (item.id == id) {
            //找到正确的值就会终止循坏，并且给我返回当前的index
            return true;
          }
        })
        this.list.splice(index, 1);
      },
      find(ipm) {
        // var newList = [];
        // this.list.forEach(item =>{
        //   if(item.car.indexOf(ipm) != -1){
        //     newList.push(item);
        //   }
        // })
        // return newList;
        return this.list.filter(item => {
          //includes ES6新增的字符串方法  检查是不是包含一个字符串
          if (item.car.includes(ipm)) {
            return item;
          }
        })
      }
    },
    filters: {
      //管道过滤
      formart: function (data) {
        return data.replace(/哈哈/g, "呵呵呵");
      },
      getTime:function (data) {
        var dt = new Date(data);
        var y = dt.getFullYear();
        var mh = (dt.getMonth() + 1).toString().padStart(2,"0");
        var d = dt.getDate().toString().padStart(2,"0");
        var h = dt.getHours().toString().padStart(2,"0");
        var m = dt.getMinutes().toString().padStart(2,"0");
        var s = dt.getSeconds().toString().padStart(2,"0");
        return `${y}-${mh}-${d}  ${h}:${m}:${s}`;//ES6语法
      }
    },
    directives:{//自定义的私有指令
      'fontweight':{//给字体加粗的
        bind:function (el,binding) {
          el.style.fontWeight = binding.value;
        }
      },
      'fontsize':function (el,binding) {//简写模式 相当于在bind和updated里都写了一次
        el.style.fontSize = parseInt(binding.value) + "px";
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
