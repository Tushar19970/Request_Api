const axios = require("axios");
const prompt = require('prompt-sync')();
console.log("\n**Welcome in course page**\n")
axios.get("http://saral.navgurukul.org/api/courses").then((res) => {
  let course = res.data.availableCourses;
  let list = [];
  let increament = 1;
  for (var i of course){
      console.log(increament + " : " + i.name);
      increament++
      list.push(i.id);
  }
  let user = prompt("Enter the course number :- ");
  let user_name = list[user - 1];
  axios.get("http://saral.navgurukul.org/api/courses/"+user_name+"/exercises").then((rest) =>{
    let course1 = rest.data.data;
    var slug_list = [];
    var counter = 0;
    var dict = {};
    for (j of course1){
        counter++
        console.log(counter + " : " + j.name)
        dict[counter] = j["slug"]
        var counter1 = 1; 
        for (l of j.childExercises){
            slug_list.push(l.slug);
            console.log("   ",counter + "."+counter1, l.name);
            dict[counter + "."+counter1] = l.slug;
            counter1++
        }
    }
    let user1 = prompt("Enter the course number :- ");
    for (a in dict){
    if (user1 == a){
        console.log(dict.a)
        axios.get("http://saral.navgurukul.org/api/courses/74/exercise/getBySlug?slug="+dict[a]).then((rest) => {
            let course2 = rest.data.content;
            console.log(course2);
          })
          .catch((err)=>console.log(err));
      }
  }
  })
});
