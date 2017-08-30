<template>
  <div>
    <el-form ref="form" label-width="110px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-tree :data="materialDetail" :props="defaultProps" highlight-current default-expand-all  @node-click="handleNodeClick" style="text-align: left;border: none"></el-tree>
        </el-col>
        <el-col :span="16" style="background: red">{{showData}}</el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: ['materialDetail'],
    data() {
      return {
        materialList: new Array(),
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        showData:{}
      }
    },
    methods: {
      handleNodeClick: function (data, node, dom) {
        this.showData=data;
      },
    },
    mounted() {
    }
  }
</script>
