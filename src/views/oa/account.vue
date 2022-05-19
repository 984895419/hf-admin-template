<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
    class="app-container"
  >
    <el-row>
      <el-col :span="3">
        <div class="content-lf">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            clearable
          >
          </el-input>
          <el-tree
            class="filter-tree"
            :data="companydepartsdata"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            ref="tree"
          >
          </el-tree>
        </div>
      </el-col>
      <el-col :span="21">
        <div class="content-rt">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="10">
              <el-col :span="5">
                <el-form-item label="员工工号">
                  <el-input
                    size="mini"
                    placeholder="员工工号"
                    v-model="form.name"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="5">
                <el-form-item label="员工名称">
                  <el-input
                    placeholder="员工名称"
                    v-model="form.name"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="5">
                <el-form-item label="公司名称">
                  <el-input
                    placeholder="公司名称"
                    v-model="form.name"
                  ></el-input> </el-form-item
              ></el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="5">
                <el-form-item label="部门名称">
                  <el-input
                    placeholder="部门名称"
                    v-model="form.name"
                  ></el-input> </el-form-item
              ></el-col>

              <el-col :span="9" :offset="1">
                <el-button type="primary" size="mini">搜索</el-button>
                <el-button type="danger" size="mini">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="accout-nav">
          <el-button type="primary" size="mini">同步</el-button>
          <el-button type="primary" size="mini">添加</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" size="mini">
          <el-table-column fixed type="selection" width="55"> </el-table-column>
          <el-table-column prop="jobnum" label="员工工号" width="150">
          </el-table-column>
          <el-table-column prop="name" label="员工名称" width="120">
          </el-table-column>
          <el-table-column prop="companyname" label="公司名称" width="120">
          </el-table-column>
          <el-table-column prop="department" label="部门名称" width="120">
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="300">
          </el-table-column>
          <el-table-column prop="phonenum" label="电话" width="120">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="120">
          </el-table-column>
          <el-table-column prop="wechat" label="微信" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >详情</el-button
              >
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      
      <!-- <HfBaseUserInfoIndexVue></HfBaseUserInfoIndexVue> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  hfBaseUserInfosync,
  companyDeparts,
  CompanyInfoidQuery,
} from "@/api/oa";
import HfBaseUserInfoIndexVue from '@/views/basic/hfBaseUserInfo'
import { baseApiGetMethod } from '@/components/CURD/baseApi';
export default {
  components: { HfBaseUserInfoIndexVue },
  data() {
    return {
      filterText: "",
      companydepartsdata: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      tableData: [],
      form: {
        jobnum: "",
        name: "",
        companyname: "",
        department: "",
        sex: "",
        phonenum: "",
        email: "",
        wechat: "",
      },
      currentPage4: 4,
      pageData: {
        pageNum: 1,
        pageSize: 10,
      },
      fullscreenLoading: false,
    };
  },
  mounted() {
    this.getCompanyDeparts();
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    handleClick(row) {
      console.log(row);
    },
    handleNodeClick(data) {
      console.log(data);
      baseApiGetMethod("/api/hfBaseUserInfo/nameQuery",{
        pageInfo: {
          pageNo: this.pageData.pageNum,
          pageSize: this.pageData.pageSize
        }
      }).then(
        (resp) => {
          if (resp.retCode == "00001") {
            console.log(resp.data, 111);
          }
        }
      );
    },

    handleSizeChange(val) {
    },
    handleCurrentChange(val) {

    },
    //获取公司与部门
    getCompanyDeparts() {
      companyDeparts().then((resp) => {
        this.fullscreenLoading = true;
        if (resp.retCode == "00001") {
          this.companydepartsdata = resp.data.companyInfos;
          this.fullscreenLoading = false;
        }
      });
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.content-lf {
  padding: 20px 0 0 0;
  box-sizing: border-box;
}
.app-container {
  .content-rt {
    padding: 20px 0 0 0;
    box-sizing: border-box;
    /deep/ .el-input__inner {
      height: 28px;
      line-height: 36px;
    }
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
  }
  .accout-nav {
    float: right;
    margin-bottom: 20px;
  }
}
</style>