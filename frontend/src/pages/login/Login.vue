<script setup>
import { reactive } from 'vue';
import useLogin from '../../hooks/useLogin';

const {loading, login} = useLogin()
const form = reactive({
    
        username: "",
        password: "",
     
})

const onSubmit = async ()=>{
    await login({ username: form.username, password: form.password})
}

</script>

<template lang="">
    <div class="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div class="w-full p-6 rounded-lg shadow-md bg-gray-400/30 bg-clip-padding backdrop-filter backdrop-blur-lg">
            <h1 class="text-3xl text-center font-semibold ">
                LOGIN
              <span class="text-sky-900">
                    Chat App
              </span>
            </h1>
            
            <form @submit.prevent="onSubmit">
                <div>
                    <label class="label p-2">
                        <span class="text-base">
                            Username
                        </span>
                    </label>
                    <input type="text" v-model.trim="form.username" placeholder="Enter username" class="w-full input  placeholder-gray-300 bg-transparent  input-bordered h-10"/>
                </div>
                <div>
                    <label class="label p-2">
                        <span class="text-base">
                           Password
                        </span>
                    </label>
                    <input v-model.trim="form.password" type="password" placeholder="Enter password" class="w-full input placeholder-gray-300 bg-transparent input-bordered h-10"/>
                </div>
                <router-link  class="link block display link-hover mt-3" to="/signup">Don't have an account ? Create One</router-link>
               
                <div class="">
                    <button type="submit" class="btn  btn-block btn-neutral glass btn-sm mt-3 ">Login</button>
                </div>

            </form>
        </div>
    </div>
</template>

<style lang="">
    
</style>