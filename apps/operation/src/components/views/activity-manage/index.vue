<template>
    <div class="activity-name">
        <left-menu selected="1"></left-menu>
        <div class="activity-content">
            <div class="title">
                <h3>活动管理</h3>
                <Button type="primary"
                        @click="addShow()">新增活动</Button>
            </div>
            <div class="search">
                <Select v-model="searchData.area0Id"
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

                <Select v-model="searchData.area1Id"
                        placeholder="请选择二级地址"
                        style="width: 200px">
                    <Option value="0" key="0">
                        所有二级区域
                    </Option>
                    <Option v-for="item in searchSecondAreaList"
                            :value="item.id"
                            :key="item.id">{{ item.area1name }}</Option>
                </Select>

                <Select v-model="searchData.status"
                        placeholder="请选择状态"
                        style="width: 200px">
                    <Option v-for="item in statusList"
                            :value="item.value"
                            :key="item.value">{{ item.name }}</Option>
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
                 v-if="this.activityManageData">
                <Table :columns="columns"
                       stripe
                       border
                       :data="this.activityManageData.data.list"
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
                    <div class="total-nums">总共 <span>{{activityManageData.data.page.total}}</span> 条记录</div>
                    <div>
                        <Page :total="this.activityManageData.data.page.total"
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
                          prop="area0Id">
                    <Select v-model="formValidate.area0Id"
                            @on-change="handleChangeFirstArea"
                            placeholder="请选择一级地址"
                            style="width: 200px">
                        <Option v-for="item in $groupFirstArea.data"
                                :value="item.id"
                                :key="item.id">{{ item.area0name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="二级地址"
                          prop="area1Id">
                    <Select v-model="formValidate.area1Id"
                            placeholder="请选择二级地址"
                            style="width: 200px">
                        <Option v-for="item in formSecondAreaList"
                                :value="item.id"
                                :key="item.id">{{ item.area1name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="项目名称"
                          prop="name">
                    <Input v-model="formValidate.name"
                           placeholder="请填写活动地址"></Input>
                </FormItem>
                <FormItem label="Date">
                    <Row>
                        <Col span="11">
                        <FormItem prop="beginDate">
                            <DatePicker type="datetime"
                                        placeholder="Select date"
                                        v-model="formValidate.beginDate"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="2"
                             style="text-align: center">-</Col>
                        <Col span="11">
                        <FormItem prop="endDate">
                            <DatePicker type="datetime"
                                        placeholder="Select time"
                                        v-model="formValidate.endDate"></DatePicker>
                        </FormItem>
                        </Col>
                    </Row>
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
