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
                            <input type="file" name="foodimage" id="foodimage" accept="image/png, image/jpeg" @change="UploadImage" /> <br><br>
                            <label for="img">Food Name:</label>
                            <input type="text" id="Foodname" name="Foodname" v-model="foodname"><br><br>
                            <label for="img">Description:</label> <br>
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
            images: [],
            foodimagefilepath: null,
            Foods: [],
        }
    },
    methods:{
        GetCanteenImageFilenames(){
            var convert = require('xml-js');
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/GetCanteenImageFilenames").then(response => {
                var resultGetCanteenImageFilenames = convert.xml2json(response.data,
            {compact: true, spaces: 4});
            resultGetCanteenImageFilenames = JSON.parse(resultGetCanteenImageFilenames);
            this.images = resultGetCanteenImageFilenames.ArraOfstring["string"]._text;
            console.log(this.images);
            })
        },
        UploadImage(e){
            let img = e.target.files[0];
            let fd= new FormData()
            fd.append('image', img)
                    axios.post('/upload-image', fd).then(resp => {
                    this.foodimagefilepath = resp.data.path
            })
        },
        SubmitNewFoodMenu(){
            let fooddata = {
                foodname: this.foodname,
                fooddescription: this.fooddescription,
                foodimagefilepath: this.foodimagefilepath,
                foodimage: this.foodimage,
            }
            axios.post("https://canteen.nepeshayyim.com/Decatech/BRM_Canteen_Web/SaveCanteenMenuItem", fooddata)
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
    }
}
</script>