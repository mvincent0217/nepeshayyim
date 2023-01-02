<template>
        <div class="text-center">
            <br><br><br>
            <h3 class="display-5 mb-2 text-center">Superstar! {{ this.accountname}}</h3>
            <br>
            <h5>List of Available Food Menu</h5>
                <select name="food" id="" >
                    <option value=""></option>
                <option v-for="(food,index) in Foods" :key="index">{{food.Name._text}}</option>
                </select>
            <br>
            <br>
            <h4>Upload new food menu</h4>
            <br>
                <form>
                    <div>
                            <label for="img">Food Name:</label>
                            <input type="text" id="Foodname" name="Foodname" v-model="foodname"><br><br>
                            <label for="">Food Image</label>
                            <select name="food" id="" @change="DisplayImage">
                                <option value=""></option>
                                <option v-for="(img,index) in foodimgArr" :key="index" :value="img._text">{{ img._text }}</option>
                            </select>
                            <div style="border-style: ridge;" :hidden="this.displaypicture == '' ">
                                <img :src="(GetimagePath + displaypicture)" width="450" height="345">
                            </div>
                            <br><br>

                            <label for="img">Description:</label><br>
                            <textarea id="Description" name="Description" rows="4" cols="50" v-model="fooddescription"></textarea><br>
                            <br><input type="submit" @click.prevent="SubmitNewFoodMenu">
                    </div>
                </form>
        </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
    data() {
        return{
            fullname: window.localStorage.getItem("user"),
            accountname: window.localStorage.getItem("accountname"),
            foodname: "",
            fooddescription: "",
            foodimage: "",
            foodimgArr: [],
            foodimagefilepath: null,
            displaypicture: '',
            Foods: [],
            GetimagePath: "https://canteen.nepeshayyim.com/",
            SaveimagePath: "\\hayyim-ssassrv.nepeshayyim.com"
        }
    },
    methods:{
        DisplayImage(e){
            this.displaypicture = e.target.value;
            console.log(e.target.value)
        },
        GetCanteenImageFilenames(){
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenImageFilenames").then(response => {
                var resultGetCanteenImageFilenames = convert.xml2json(response.data,
            {compact: true, spaces: 4});
            resultGetCanteenImageFilenames = JSON.parse(resultGetCanteenImageFilenames);
            this.foodimgArr = resultGetCanteenImageFilenames.ArrayOfstring["string"];
            })
        },
        SubmitNewFoodMenu(){
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/SaveCanteenMenuItem?name=" + this.foodname.toUpperCase() + "&description=" + this.fooddescription + "&filepath=" + this.GetimagePath + this.displaypicture.replace("\\", "/") + "&filecontent=" + '')
        },
        GetCanteenMenuItems(){
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenMenuItems").then(response => {
                var resultGetCanteenMenuItems = convert.xml2json(response.data,
            {compact: true, spaces: 4});
            resultGetCanteenMenuItems = JSON.parse(resultGetCanteenMenuItems);
            this.Foods = resultGetCanteenMenuItems.ArrayOfCanteenMenuItem.CanteenMenuItem;
            })
        },
    },
    created(){
        this.GetCanteenMenuItems();
        this.GetCanteenImageFilenames();
        console.log()
    }
}
</script>

<style>
img {
  max-width: 100%;
  height: auto;
}
</style>


