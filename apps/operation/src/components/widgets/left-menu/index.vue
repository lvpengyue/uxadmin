<template>
    <div class="left-menu">
        <Menu theme="light"
              :active-name="selected">
            <MenuGroup title="运营管理">
                <MenuItem name="1">
                    <Icon type="document-text"></Icon>
                    <router-link :to="{name: 'activity-manage'}">
                        活动管理
                    </router-link>
                </MenuItem>
                <MenuItem name="2">
                    <Icon type="chatbubbles"></Icon>
                    <router-link :to="{name: 'lottery'}">
                        活动商品管理
                    </router-link>
                </MenuItem>
                <!-- <MenuItem name="3">
                    <Icon type="chatbox"></Icon>
                    <router-link :to="{name: 'activity-manage'}">
                        意见反馈列表
                    </router-link>
                </MenuItem>
                <MenuItem name="4">
                    <Icon type="gear-b"></Icon>
                    <router-link :to="{name: 'lottery'}">
                        设备号更新列表
                    </router-link>
                </MenuItem>
                <MenuItem name="5">
                    <Icon type="social-yen"></Icon>
                    <router-link :to="{name: 'activity-manage'}">
                        申请退款列表
                    </router-link>
                </MenuItem>
                <MenuItem name="6">
                    <Icon type="pricetags"></Icon>
                    <router-link :to="{name: 'lottery'}">
                        活动优惠券列表
                    </router-link>
                </MenuItem>
                <MenuItem name="7">
                    <Icon type="pricetag"></Icon>
                    <router-link :to="{name: 'activity-manage'}">
                        用户优惠券列表
                    </router-link>
                </MenuItem> -->
            </MenuGroup>
            <MenuGroup title="商城管理">
                <!-- <MenuItem name="8">
                    <Icon type="pricetag"></Icon>
                    <router-link :to="{name: 'activity-manage'}">
                            商品管理
                    </router-link>
                </MenuItem>
                <MenuItem name="9">
                    <Icon type="pricetag"></Icon>
                    <router-link :to="{name: 'activity-manage'}">
                            骑手管理
                    </router-link>
                </MenuItem>
                <MenuItem name="10">
                    <Icon type="pricetag"></Icon>
                    <router-link :to="{name: 'activity-manage'}">
                            开通商城
                    </router-link>
                </MenuItem> -->
                <MenuItem name="11">
                    <Icon type="ios-chatbubble"></Icon>
                    <router-link :to="{name: 'comment'}">
                            评论管理
                    </router-link>
                </MenuItem>
            </MenuGroup>
        </Menu>
    </div>
</template>

<style lang="scss" src="./index.scss"></style>

<script src="./index.js"></script>
