<script setup>
import { reactive } from 'vue';
import useSignUp from '../../hooks/useSignup';

const form = reactive({
        fullName:"",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "male"  
})

const { loading, signup } = useSignUp()

const onSubmit = async ()=>{
   await signup({
       fullName:form.fullName,
        username: form.username,
        password: form.password,
        confirmPassword: form.confirmPassword,
        gender:  form.gender  
   })
}

</script>
<template >
    <div class="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div class="w-full p-6 rounded-lg shadow-md bg-gray-400/30 bg-clip-padding backdrop-filter backdrop-blur-lg">
            <h1 class="text-3xl text-center font-semibold ">
              <span class="text-sky-900">
                    Sign up
              </span>
            </h1>
            
            <form @submit.prevent="onSubmit">
                <div>
                    <label class="label p-2">
                        <span class="text-base">
                            Full Name
                        </span>
                    </label>
                    <input type="text" v-model.trim="form.fullName" placeholder="Enter username" class="w-full input  placeholder-gray-300 bg-transparent  input-bordered h-10"/>
                </div>
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
                    <input type="password" v-model.trim="form.password" placeholder="Enter password" class="w-full input placeholder-gray-300 bg-transparent input-bordered h-10"/>
                </div>
                <div>
                    <label class="label p-2">
                        <span class="text-base">
                           Confirm Password
                        </span>
                    </label>
                    <input type="password"  v-model.trim="form.confirmPassword"  placeholder="Enter Confirm password" class="w-full input placeholder-gray-300 bg-transparent input-bordered h-10"/>
                </div>

                <div class="flex gap-3 mt-1">
                    <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class=" mr-2">Male</span>
                        <input type="radio" value="male"  class="radio checked:bg-blue-500" v-model="form.gender" />
                    </label>
                    </div>
                    <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="mr-2">Female</span>
                        <input type="radio" value="female" class="radio checked:bg-red-500"  v-model="form.gender" />
                    </label>
                    </div>
                </div>

                <router-link  class="link block display link-hover" to="/">Already have an account ? Login</router-link>

                <div >
                    <button class="btn  btn-block btn-neutral glass btn-sm mt-3">Sign up</button>
                </div>

            </form>
        </div>
    </div>
</template>

<style>
    
</style>