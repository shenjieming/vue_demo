<template>
  <div>
    <!--<span @click="handleClose">aaa</span>-->
    <el-dialog  title="收货地址" :visible="dialogTable" :before-close="handleClose()">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['userInfo', 'dialogTable'],
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
//              aa:true;
      }
    },
    methods: {
      handleClose: function () {
        this.dialogTable=false;
        this.$emit('update:dialogTable', false);
      }
    },
    mounted() {
      console.log(this);
    },
    watch: {
      dialogTable(curVal,oldVal){
        console.log(curVal,oldVal)
      }
    }
  }
</script>
