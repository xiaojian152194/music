<template>
  <div>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
    <span style="cursor: pointer" v-if="auth.token">
      <a-avatar class="avatar" size="small" shape="circle" :src="currUser.avatar"/>
      <span>{{currUser.nickname}}</span>
    </span>
    <span style="cursor: pointer" v-else>
      <a-avatar class="avatar" size="small" shape="circle" :src="currUser.avatar"/>
      <span>用户名</span>
    </span>
    <a-menu style="width: 150px" slot="overlay" :style="{textAlign: 'center'}" v-if="auth.token && auth.roles === 'user'">
      <a-menu-item @click="changePassword(currUser.id)">
        <a-icon type="form" style="margin-right: 5px"/>
        <span>修改密码</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout" >
        <router-link to="/music/musicList" >
          <a-icon type="export" style="margin-right: 5px"/>
          <span>退出登陆</span>
        </router-link>
      </a-menu-item>
    </a-menu>
    <a-menu style="width: 150px" slot="overlay" :style="{textAlign: 'center'}" v-if="auth.token && auth.roles === 'admin'">
      <a-menu-item @click="changePassword(currUser.id)">
        <a-icon type="form" style="margin-right: 5px"/>
        <span>修改密码</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <router-link to="/personal/music" >
          <a-icon type="database" style="margin-right: 5px"/>
          <span>音乐管理</span>
        </router-link>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item>
        <router-link to="/personal/user" >
          <a-icon type="user" style="margin-right: 5px"/>
          <span>用户管理</span>
        </router-link>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout" >
        <router-link to="/music/musicList" >
          <a-icon type="export" style="margin-right: 5px"/>
          <span>退出登陆</span>
        </router-link>
      </a-menu-item>
    </a-menu>
    <a-menu style="width: 150px" slot="overlay" :style="{textAlign: 'center'}" v-else>
      <a-menu-item>
        <router-link to="/login" >
          <a-icon type="login" style="margin-right: 5px"/>
          <span>用户登陆</span>
        </router-link>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item @click="logout" >
        <router-link to="/music/musicList" >
          <a-icon type="logout" style="margin-right: 5px"/>
          <span>退出登陆</span>
        </router-link>
      </a-menu-item>
    </a-menu>
    <!--<a-menu style="width: 150px" slot="overlay" :style="{textAlign: 'center'}">-->
      <!--<a-menu-item v-if="auth.token">-->
        <!--<router-link to="/personal/pmusic" >-->
          <!--<a-icon type="user" style="margin-right: 5px"/>-->
          <!--<span>个人音乐</span>-->
        <!--</router-link>-->
      <!--</a-menu-item>-->
      <!--<a-menu-divider v-if="auth.token"/>-->
      <!--<a-menu-item @click="changePassword(currUser.id)" v-if="auth.token">-->
        <!--<a-icon type="form" style="margin-right: 5px"/>-->
        <!--<span>修改密码</span>-->
      <!--</a-menu-item>-->
      <!--<a-menu-item v-else >-->
        <!--<router-link to="/login" >-->
          <!--<a-icon type="login" style="margin-right: 5px"/>-->
          <!--<span>用户登陆</span>-->
        <!--</router-link>-->
      <!--</a-menu-item>-->
      <!--<a-menu-divider />-->
      <!--<a-menu-item @click="logout" >-->
        <!--<router-link to="/music/musicList" >-->
          <!--<a-icon type="logout" style="margin-right: 5px"/>-->
          <!--<span>退出登陆</span>-->
        <!--</router-link>-->
      <!--</a-menu-item>-->
    <!--</a-menu>-->
  </a-dropdown>
  <a-modal width="700px" :scrollable="true" :styles="{top: '60px', height:'500px'}"
           title="修改密码"
           v-model="changePasswordModal"
  >
    <div :style="{textAlign: 'center'}">
      <a-form :autoFormCreate="(from) => this.form = from" :model="changeUserPassword">
        <a-row>
          <a-col>
            <a-form-item label="昵称：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" fieldDecoratorId="nickname"
                         :fieldDecoratorOptions="{rules: [{ required: true, message: '昵称不能为空', whitespace: true}]}" >
              <a-input placeholder="请输入昵称" :maxlength=175 />

            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="密码：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" fieldDecoratorId="password"
                         :fieldDecoratorOptions="{rules: [{ required: true, message: '密码不能为空', whitespace: true}]}" >
              <a-input type="password" placeholder="请输入密码" :maxlength=36 />

            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div slot="footer">
      <a-button @click="handleOk" type="primary" size="large">确定</a-button>
      <a-button type="danger" @click="closeModal" size="large">取消</a-button>
    </div>
  </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ADivider from 'ant-design-vue/es/divider/index'
export default {
  name: 'HeaderAvatar',
  components: {ADivider},
  data () {
    return {
      changePasswordModal: false,
      changeUserPassword: {
        id: null,
        username: null,
        password: null,
        haveAuthority: null
      },
      auth: {
        token: null,
        roles: null
      }
    }
  },
  computed: {
    ...mapState({
      currUser: state => state.music_login_store.currentUser,
      updateUserState: state => state.user_store.updateUser
    })
  },
  methods: {
    initializeFetch () {
      this.auth.roles = sessionStorage.getItem('roles')
      this.auth.token = sessionStorage.getItem('token')
    },

    logout () {
      // debugger
      this.$store.dispatch('music_login_store/LOGOUT')
      this.$store.commit('removeToken')
      this.$store.commit('REMOVE_ROLES')
      this.initializeFetch()
      // this.$router.push('/music/musicList')
    },
    changePassword (id) {
      this.changePasswordModal = true
      this.$store.dispatch('user_store/FETCH_USER', id)
      // this.changeUserPassword.id = id
    },
    closeModal () {
      this.changePasswordModal = false
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          debugger
          let formDate = {
            id: this.changeUserPassword.id,
            username: this.changeUserPassword.username,
            haveAuthority: this.changeUserPassword.haveAuthority,
            nickname: this.form.getFieldValue('nickname'),
            password: this.form.getFieldValue('password')
          }
          this.$store.dispatch('user_store/UPDATE_USER', formDate)
          this.changePasswordModal = false
        } else {
          this.changePasswordModal = true
        }
      })
    }
  },
  watch: {
    updateUserState: {
      handler (curVal, oldVal) {
        if (curVal) {
          this.changeUserPassword = Object.assign({}, curVal)
        }
      },
      deep: true
    }
  },
  mounted () {
    this.initializeFetch()
  }
}
</script>

<style lang="less" scoped>
  .avatar{
    margin: 20px 4px 20px 0;
    color: #1890ff;
    background: hsla(0,0%,100%,.85);
    vertical-align: middle;
  }
</style>
