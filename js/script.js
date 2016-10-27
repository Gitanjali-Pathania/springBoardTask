 var idNumber=0; //variable to assign id to the newly entered cards.

 // Funtion to Sort the cards according to the category passed i.e Name/Location/Follwers
 function sortBy(arg){
 	var category,counter=0,sortObj={},sortArray,newTemplate='';
 	if(arg=='byName') category='name';
 	else if(arg=='byLocation') category='location';
 	else if(arg=='byFollowers') category='follower';
    var getElements=document.getElementsByClassName(category);
    $('.cardDiv').each(function(index){
      if(getElements[counter] && this.innerHTML){
        sortObj[getElements[counter].innerHTML+index]=this.innerHTML;
        counter++;
      }
     })
    sortArray=FormatArray(sortObj);
    sortArray.sort(completeSortFun);
    sortArray.forEach(function(d){
      newTemplate+='<div class = "cardDiv">'+d.value+'</div>';
    })
    $(".cardHolder").html(newTemplate);
}

// Function to format the array formed in sortBy Function
function FormatArray(obj) {
    var arr = [],extraPages;
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
        return a.key - b.key;
    });

    return arr;
}

// Function to finally sort the formatted array returned in FormatArray Function
function completeSortFun(a,b) {
  if (a.key < b.key)
    return -1;
  if (a.key > b.key)
    return 1;
  return 0;
}

// Function to delete Card
function deleteSelectedCard(id){
    $('#CardNumber'+id).parent().empty();
}

//Function to add new Card
function newEntry(){
			var inputValue=document.getElementById("inputId").value,
				name;
				document.getElementById("inputId").value='';
			$.ajax({
			    url: "https://api.github.com/users",
			    type:"GET",
			    success: function(response){
			      response.forEach(function(d){
			      	 if(d.login==inputValue){
			      	 	$.ajax({
								    url: d.followers_url,
								    type:"GET",
								    success: function(followersResponse){
								    	name=(d.login).toLowerCase();
                                        $(".cardHolder").append('<div class="cardDiv"><div id="CardNumber'+idNumber+'"><div style="width:200px;height:270px;padding:10px;border:1.5px solid #d9d9d9;"><p id="'+idNumber+'" onclick="deleteSelectedCard(this.id)" style="cursor: pointer;position: absolute;margin-top: 5px;margin-left: 180px;color: grey;">x</p><a href="'+d.html_url+'"><div><img class = "imag" src="'+d.avatar_url+'" style="width:200px;height:200px;"><h5 class="name" style="height: 1px;margin-left: -10px;">'+name+'</h5><h6 style="height: 1px;"><span><label>Location:</label><label class = "location">Mountain View, CA</label></span></h6><h6  style="height: 1px;"><span><label>Followers:</label><label class = "follower">'+followersResponse.length+'</label></span></h6></div></a></div></div></div>');
                                        $('.name').css('text-transform','capitalize');
								    }
								});
			      	 	
			      	 }
			      })
 				  idNumber++;
			    }
			});
}


