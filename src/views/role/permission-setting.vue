<template>
  <div class="app-container">
    <div class="container-title">
      角色1关联的权限列表
    </div>
    <div class="container-main">
      <el-transfer
        v-model="value"
        style="text-align: left; display: inline-block"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :render-content="renderFunc"
        :titles="['Source', 'Target']"
        :button-texts="['到左边', '到右边']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="data"
        @change="handleChange"
      />
    </div>
    <div class="container-btn">
      <el-button class="transfer-footer" size="small">取消</el-button>
      <el-button class="transfer-footer" type="primary" size="small">确定</el-button>
    </div>

  </div>
</template>

<script>
import { baseApiGetMethod } from '@/components/CURD/baseApi'
import { getData, getMessage, isSuccessResult, isTheRetCode } from '@/utils/ajaxResultUtil'
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1],
      renderFunc(h, option) {
        return <span>{option.key} - {option.label}</span>
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    init() {
      console.log(123123)
      // 获取用户拥有的路由权限
      baseApiGetMethod('/api/hfBaseRightMenu/route').then(
        (resp) => {
          if (isSuccessResult(resp)) {
            console.log(resp)
          } else {
            if (!isTheRetCode('00003')) {
              this.$message.error(getMessage(resp))
            }
          }
        }
      ).catch(e => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-title {}

.container-main {
  text-align: center;
  margin: 20px 0 0 0;
}

.container-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
