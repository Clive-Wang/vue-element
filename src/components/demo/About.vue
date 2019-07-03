<template>
  <div>
    <el-row style="">
          <el-input v-model="pfuser.username" :clearable=true placeholder="姓名" style="width: 300px;margin-right: 10px;"></el-input>
          <el-button icon="el-icon-search" @click="getData" type="primary">{{$t('Table.operSearch')}}</el-button>
          <el-button icon="el-icon-plus" @click="addRecord" type="primary">{{$t('Table.operAdd')}}</el-button>
        </el-row>
      <el-table
        :data="record.filter(data => !search || data.usercode.toLowerCase().includes(search.toLowerCase()))"
        :stripe = true
         height="490"
         border
         v-loading="loading"
         :default-sort = "{prop: 'usercode', order: 'descending'}"
        style="height: 300px;width: calc(100% - 40px);margin: 20px 0;">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          :label="TableHeader.usercode"
          sortable
          prop="usercode">
        </el-table-column>
        <el-table-column
          :label="TableHeader.telephone"
          prop="telephone">
        </el-table-column>
        <el-table-column
          :label="TableHeader.username"
          prop="username">
        </el-table-column>
        <el-table-column
          :label="TableHeader.sex"
          prop="sex">
           <template slot-scope="scope">
          <span>{{scope.row.sex=="0"?"女":"男"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="TableHeader.email"
          prop="email">
        </el-table-column>
        <el-table-column
          :label="TableHeader.opert"
          align="center">
          <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)">{{$t('Table.operEdit')}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">{{$t('Table.operDelete')}}</el-button>
           </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
            background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[8, 16, 24, 32]"
          :page-size="currentPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
          <el-form :model="form" ref="form">            
            <el-form-item 
            prop="usercode"
            :label="TableHeader.usercode"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入用户编码', trigger: 'blur' }
            ]">
              <el-input v-model="form.usercode" 
            :disabled="isDisabled" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item 
            prop="username"
            :label="TableHeader.username"
            :label-width="formLabelWidth"
            :rules="[
              { required: true, message: '请输入用户姓名', trigger: 'blur' }
            ]">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item 
            :label="TableHeader.telephone"
            prop="telephone"
            :rules="[
              { required: true, message: '请输入手机号码', trigger: 'blur' },
              { len:11 , message: '手机号格式不正确', trigger: 'blur' }
            ]"
            :label-width="formLabelWidth">
              <el-input v-model="form.telephone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item 
            :label="TableHeader.sex"
            prop="sex"
            :rules="[
              { required: true, message: '请选择性别', trigger: 'blur' }
            ]"
            :label-width="formLabelWidth">
               <el-radio-group v-model="form.sex">
                <el-radio label="0">女</el-radio>
                <el-radio label="1">男</el-radio>
               </el-radio-group>
            </el-form-item>
            <el-form-item 
            :label="TableHeader.email"
            prop="email"
            :rules="[
              { required: true, message: '请输入电子邮箱', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
            ]"
            :label-width="formLabelWidth">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('form')">{{$t('Table.btCancle')}}</el-button>
            <el-button type="primary" @click="submitForm('form')">{{$t('Table.btnSave')}}</el-button>
          </div>
        </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading:false,
        record: [],
        search: '',
        currentPage: 1,
        total:20,
        currentPageSize : 8 ,
        dialogFormVisible:false,
        isDisabled:false,
        dialogTitle: this.$t('TableHeader.dialogTitleAdd') ,
        pfuser:{
            username:""
        },
        form: {
          id:'',
          telephone: '',
          username: '',
          sex: '',
          email: '',
          usercode: ''
        },
        formLabelWidth: '100px'
      }
    },
    computed:{
        TableHeader(){
            return this.$t('TableHeader')
        }
    },
      methods:{
        handleEdit(index, row){
            this.dialogFormVisible = true ;
            this.form = row ;
            this.isDisabled = true ;
            this.dialogTitle = this.$t('TableHeader.dialogTitleUpd') ;
        },
        handleDelete(index, row) {
            console.log(this.$t('TableHeader'))
            var _self = this ;
            this.$confirm(_self.$t('Tips.delete.msg'), _self.$t('Tips.delete.title'), {
              confirmButtonText: _self.$t('Tips.delete.btnOk'),
              cancelButtonText: _self.$t('Tips.delete.btCancle'),
              type: 'warning'
            }).then(() => {
                var url = _self.HOST + "/pfuser/delete?id="+row.id ;     
                _self.$axios.get(url,{})
                  .then(function (res) {
                    if(res.data.ss != "200"){
                        _self.$message.error(res.data.msg);
                        return ;
                      }else{
                        _self.getData();
                        _self.dialogFormVisible = false ;
                        _self.$message({
                          message: '删除成功',
                          type: 'success'
                        });
                      }
                  })
                  .catch(function (error) {
                     _self.$message.error("删除失败！");
                  });
            }).catch(() => {
                   
            });
        },
        handleSizeChange(val) {
             this.currentPageSize = val ;
            this.getData();
          },
          handleCurrentChange(val) {
            this.currentPage = val ;
            this.getData();
          },
          addRecord(){
            this.isDisabled = false ;
            this.dialogTitle = this.$t('TableHeader.dialogTitleAdd') ; ;
            this.dialogFormVisible = true ;
            this.form = {} ;
          },
           submitForm(formName) {
            var _self = this ;
            _self.$refs[formName].validate((valid) => {
              if (valid) {
                var url = _self.HOST + "/pfuser/save";
                if(_self.isDisabled){
                    url = _self.HOST + "/pfuser/update";
                }
                _self.$axios.post(url, _self.form)
                  .then(function (res) {
                    if(res.data.ss != "200"){
                        _self.$message.error(res.data.msg);
                        return ;
                      }else{
                        _self.getData();
                        _self.dialogFormVisible = false ;
                        _self.$message({
                          message: '保存成功',
                          type: 'success'
                        });
                      }
                  })
                  .catch(function (error) {
                     _self.$message.error("保存失败！");
                  });
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            //this.$refs[formName].resetFields();
            this.$refs[formName].clearValidate();
            this.dialogFormVisible = false ;
          },
          getData(){
            this.loading = true ;
            var url = this.HOST + "/pfuser/list";
            var params = {
                "username":this.pfuser.username,
                "page":this.currentPage,
                "rows":this.currentPageSize
              }
            this.$axios.post(url,params)
            .then(res => {
              if(res.data.ss != "200"){
                this.$message.error(res.data.msg);
                return ;
              }else{
                console.log(res.data);
                this.record = res.data.data ;
                this.total = parseInt(res.data.msg) ;
              }
                this.loading = false ;
            })
            .catch(error => {
                this.loading = false ;
              this.$message.error(error);
            })
          }
      },
      mounted(){
        this.getData();
      }
  }
</script>
<style scoped>
.block{
    float: right;
    margin-right: 20px;
  }
</style>