<template>
    <div class="activity-name">
        <left-menu selected="2"></left-menu>
        <div class="activity-content">
            <div class="title">
                <h3>活动管理</h3>
                <Button type="primary"
                        @click="addShow()">新增活动</Button>
            </div>
            <div class="search">
                <Select v-model="searchData.areaParentId"
                        placeholder="请选择一级地址"
                        @on-change="handleChangeSearchFirstArea"
                        style="width: 200px">
                    <Option value="0" key="0">
                        所有一级区域
                    </Option>
                    <Option v-for="item in $groupFirstArea.data"
                            :value="item.id"
                            :key="item.id">{{ item.area0name }}</Option>
                </Select>

                <Select v-model="searchData.areaId"
                        placeholder="请选择二级地址"
                        style="width: 200px">
                    <Option value="0" key="0">
                        所有二级区域
                    </Option>
                    <Option v-for="item in searchSecondAreaList"
                            :value="item.id"
                            :key="item.id">{{ item.area1name }}</Option>
                </Select>

                <DatePicker type="datetime"
                            placeholder="请选择开始时间"
                            v-model="searchData.startTime"></DatePicker>

                <DatePicker type="datetime"
                            placeholder="请选择结束时间"
                            v-model="searchData.endTime"></DatePicker>

                <Button type="primary"
                        @click="search()">确定搜索</Button>
            </div>
            <div class="content"
                 v-if="this.lotteryData">
                <Table :columns="columns"
                       stripe
                       border
                       :data="this.lotteryData.data.list"
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
                <div style="margin: 10px; overflow: hidden">
                    <div style="float: right;">
                        <Page :total="this.lotteryData.data.page.total"
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
        <Modal title="新增/编辑活动"
               v-model="modal"
               :mask-closable="false"
               :closable="false">
            <Form ref="formValidate"
                  v-if="$groupFirstArea"
                  :model="formValidate"
                  :rules="ruleValidate"
                  :label-width="80">
                <FormItem label="一级地址"
                          prop="areaParentId">
                    <Select v-model="formValidate.areaParentId"
                            @on-change="handleChangeFirstArea"
                            placeholder="请选择一级地址"
                            style="width: 200px">
                        <Option v-for="item in $groupFirstArea.data"
                                :value="item.id"
                                :key="item.id">{{ item.area0name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="二级地址"
                          prop="areaId">
                    <Select v-model="formValidate.areaId"
                            placeholder="请选择二级地址"
                            style="width: 200px">
                        <Option v-for="item in formSecondAreaList"
                                :value="item.id"
                                :key="item.id">{{ item.area1name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="商品名称"
                          prop="name">
                    <Input v-model="formValidate.name"
                           placeholder="请填写活动地址"></Input>
                </FormItem>
                <FormItem label="折扣"
                          prop="rate">
                    <Input v-model="formValidate.rate"
                           :number="true"
                           placeholder="请填写折扣，整数(10为1折)"></Input>
                </FormItem>
                <FormItem label="原始库存"
                          prop="totalStock">
                    <Input v-model="formValidate.totalStock"
                           :number="true"
                           placeholder="请填写原始库存数"></Input>
                </FormItem>
                <FormItem label="剩余库存"
                          prop="stock">
                    <Input v-model="formValidate.stock"
                           :number="true"
                           placeholder="请填写原始库存数"></Input>
                </FormItem>
                <FormItem label="关联活动"
                          prop="activityId">
                    <Select v-model="formValidate.activityId"
                            placeholder="请选择关联活动"
                            style="width: 200px">
                        <Option v-for="item in $groupActivityList"
                                :value="item.id"
                                :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="请选择优惠券类型"
                          prop="couponId">
                    <Select v-model="formValidate.couponId"
                            placeholder="请选择关联活动"
                            style="width: 200px">
                        <Option v-for="item in $groupCouponList"
                                :value="item.id"
                                :key="item.id">{{ item.name }}</Option>
                    </Select>
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
