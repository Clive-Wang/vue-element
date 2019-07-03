<template>
	<div class="login-ruleForm">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
		  <el-row>
			  <el-col :span="24"><div class="grid-content bg-purple-dark titCls">{{$t('message.logotit')}}</div></el-col>
			</el-row>
		  <el-form-item prop="telephone">
		    <el-input type="text" v-model="ruleForm.telephone" prefix-icon="el-icon-user" placeholder="请输入手机号码" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item prop="password">
		    <el-input type="password" v-model="ruleForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码" autocomplete="off"></el-input>
		  </el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')" class="btnCls">{{$t('message.logobtn')}}</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
    export default {
    	name: 'Login',
    	data() {
      return {
        ruleForm: {
          telephone: '15851871014',
          password: '888888'
        },
        rules: {
          telephone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { len:11 , message: '手机号格式不正确', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, message: '密码长度至少3个字符', trigger: 'blur' }
          ]
        }
      };
    },
    mounted(){
        var langs = localStorage.getItem('langs');
        this.$i18n.locale = langs;
    },
    methods: {
    	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            var url = this.HOST + "/login";
            this.$axios.get(url,{
              params: this.ruleForm
            })
            .then(res => {
              if(res.data.ss != "200"){
                this.$message.error(res.data.msg);
                return ;
              }else{
                this.$notify.success({
                  title:"欢迎你",
                  message:"系统管理员",
                  duration:3000
                });
                this.$router.push("/layout");
              }
            })
            .catch(error => {
              this.$message.error(error);
            })
          } else {
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped>
.login-ruleForm {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: -webkit-fill-available;
  background-color:#263445;
}
.demo-ruleForm{
    position: absolute;
	left: 50%;
    margin-left: -150px;
    top: 50%;
    margin-top: -145px;
    width: 300px;
    height: 250px;
    padding: 20px;
    background-color: #fff;
	border-radius: 2px;
}
.titCls{
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 23px;
    margin-bottom: 15px;
}
.btnCls{
	width:300px;
	margin-top:10px;
}
</style>

