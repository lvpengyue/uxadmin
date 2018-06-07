<template>
    <div class="header"
         v-if="$groupAccount">
        <div class="header-wrapper">
            <div class="header-logo"
                 @click="redirect('/#/')">
                <img src="./assets/logo.png"
                     alt="logo-jinmao" />
            </div>
            <Menu mode="horizontal"
                  theme="light"
                  accordion
                  :active-name="activeName">

                <MenuItem name="1">
                <Icon type="ios-paper"></Icon>
                内容管理
                </MenuItem>

                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        用户管理
                        </MenuItem>
                    </template>
                    <!-- <MenuGroup title="用户管理">
                        <MenuItem name="2">
                            <div @click="redirect('/operation/#/activity-manage')">
                                手机号更换记录
                            </div>
                        </MenuItem>
                        <MenuItem name="2">
                            <div @click="redirect('/operation/#/lottery')">
                                问卷调查列表
                            </div>
                        </MenuItem>
                    </MenuGroup> -->
                </Submenu>

                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-pulse-strong"></Icon>
                        运营管理
                    </template>
                    <MenuGroup title="运营管理">
                        <MenuItem name="3">
                        <div @click="redirect('/operation/#/activity-manage')">
                            活动管理
                        </div>
                        </MenuItem>
                        <MenuItem name="3">
                        <div @click="redirect('/operation/#/lottery')">
                            活动商品管理
                        </div>
                        </MenuItem>
                        <!-- <MenuItem name="3">
                            <div @click="redirect('/operation/#/lottery')">
                                意见反馈列表
                            </div>
                        </MenuItem>
                        <MenuItem name="3">
                            <div @click="redirect('/operation/#/lottery')">
                                设备号更新列表
                            </div>
                        </MenuItem>
                        <MenuItem name="3">
                            <div @click="redirect('/operation/#/lottery')">
                                申请退款列表
                            </div>
                        </MenuItem>
                        <MenuItem name="3">
                            <div @click="redirect('/operation/#/lottery')">
                                活动优惠券列表
                            </div>
                        </MenuItem>
                        <MenuItem name="3">
                            <div @click="redirect('/operation/#/lottery')">
                                用户优惠券列表
                            </div>
                        </MenuItem> -->
                    </MenuGroup>
                    <MenuGroup title="商城管理">
                        <!-- <MenuItem name="3">
                            <div @click="redirect('/operation/#/product')">
                                商品管理
                            </div>
                        </MenuItem>
                        <MenuItem name="3">
                            <div @click="redirect('/operation/#/rider')">
                                骑手管理
                            </div>
                        </MenuItem>
                        <MenuItem name="3">
                            <div @click="redirect('/operation/#/rider')">
                                开通商城
                            </div>
                        </MenuItem> -->
                        <MenuItem name="3">
                        <div @click="redirect('/operation/#/comment')">
                            评论管理
                        </div>
                        </MenuItem>
                    </MenuGroup>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        报表管理
                    </template>
                    <!-- <MenuGroup title="订单分析">
                        <MenuItem name="4">
                            <div @click="redirect('/operation/#/activity-manage')">
                                商品订单分析列表
                            </div>
                        </MenuItem>
                        <MenuItem name="4">
                            <div @click="redirect('/operation/#/lottery')">
                                购买时间分析
                            </div>
                        </MenuItem>
                        <MenuItem name="4">
                            <div @click="redirect('/operation/#/lottery')">
                                拼单时长分析
                            </div>
                        </MenuItem>
                        <MenuItem name="4">
                            <div @click="redirect('/operation/#/lottery')">
                                配送时长分析
                            </div>
                        </MenuItem>
                        <MenuItem name="4">
                            <div @click="redirect('/operation/#/lottery')">
                                用户领取优惠券记录
                            </div>
                        </MenuItem>
                    </MenuGroup> -->
                </Submenu>
            </Menu>
            <div @mouseover="handleUserMouseOver"
                 @mouseleave="handleUserMouseLeave"
                 class="header-user">
                <img src="./assets/s-user.png"
                     alt="user" />
                <span class="login-out"
                      v-show="showLoginOut"
                      @click="logout">
                    <Icon type="log-out"></Icon>退出</span>
                <span class="login-account"
                      v-show="showLoginOut">{{$groupAccount.account}}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
