<template>
  <view class="page">
    <view class="content">
      <view class="weui-cells__title">机器人</view>
      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell weui-cell_input">
            <view class="weui-cell__hd">
                <view class="weui-label">名字</view>
            </view>
            <view class="weui-cell__bd">
                <input class="weui-input" v-model="title" placeholder="请输入机器人的名字"/>
            </view>
        </view>
      </view>
      <view class="weui-cells__title">类型</view>
      <view class="weui-cells weui-cells_after-title">
          <radio-group @change="surveTypeChange">
              <label class="weui-cell weui-check__label" v-for="type in surveyTypes" :key="type">
                  <radio class="weui-check" :value="type.value" :checked="type.checked"/>

                  <view class="weui-cell__bd">{{type.name}}</view>
                  <view class="weui-cell__ft weui-cell__ft_in-radio" v-if="type.checked">
                      <icon class="weui-icon-radio" type="success_no_circle" size="16"></icon>
                  </view>
              </label>
          </radio-group>
      </view>
    </view>
    <view class="footer">
      <button class="weui-btn" type="primary" @click="createBot">创建机器人</button>
    </view>
  </view>
</template>

<script>

export default {
  data () {
    return {
      surveyTypes: [
        {name: '答卷', value: 'exam', checked: true},
        {name: '问卷', value: 'exam1', checked: false},
        {name: '跳转', value: 'exam2', checked: false}
      ],
      title: ''
    }
  },

  computed: {
  },

  methods: {
    createBot (ev) {
      this.$store.dispatch('createSurvey',
        {title: this.title, type: 'exam'})
        .then((surveyId) => {
          wx.navigateTo({
            url: `/pages/surveySubjects/main?id=${surveyId}`
          })
        })
    },
    surveTypeChange (ev) {
      var surveyTypes = this.surveyTypes.map((type) => {
        type.checked = type.value === ev.mp.detail.value
        return type
      })
      this.surveyTypes = surveyTypes
    }
  },

  created () {
  }
}
</script>

<style>
.content {
  flex-direction: column;
}

</style>
