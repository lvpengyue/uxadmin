<template>
    <div class="login">
        <!-- <img class="login-logo"
             src="./assets/login-white.png" /> -->
        <div class="login-form">
            <div class="login-form-logo">
                <div class="logo-wrap">悠洗洗衣</div>
                <div>全景监控平台</div>
            </div>
            <i-form ref="formInline"
                  :model="formInline"
                  :rules="ruleInline">
                <FormItem prop="account">
                    <Input type="text"
                           v-model="formInline.account"
                           placeholder="Username">
                    <Icon type="ios-person-outline"
                          slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password"
                           v-model="formInline.password"
                           placeholder="Password">
                    <Icon type="ios-locked-outline"
                          slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary"
                            @click="handleSubmit('formInline')">Signin</Button>
                </FormItem>
            </i-form>
        </div>
    </div>
</template>

<style src="./index.scss" lang="scss"></style>

<script src="./index.js"></script>
