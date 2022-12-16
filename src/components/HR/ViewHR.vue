<template>
        <div class="text-center">
            <br><br>
            <h3 class="display-5 mb-2 text-center">Superstar! {{ this.accountname}}</h3>
            <br>
            <h5>List of Available Food Menu</h5>
                <select name="food" id="" >
                <option v-for="(food,index) in Foods" :key="index">{{food.Name._text}}</option>
                </select>
            <br>
            <br>
            <h4>Upload new food menu</h4>
            <br>
                <form>
                    <div>
                            <label for="img">Select image: &nbsp;</label>
                            <input type="file" name="myImage" accept="image/png, image/jpeg" @change="changeHandler" /> <br><br>
                            <label for="img">Food Name:</label>
                            <input type="text" id="Foodname" name="Foodname" v-model="foodname"><br><br>
                            <label for="img">Description:</label> <br>
                            <textarea id="Description" name="Description" rows="4" cols="50" v-model="fooddescription"></textarea><br>
                            <br><input type="submit" @click="SubmitNewFoodMenu">
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
            foodname: null,
            fooddescription: null,
            foodimage: null,
            foodimagefilepath: '',
            Foods: [],
        }
    },
    methods:{
        changeHandler(event){
            // setFile(event.target.files[0]);
            // console.log(file)

            let file = event.target.files[0]
            let reader = new FileReader();
            reader.onloadend = files => {
            this.foodimage = reader.result;
            console.log(this.foodimage);
            console.log(files)
            }
            reader.readAsDataURL(file);
        },
        GetCanteenMenuItems(){
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenMenuItems").then(response => {
                var result2 = convert.xml2json(response.data,
            {compact: true, spaces: 4});
            result2 = JSON.parse(result2);
            this.Foods = result2.ArrayOfCanteenMenuItem.CanteenMenuItem;
            })
        },
        SubmitNewFoodMenu(){
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/SaveCanteenMenuItem?name=" + this.foodname + "&description=" + this.fooddescription +"&filepath=" + this.foodimagefilepath + "&filecontent=" + this.foodimage).then(response => {
                console.log(response)
            })
        }
    },
    created(){
        this.GetCanteenMenuItems();
    }
}
</script>