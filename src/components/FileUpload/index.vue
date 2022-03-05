<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogVisible"
      :title="$t('common.common.upload')"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-button
        v-if="templateDownUrl.length>0"
        type="text"
        @click="handleDownload"
      ><u>{{ $t('common.common.tempaletDownload') }}</u></el-button>
      <el-upload
        ref="upload"
        action=""
        :http-request="handleUpload"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :limit="1"
        :multiple="false"
        :auto-upload="false"
      >
        <el-button
          slot="trigger"
          size="small"
          type="primary"
        >{{ $t('common.common.selectFile') }}</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >{{ $t('common.common.upload') }}</el-button>
        <div
          slot="tip"
          class="el-upload__tip"
        />
      </el-upload>
      <el-progress
        v-if="uploadRate>0 && uploadRate<100"
        :percentage="uploadRate"
        style="margin-top:30px;"
      />
    </el-dialog>
  </div>
</template>

<script>
import { isEmpty } from 'element-ui/src/utils/util'
import elDragDialog from '@/directive/el-drag-dialog'
import { upload, download } from '@/api/upload'
import { messageErrorHandle, messageSuccesHandle } from '@/utils/message-handle'
export default {
  name: 'FileUpload',
  directives: { elDragDialog }, // 自定义指令 拖拽
  props: {
    dialogUploadVisible: {
      type: Boolean,
      default: false
    },
    uploadUrl: {
      type: String,
      default: ''
    },
    templateDownUrl: {
      type: String,
      default: ''
    },
    maxsize: {
      type: Number,
      default: 1024
    },
    acceptType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: [],
      uploadRate: 0,
      dialogVisible: false,
      fullscreenLoading: false
    }
  },
  created() {
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
      this.fileList = []
    },
    beforeUpload(file) {
      const isLt10M = file.size / 1024 / 1024 / 1024 / 1024 < this.maxsize
      const fileName = file.name
      const fileType = fileName.substring(fileName.lastIndexOf('.') + 1)
      if (!isEmpty(this.acceptType) && this.acceptType.indexOf(fileType) === -1) {
        this.$message.error(this.$t('common.common.acceptFileType') + this.acceptType)
        return false
      }
      if (!isLt10M) {
        this.$message.error(this.$t('common.common.maxFileSize') + this.maxsize + 'M')
        return false
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleUpload(data) {
      const _this = this
      const params = new FormData()
      params.append('file', data.file)
      this.fullscreenLoading = true
      // 在此封装要axios发送的参数，包括headers和onUploadProgress。
      const onUploadProgress = function(e) {
        if (e.lengthComputable) {
          var rate = _this.uploadRate = (e.loaded / e.total * 100).toFixed(0) // 已上传的比例
          if (rate < 1) {
            _this.uploadRate = rate
          }
        }
      }
      upload(params, this.uploadUrl, onUploadProgress).then(response => {
        if (response.res === '1') {
          _this.dialogVisible = false

          messageSuccesHandle(_this, _this.$t('common.common.upload'))
          _this.$refs.upload.clearFiles()
          _this.$emit('submit-success', response)
        } else {
          messageErrorHandle(_this, response, _this.$t('common.common.upload'))
        }
        _this.fullscreenLoading = false
      })
    },
    uploadProcess(file, fileList) {
      // :on-change="uploadProcess" 没效果

      this.uploadRate = file.percentage.toFixed(0)
    },
    handleDownload(data) {
      const _this = this
      download(this.templateDownUrl).then(response => {
        _this.$util.downloadFile(response)
      })
    }
  }
}
</script>
