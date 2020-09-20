var firebaseConfig = {
      apiKey: "AIzaSyAtcuBv92OyXvBMd060uVXGPjn16BNYKIg",
      authDomain: "kwitter-project-54736.firebaseapp.com",
      databaseURL: "https://kwitter-project-54736.firebaseio.com",
      projectId: "kwitter-project-54736",
      storageBucket: "kwitter-project-54736.appspot.com",
      messagingSenderId: "313801583576",
      appId: "1:313801583576:web:93c486486a38bf10b9e0ad"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room name");
console.log(user_name);
console.log(room_name);
var t=new Date()
function send(){
      if(t.getMonth()=="0"){
            Month="January";
      }
      else if(t.getMonth()=="1"){
            Month="February";
      }
      else if(t.getMonth()=="2"){
            Month="March";
      }
      else if(t.getMonth()=="3"){
            Month="April";
      }
      else if(t.getMonth()=="4"){
            Month="May";
      }
      else if(t.getMonth()=="5"){
            Month="June";
      }
      else if(t.getMonth()=="6"){
            Month="July";
      }
      else if(t.getMonth()=="7"){
            Month="August";
      }
      else if(t.getMonth()=="8"){
            Month="September";
      }
      else if(t.getMonth()=="9"){
            Month="October";
      }
      else if(t.getMonth()=="10"){
            Month="November";
      }
      else{
            Month="December";
      }
      time_full=Month+" "+t.getDate()+"    "+t.getHours()+":"+t.getMinutes();
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like: 0,
            time:time_full
      });
      document.getElementById("msg").value = "";
}
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log("This is messageid"+firebase_message_id);
                        console.log(message_data);
                        name=message_data["name"];
                        message=message_data["message"];
                        like=message_data["like"];
                        Time=message_data["time"]
                        name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'>"+"            "+Time+"</h4>";
                        message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
                        like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"
                        span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like +"</span></button><hr>";
            
                        row=name_with_tag+message_with_tag+like_button+span_with_tag;
                        document.getElementById("output").innerHTML+=row;
                        //End code
                  }
            });
      });
}
getData();
function updateLike(message_id){
      console.log("Clicked on the button - "+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes)+1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room name");
      window.location="kwitter.html";
}
