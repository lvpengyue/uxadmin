<template>
    <div class="comment">
        <left-menu selected="11"></left-menu>
        <div class="activity-content">
            <div class="title">
                <h3>评论管理</h3>
                <Button type="primary"
                        @click="addShow()">新增评论</Button>
            </div>
            <div class="search">
                <Select v-model="searchData.productId"
                        placeholder="请选择商品"
                        style="width: 200px">
                    <Option value="0"
                            key="0">
                        所有商品
                    </Option>
                    <Option v-for="item in $groupProductList.product"
                            :value="item.id"
                            :key="item.id">{{ item.name }}</Option>
                </Select>

                <Input v-model="searchData.userName"
                       style="width: 200px"
                       placeholder="请输入用户名称"></Input>

                <Input v-model="searchData.phone"
                       style="width: 200px"
                       placeholder="请输入手机号"></Input>

                <Button type="primary"
                        @click="search()">确定搜索</Button>
            </div>
            <div class="content"
                 v-if="this.commentData && this.commentData.data && this.commentData.data.list">
                <Table :columns="columns"
                       stripe
                       border
                       :data="this.commentData.data.list"
                       size="large"
                       ref="table"></Table>
                <br>
                <Button type="primary"
                        size="large"
                        @click="exportData(1)">
                    <Icon type="ios-download-outline"></Icon> 导出数据</Button>
                <!-- <Button type="primary"
                        size="large"
                        @click="exportData(2)">
                    <Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button>
                <Button type="primary"
                        size="large"
                        @click="exportData(3)">
                    <Icon type="ios-download-outline"></Icon> Export custom data</Button> -->
                <div style="margin: 10px; overflow: hidden" class="page-wrap">
                    <div class="total-nums">总共 <span>{{commentData.data.page.total}}</span> 条记录</div>
                    <div>
                        <Page :total="this.commentData.data.page.total"
                              :current="searchData.pageNum"
                              :pageSize="searchData.pageSize"
                              :page-size-opts="[10, 20, 30, 40, 10000]"
                              show-sizer
                              @on-page-size-change="changePageSize"
                              @on-change="changePage"></Page>
                    </div>
                </div>
            </div>
        </div>
        <Modal title="新增/编辑评论"
               v-model="modal"
               :mask-closable="false"
               :closable="false">
            <Form ref="formValidate"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="90">
                <FormItem label="上传头像"
                          v-show="addModal">
                    <div class="demo-upload-list"
                         v-for="item in uploadListPic">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-trash-outline"
                                      @click.native="handleRemovePic(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress"
                                      :percent="item.percentage"
                                      hide-info></Progress>
                        </template>
                    </div>
                    <Upload ref="uploadpic"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccessPic"
                            :format="['jpg','jpeg','png']"
                            :max-size="5120"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            multiple
                            type="drag"
                            :action="`${basePath}/ajaxfileupload`"
                            style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera"
                                  size="20"></Icon>
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label="上传评价图"
                          v-show="addModal">
                    <div class="demo-upload-list"
                         v-for="item in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-trash-outline"
                                      @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress"
                                      :percent="item.percentage"
                                      hide-info></Progress>
                        </template>
                    </div>
                    <Upload ref="upload"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="5120"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            :action="`${basePath}/ajaxfileupload`"
                            style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera"
                                  size="20"></Icon>
                        </div>
                    </Upload>
                </FormItem>
                <FormItem label="商品名称"
                          v-show="addModal"
                          prop="productId">
                    <Select v-model="formValidate.productId"
                            placeholder="请选择商品"
                            style="width: 200px">
                        <Option v-for="item in $groupProductList.product"
                                :value="item.id"
                                :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="用户名称"
                          prop="user">
                    <Input v-model="formValidate.user"
                           placeholder="请填写用户名称"></Input>
                </FormItem>
                <FormItem label="商品评分"
                          prop="star">
                    <Select v-model="formValidate.star"
                            style="width: 200px">
                        <Option v-for="item in starList"
                                :value="item"
                                :key="item">{{item}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="物流评分"
                          prop="logisticStar">
                    <Select v-model="formValidate.logisticStar"
                            style="width: 200px">
                        <Option v-for="item in starList"
                                :value="item"
                                :key="item">{{item}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="评价详情"
                          prop="content">
                    <Input v-model="formValidate.content"
                           type="textarea"
                           :autosize="true"
                           placeholder="请填写评论内容"></Input>
                </FormItem>
                <FormItem label="置顶权重"
                          prop="stick">
                    <i-switch size="large"
                              v-model="formValidate.stick"
                              true-value="1"
                              false-value="0">
                        <span slot="open">置顶</span>
                        <span slot="close">不置顶</span>
                    </i-switch>
                    <!-- <Input v-model="formValidate.stick"
                           :number="true"
                           placeholder="若已上传评价图则不允许置顶，默认为0，即不置顶，数值越大，展示顺序越靠前"></Input> -->
                </FormItem>
                <FormItem>
                    <Button type="primary"
                            @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="success"
                            @click="handleHide()"
                            style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
