
        var splitStringForCreateCard=[];
        var nameOfNewCard;
        var counterOfNotific=0;
         function createModal(){
          $('#modal5').modal('open');
         }
         function showModalForCreate(){
         	$('#createCard').modal('open');
         }
       function OpenModalForCreateList(){
       	var boardId=document.getElementById("idName").value;

       	if(boardId==""){
       		Materialize.toast("You haven't choose board !!","1900","","");
       	}
       	else{
       		$('#createList').modal('open');
       	}
       }
         function UpdateColls(){
           $('#modal22').modal('open');
           document.getElementById('NumNot').innerHTML="0";
           $('#ChangeCollorOfnotific').removeClass('red-text text-lighten 2'); 
           $('#ChangeCollorOfnotific').addClass('blue-text text-lighten 2'); 
           counterOfNotific = 0;
         }
      function createListInBoard(){
        	var boardId = document.getElementById("idName").value;
        	var textInput = document.getElementById("list_name").value;
        	
         if(textInput===""){
       	    Materialize.toast("!","1900","","");
         }
         else{
       	    var newList = {
             name: textInput, //σε αυτη την μεταβλητη μπαινει το όνομα που θα έχει η λίστα
             pos:'top',
             idBoard: boardId //πρέπει να υπάρχει το id του  board για να δημιουργηθει η λιστα σε συγκεκριμένο board
           };
            //einai to antikeimeno pou dhmiourgeite
            Trello.post('/lists/', newList);
            setTimeout(LoadNewList,200); 

            if( next < 2 ){ //ean dhmiourghsei lista prin ksekinisoun oi automatopoihmenes klhseis tis interval
                  setTimeout(updateUIfun,503);
            }
         }
          	
      }
      function LoadNewList(){
      	var boardId = document.getElementById("idName").value; 
      	myAppEvent=true;
      }
        function clearNotBox(){
          notificationsBox="";
          document.getElementById('notifCollsMessage').innerHTML=notificationsBox;
        }
        var nameOfCard;
        function OpenModalForCreateCard(id1){
          var str = id1;
          splitStringForCreateCard = str.split("_");
          document.getElementById("ListHeader").innerHTML ="Create card in "+splitStringForCreateCard[1];
         
          $('#createModalCard').modal('open');
             
          var listenerCardNew = document.getElementById('buttonCreate');
          listenerCardNew.addEventListener("click",createCard1);
         
        }
        function createCard1(){
        	 var boardId=document.getElementById('idName').value;
        	  nameOfNewCard = document.getElementById('icon_prefix').value;
            
          var newCard = {
              name: nameOfNewCard, //to onoma ths kartas
              idList: splitStringForCreateCard[0], //id listas
              idBoard:boardId
           }
          Trello.post('/cards/',newCard);
          setTimeout(loadNewCard,200);

          if(next<2){  //ean o xrhsths dhmiourghsei karta prin ksekinisoun oi automatopoihmenes klhseis (interval) tha prepei na enhmerw8ei to UI

          	 setTimeout(updateUIfun,503);
          
          } 
        }
        function loadNewCard(){
        	var boardId = document.getElementById("idName").value;
        	myAppEvent=true;   
        }
          var clientId2 = '920212143191-ib56a2jdl9dc5m77gfgs5adkh9hadh9u.apps.googleusercontent.com';  //gia localhost
          var clientId='981919221875-j786il9o9ob4pbk04o9mouvg2s8ju2qe.apps.googleusercontent.com'; //gia server
          var ids=[];
            if (!/^([0-9])$/.test(clientId[0])) {
                alert('Invalid Client ID - did you forget to insert your application Client ID?');
            }
            // Create a new instance of the realtime utility with your client ID.
            var realtimeUtils = new utils.RealtimeUtils({clientId: clientId});

            authorize();
            
            function authorize() {
                // Attempt to authorize
                realtimeUtils.authorize(function (response) {
                    if (response.error) {
                          var button = document.getElementById('auth_button');
                          button.classList.add('visible');
                        button.addEventListener('click', function () {
                            realtimeUtils.authorize(function (response) {
                                start();
                            }, true);
                        });
                    } else {
                        start();
                    }
                }, false);
            }
              var id;  //o kwdikos tou document pou prosti8ete sto url
            function start() {

                id = realtimeUtils.getParam('id');
                if (id) {
                    // Load the document id from the URL
                    realtimeUtils.load(id.replace('/', ''), onFileLoaded, onInitialize);
                    init();
                } else {
                        // Create a new document, add it to the URL
                        realtimeUtils.createRealtimeFile('MyWebb App', function (createResponse) {
                        window.history.pushState(null, null, '?id=' + createResponse.id);
                        id=createResponse.id;
                        realtimeUtils.load(createResponse.id, onFileLoaded, onInitialize);
                        init();
                    });
                   
                }
                
                 
            }

            var apponAdd = {};
            var apponAddcard = {};
            var appTrello = {};
            var appMess = {};
            var mylist =[];
            var mylistofcards =[];
            var listofId = [];
            function onInitialize(model) {
                var collaborativeListCard = model.createList();
                var collaborTrello = model.createList();
                var collaborTrelloComments = model.createList();
                var collaborativeMessage = model.createList();
                collaborTrello.pushAll(mylist);
                
                model.getRoot().set('demo_list', collaborativeListCard);
                model.getRoot().set('list', collaborTrello);
                model.getRoot().set('list_comments', collaborTrelloComments);
                model.getRoot().set('list_messages',collaborativeMessage)
            }
            function onFileLoaded(doc) {
                apponAdd.doc = doc;
                apponAdd.listDemo = doc.getModel().getRoot().get('demo_list');

                appTrello.doc = doc;
                appTrello.listBoard = doc.getModel().getRoot().get('list');

                comments.doc = doc;
                comments.listcardsComment = doc.getModel().getRoot().get('list_comments');
                
                appMess.doc = doc;
                appMess.listOfMessages = doc.getModel().getRoot().get('list_messages');

                var collaborativeListCard = doc.getModel().getRoot().get('demo_list'); //collaborative list gia tis kartes 
                var collaborTrello = doc.getModel().getRoot().get('list');                   //gia tis listes
                var collaborTrelloComments = doc.getModel().getRoot().get('list_comments');  //gia ta comment 
                var collaborators = doc.getCollaborators();                                    
                var collaborativeMessage = doc.getModel().getRoot().get('list_messages');
                var collaboratorCount = collaborators.length;
                
                document.getElementById("NameOfColl").innerHTML=collaborators[0].displayName; 
                doc.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_JOINED, NumOfColls);
                doc.addEventListener(gapi.drive.realtime.EventType.COLLABORATOR_LEFT,NumOfColls1);
                setup();
            }
            var idSenderUser;
            var counter=0;
          function OpenMessForColls(doc){
                var res=document.getElementById("NumOfMess").innerHTML;
                var collaborativeMessage = doc.getModel().getRoot().get('list_messages');
                var str="";
            
               $('#modal4').modal('open');
                document.getElementById("NumOfMess").innerHTML=0;
                counter=0;
                collaborativeMessage.clear();        
        }
        var myAppEvent1;

        function OpenModalForList(id){
                var r = confirm("Do you want delete this list?");  
                
                if(r){
                 
                 Trello.put('/lists/'+id+'/closed?value=true',UpdateForDeleteList);
                 myAppEvent=true; 
                  
                  if(next<2){  //ean o xrhsths epixeirhsei na diagrapsei karta prin ksekinhsoun oi automatopoihmenes klhseis tote 8a ginei klhsh gia 
                   //console.log("mpike kai edw wwww")
                   setTimeout(updateUIfun,500);
                  
                  } 
                
                }

        }
        function UpdateNumsOfColls(doc){
          var collaborators = doc.getCollaborators();
          var collaboratorCount = collaborators.length;
          var str="";
           
          if(collaboratorCount == 0 || collaboratorCount==1 ){
            //Materialize.toast("Δεν υπάρχει κάποιος συνεργατης online αυτη την στιγμή !","1200","card black","");
          }
          else{
            for(var i=0;i<collaboratorCount;i++){
              if(!collaborators[i].isMe){
               str+=collaborators[i].displayName+"<br>";
              }
            }   
             document.getElementById("online").innerHTML = str;
             $('#modalOnlineCalls').modal('open');
          }
        }
        function callModal(){
           $('#modalCreateBoard').modal('open');
        }
        function sendMessage(){
           var sessionId = document.getElementById('selectColl').value;
           var collaborativeMessage = doc.getModel().getRoot().get('list_messages');
           if(sessionId==""){
           	Materialize.toast("Do have not select collaborator !","1300","card blue","")
           }
           else{
             var message=document.getElementById('textIDColl').value;
             document.getElementById('textIDColl').value='';
             if(message!=""){
              var objColl={mess:message,sessIdReceiver:sessionId,nameOfSender:NameAccount,sessIdSender:UserId};
              var arr=[];
              arr.push(objColl);
              collaborativeMessage.pushAll(arr);
             }
             else{
             	Materialize.toast("You have not completed all fields!","1300","card blue","")
             }
             
          }
           
        }
       
        function callModal1(){
             var collaborators = doc.getCollaborators();
              $('#selectColl').html('');
               $("#selectColl")
                  .append($("<option></option>")
                  .attr("value","")
                  .text("Select collaborator"));
              for(var i=0;i<collaborators.length;i++){
                if(!collaborators[i].isMe){
                  $("#selectColl")
                  .append($("<option></option>")
                  .attr("value",collaborators[i].sessionId)
                  .text(collaborators[i].displayName));
                }
                   
              }
                $('select').material_select();
                $('#modal3').modal('open');

        }
            var UserId;
            var NameAccount;
            var listTest=[];
            var testVar;
            var NumOfColls = function (event) {
                var collaborators = doc.getCollaborators(); //το αντικείμενο που αποθηκευονται οι πληροφορίες συνδεδεμενων χρηστων
                var collaboratorCount = collaborators.length; //το πληθος των συνδεδεμενων χρηστων
                var user = event.collaborator;
                listTest.length=0;
                 for(var i=0;i<collaborators.length;i++){
                     if(collaborators[i].isMe){
                       UserId=collaborators[i].sessionId;
                       NameAccount=collaborators[i].displayName;
                     }
                          
                 }
                 document.getElementById("NameOfColl").innerHTML=NameAccount;   

                  if(collaboratorCount==0){ 
                    document.getElementById("Num").innerHTML=0;
                  }
                  else{
                     var num=collaboratorCount-1;
                     document.getElementById("Num").innerHTML=num; //grafei to plh8os twn sunergatwn pou einai online tin stigmh ekeinh
                  }
                   
            };

           var NumOfColls1 = function (event) {
              var collaborators = doc.getCollaborators();
              var collaboratorCount = collaborators.length;
              var user = event.collaborator;
              var message="disconnected "+user.displayName+" just now!";
              var isTrue;
               for(var i=0;i<collaborators.length;i++){
                if(user.displayName==collaborators[i].displayName){
                      isTrue=true;
                      break;
                }
                
               } 
              if(!isTrue){
                Materialize.toast(message,"2300","card red","");
                collaboratorCount--;
                document.getElementById("Num").innerHTML=collaboratorCount;
              }
                
              
            };
            function setup() {

                appTrello.listBoard.addEventListener(gapi.drive.realtime.EventType.VALUES_ADDED, onUpdate); //event pou kaleite otan pros8e8ei/afaire8ei mia lista gia na enhmerwsei olous tous sunergates
                comments.listcardsComment.addEventListener(gapi.drive.realtime.EventType.VALUES_ADDED, onUpdateCollsforComment); //event pou kaleite otan ginei post se mia karta gia na enhmerwsei olous tous sunergates
                apponAdd.listDemo.addEventListener(gapi.drive.realtime.EventType.VALUES_ADDED,onUpdateCard); //event pou kaleite otan pros8e8ei/afaire8ei mia karta gia na enhmerwsei olous tous sunergates
                appMess.listOfMessages.addEventListener(gapi.drive.realtime.EventType.VALUES_ADDED,UpdateMessList);
            }

             var testUser;
             function UpdateMessList(event){
               var collaborativeMessage = doc.getModel().getRoot().get('list_messages');
               var isLocal = event.isLocal;
               var user = event.collaborator;
               var str="";
               if(isLocal){
                 Materialize.toast("Your message has been sent successfully","1800","card green","")
               }
               if(!isLocal){
                for(var i=0;i<collaborativeMessage.length;i++){
                  if(UserId == collaborativeMessage.get(i).sessIdReceiver){
                     counter++;
                     document.getElementById("NumOfMess").innerHTML = counter;
                       //var audio = new Audio('not.mp3');
                      //audio.play(); 
                     var name= collaborativeMessage.get(i).nameOfSender.bold();
                     str+=name+" : "+collaborativeMessage.get(i).mess+"<br>";
                     idSenderUser=collaborativeMessage.get(i).sessIdSender;
                     
                  }

                }
                   document.getElementById("NumOfMess").innerHTML = counter;
                   document.getElementById("MessageText").innerHTML=str;
               }
               counter=0;  
             };
           var notificationsBox="";
           var listaMeOnomata=[];
            //event pou kaleite gia na enhmerwsei olous tous collaborators oti pros8e8ike h afaire8ike kapoia karta
         var onUpdateCard = function (event) {
               
                var collaborativeListCard = doc.getModel().getRoot().get('demo_list');
                var collaborTrello = doc.getModel().getRoot().get('list');
                var x = document.getElementById("idName");
                var i = x.selectedIndex;
                var isLocal = event.isLocal;
                var boardNameNonLocalUser;
                var x = document.getElementById("idName");
                var i = x.selectedIndex;
                boardNameNonLocalUser = x.options[i].text;
  
              if(!isLocal){
              	var boardId=document.getElementById("idName").value;
                    
              	Trello.get('/boards/'+boardId+'/lists?cards=open&card_fields=all',loadedListOfCards, function(){console.log("failed");});
              	//console.log("non local eimai ")
                Trello.get('/members/me/boards/',function(boards){
                   $.each(boards, function (index,value){
                           listaMeOnomata.push(value.name);     
                   });
                   var temp=[];
                   var haveBoard;
                   temp.push(collaborativeListCard.get(0));
                 for(var i=0;i<listaMeOnomata.length;i++){
                    if(listaMeOnomata[i]==temp[0]){
                      haveBoard=true;
                      break;
                    }
                  }
                 if(boardNameNonLocalUser!=collaborativeListCard.get(0) && haveBoard==true){//enhmerwsh gia ton non-local user o opoios exei to board sto opoio egine h pos8aferesh kartas
                     
                     var date = new Date();
                     var timeOfEvent = date.toLocaleTimeString();
                     notificationsBox+=collaborativeListCard.get(0)+": "+collaborativeListCard.get(1)+" | "+timeOfEvent.bold()+" | "+"<br>";
                     document.getElementById("notifCollsMessage").innerHTML = notificationsBox;
                     counterOfNotific++;
                     document.getElementById("NumNot").innerHTML=counterOfNotific;
                     $('#ChangeCollorOfnotific').removeClass('blue-text text-lighten 2'); 
                     $('#ChangeCollorOfnotific').addClass('red-text text-lighten 2');   
                 }
             
            
                },function () {
                    alert("failed");
                    } ); 
               
                 
           }


        };//telos event
        
            //event pou kaleite gia na enhmerwsei olous tous colls oti pros8e8ike h afaire8ike mia lista
            var onUpdate = function (event) {
                var collaborTrello = doc.getModel().getRoot().get('list');
                var x = document.getElementById("idName");
                var i = x.selectedIndex;
                
                var isLocal = event.isLocal;
                var boardNameLocalUser=collaborTrello.get(0);
                var boardNameNonLocalUser="";
             if(!isLocal){
               var x = document.getElementById("idName");
               var i = x.selectedIndex;
               boardNameNonLocalUser = x.options[i].text;   
                 
               if(boardNameLocalUser!=boardNameNonLocalUser){   //ean o non-local xrhsths den exei epileksei to board sto opoio egine allagh tote 8a tou emfanistei to modal minima
                  document.getElementById("updateColls").innerHTML = collaborTrello.get(1);
                  $('#modal1').modal('open');
               }  
             }
                           
            };
            var listaMeOnomata1=[];
            var commentIncard=[];
            var onUpdateCollsforComment = function (event) {
                var collaborTrelloComments = doc.getModel().getRoot().get('list_comments');
                var x = document.getElementById("idName");
                var i = x.selectedIndex;
                var boardName = x.options[i].text;
                var isLocal = event.isLocal;
                    
                 if(!isLocal){
                    Trello.get('/members/me/boards/',function(boards){
                     $.each(boards, function (index,value){
                           listaMeOnomata1.push(value.name);     
                      });
                        var temp=[];
                        var haveBoard;
                        temp.push(collaborTrelloComments.get(2)); //push to onoma tou board , wste na tsekarouyme parakatw ean anhkei o synergaths se auto to board
                        for(var i=0;i<listaMeOnomata1.length;i++){
                          if(listaMeOnomata1[i]==temp[0]){
                           haveBoard=true; //ean einai melos se auto to board tote kane true tin metavlhth
                           break;
                          }
                        }
                        if(boardName!=collaborTrelloComments.get(2) && haveBoard==true){  //non-local 8a enhmerw8ei me auto to minima ean o xrhsths den vriskete se ekeino to board pou egine to sxolio me to modal mnm
                         counterOfNotific++;
                         $('#ChangeCollorOfnotific').removeClass('blue-text text-lighten 2'); 
                         $('#ChangeCollorOfnotific').addClass('red-text text-lighten 2');
                         var res = collaborTrelloComments.get(0).bold();
                         var finalMess=collaborTrelloComments.get(2)+" : "+res+" added comment in  - "+ collaborTrelloComments.get(3)+ " - : ";
                         notificationsBox+=finalMess+collaborTrelloComments.get(1)+"<br>"
                         document.getElementById("notifCollsMessage").innerHTML = notificationsBox;
                         document.getElementById("NumNot").innerHTML=counterOfNotific;  
                         commentIncard.push(collaborTrelloComments.get(3));
                       }

                    },function () {
                      console.log("failed");
                     } );     

                    }//telos if

                };
            init = function() {
               
               s = new gapi.drive.share.ShareClient('981919221875');
               s.setItemIds([id]);

            } 
    
    
   
      var date = new Date();
      var deleteList=false;
      function UpdateForDeleteList() {
        var boardId = document.getElementById("idName").value;
        var i = 0;
        deleteList=true;
        Trello.get('/boards/' + boardId + '/lists?cards=open&card_fields=all', loadListsofCardsinBackEnd, function() { console.log("failed to show listsofcards in back end")});
        Trello.get('/boards/' + boardId + '/lists?cards=open&card_fields=all', loadedListOfCards, function() {console.log("failed !!");
        });
      }
      var mass = "";
      var resultOfLink="";
      var lastBoard;
      var intervalVar;
      var globalBoardId;
      var gloabalBoardName;
      function update() {
      	var x = document.getElementById("idName");
        var i = x.selectedIndex;
        gloabalBoardName = x.options[i].text;
        var messTool="create list in "+gloabalBoardName;
        globalBoardId = document.getElementById("idName").value;
        mylist.length = 0;
        listofId.length = 0;
        var x = document.getElementById("idName");
        var i = x.selectedIndex;
        i--;
        resultOfLink="";
        resultOfLink=urlListsofBoards[i];
        next=0;
        stayThisBoard=0;
       $('#cloudState').removeClass('blue-text text lighten 2');
       $('#cloudState').addClass('red-text text lighten 2');
      
       $("#addlist1").attr("data-tooltip",messTool);
       

       if(globalBoardId !== lastBoard){
       
        clearInterval(intervalVar);

        //get the users listsofcards (front-end)
        Trello.get('/boards/' + globalBoardId + '/lists?cards=open&card_fields=all',loadedListOfCards, function() { console.log("failed to show listsofcards in front end")});
        Trello.get('/boards/' + globalBoardId + '/members', printMembers, function() {console.log("failed to load members of selected board");}); //me8odos pou kaleite gia na enhmerwsei ton xrhsth poia einai ta melh tou board sto opoio einai o xrhsths ekeinh tin stigmh  
           
        intervalVar=setInterval(function() {
          	
          	if(beforeBoardId1==globalBoardId){ //ean exei parameinei sto board tote ksekinane na ginontai oi klhseis susthmatos
              
              Trello.get('/boards/' + globalBoardId + '/lists?cards=open&card_fields=all', loadListsofCardsinBackEnd, function() {console.log("failed to show listsofcards in back end")});
              Trello.get('boards/'+globalBoardId+'/actions?filter=commentCard,since=lastView',loadForComment,function(){console.log("failed")});
          	 
          	}
            beforeBoardId1=globalBoardId;
         },1513);  
       }
        lastBoard=globalBoardId; 
      } //telos update

      function comments() {
        
        var boardId = document.getElementById("idName").value;
        Trello.get('/boards/' + boardId + '/actions?filter=commentCard&since=lastView', loadComments, function() {});

      }

      var nameList = [];
      var cardName = [];
      var listComment = [];
      var namesofCreateComments = [];
      var bef = 0;
      var nameCard = [];
      var beforeId3;
      var printMembers = function(members) {
        var nameOfMembersAtBoard = [];
        $.each(members, function(index, value) {
          nameOfMembersAtBoard.push(value.fullName);
        });
       
        $(" #members ").attr("data-tooltip", nameOfMembersAtBoard);
      };
      function loadListInOpt() {
        var boardId = document.getElementById("idNameUp").value; //edw me vash tin epilogh pou exei epileksei o xrhsths , pairnei to attribute (opou einai to id tou board)

        Trello.get('/boards/' + boardId + '/lists', createOptionList, function() {;
        });
      }
       
      var test = [];
      //sunarthsh h opoia dhmiourgei option list apo ta onomata listwn enws epilegmenou board
      var createOptionList = function(boards) {

        $('#myoptOfList').html(''); //svhnei oti option uparxei hdh kai parakatw dhmiourgei nea apo tin arxh
        
        $.each(boards, function(index, value) {
          $("#myoptOfList")
            .append($("<option></option>")
              .attr("value", value.id)
              .text(value.name));
        });
        $('select').material_select();
      };
      //arrays pou fortwnoun ta id kai ta onomata twn kartwn / listwn (ws back-end) 
      var listNameB_E=[];
      var idListB_E=[];
      var cardNameB_E=[];
      var idCardB_E=[];
      var beforeLengthInList; //metavlhth pou apo8hkeuete to mege8os tou array pou apo8hkeuontai oi listes tou epilegmenou board ,
      // wste na sugkrinete se ka8e klhsh susthmatos ean exei allaksei (dld exei pros8afaire8ei lista)
      var beforeLengthInCards; //to idio ginetai kai me to mege8os twn kartwn
      var boardNameBef;
      var updateUI; //metavlhth pou ginetai true ean exei ginei kapoia pros8afairesh se lista h karta wste na ginei klhsh susthmatos gia th enhmerwsh tou UI 
      var next=0;
      var stayThisBoard=0;
      var myAppEvent;

      var loadListsofCardsinBackEnd = function(lists){
          listNameB_E.length=0;
          idListB_E.length=0;
          cardNameB_E.length=0;
          idCardB_E.length=0;
          var x = document.getElementById("idName");
          var i = x.selectedIndex;
          var boardNameInB_E = x.options[i].text; 
          var boardId = document.getElementById("idName").value; 
        $.each(lists, function(index, value) {
              listNameB_E.push(value.name);
              idListB_E.push(value.id);
          $.each(value.cards, function(ind, val) {
              cardNameB_E.push(val.name);
              idCardB_E.push(val.id);
          });
                 
        });
        //console.log("kaleite")
        if(boardNameBef != boardNameInB_E){
           next=0;
        }
      
       if(boardNameBef == boardNameInB_E ){
       	  var collaborativeListCard = doc.getModel().getRoot().get('demo_list');
          //console.log("mpike !d");
          if(myAppEvent)
            var messName = NameAccount;

          else{
          	//var messName = "One user from trello ";
            var messName = NameAccount;
          }
          
          var finalMess;
          var arrayMess=[]; 
          var temp=[];
          var testNext;
          var messageMatToast="";  //mhnuma pou 8a vlepei o xrhsths pou vriskete sto board pou egine h pros8hkh-afairesh  kartas/listas
          
          if(next<10)
             next++;
          
          //console.log("o counter einai "+next);
           if(beforeLengthInList > listNameB_E.length && next>1 ){   //ean isxuei auto , tote exei afaire8ei mia lista 
            
             var defList;
             defList=beforeLengthInList-listNameB_E.length;
            
             if(beforeLengthInCards==cardNameB_E.length && defList==1 ){ //ean isxuei auto , dld den exei allaksei to plh8os twn kartwn tote exei afaire8ei mia adeia lista
                
                finalMess=messName + " has deleted a empty list  "; //gia diagrafh adeias listas
                temp.push(boardNameInB_E); //kanw push to onoma tou board sto opoio egine to event
                temp.push(finalMess);
                temp.push(UserId);
                messageMatToast="A list was deleted just now !";
                collaborativeListCard.length = 0;
                collaborativeListCard.pushAll(temp);
                
                updateUI=true;
             } 
             if(beforeLengthInCards > cardNameB_E.length && defList==1){ //ean isxuei auto , dld den exei allaksei to plh8os twn kartwn tote exei afaire8ei mia adeia lista
                finalMess=messName + " delete one list of cards ";
                temp.push(boardNameInB_E); //kanw push to onoma tou board sto opoio egine to event
                temp.push(finalMess);
                temp.push(UserId);
                messageMatToast="A list was deleted just now !";
                collaborativeListCard.length = 0;
                collaborativeListCard.pushAll(temp);
                updateUI=true;
                
             }    
           } //telos if gia afairesh listas

            if(beforeLengthInList<listNameB_E.length &&  next>1 ){   //ean isxuei auto , tote exei pros8e8ei mia lista 
                finalMess=messName + " added new list ";
                temp.push(boardNameInB_E); //kanw push to onoma tou board sto opoio egine to event
                temp.push(finalMess);
                temp.push(UserId);
                messageMatToast="A list has been added just now";
                collaborativeListCard.length = 0;
                collaborativeListCard.pushAll(temp);
                

             if(beforeLengthInCards < cardNameB_E.length){
                finalMess=messName + "added card in new list";
                temp.push(boardNameInB_E); //kanw push to onoma tou board sto opoio egine to event
                temp.push(finalMess);
                temp.push(UserId)
                messageMatToast="A card has been added just now";
                collaborativeListCard.length = 0;
                collaborativeListCard.pushAll(temp);
              
             }
             updateUI=true;
         }
          if(beforeLengthInList==listNameB_E.length && next>1){   //ean isxuei auto , tote exei pros8e8ei mia karta 
             
             if(beforeLengthInCards < cardNameB_E.length && next>1){
             	 var defCard=cardNameB_E.length-beforeLengthInCards;
             	 if(defCard==1){
             	 	
             	 	finalMess=messName + " added one card in list "
                    temp.push(boardNameInB_E); //kanw push to onoma tou board sto opoio egine to event
                    temp.push(finalMess);
                    temp.push(UserId)
                    messageMatToast="A card has been added just now";
                    collaborativeListCard.length = 0;
                    collaborativeListCard.pushAll(temp);
                    updateUI=true;
                  
             	 }
             	 if(defCard>1){
             	  
             	  finalMess=messName + " added "+defCard+" cards in list";
                  temp.push(boardNameInB_E); //kanw push to onoma tou board sto opoio egine to event
                  temp.push(finalMess);
                  temp.push(UserId)
                  messageMatToast=defCard+" cards has been added just now";
                  collaborativeListCard.length = 0;
                  collaborativeListCard.pushAll(temp);
                  updateUI=true;
                
             	 }
             	
             }
             if(beforeLengthInCards > cardNameB_E.length && next>1){
             	 var defCard=beforeLengthInCards-cardNameB_E.length;
              if(defCard==1){
             	
             	finalMess=messName + " delete  one card from list";
                temp.push(boardNameInB_E); //kanw push to onoma tou board sto opoio egine to event
                temp.push(finalMess);
                temp.push(UserId);
                messageMatToast="one card was deleted just now !";
                collaborativeListCard.length = 0;
                collaborativeListCard.pushAll(temp);
                updateUI=true;
                
              }

             	 if(defCard>1){
             	  
             	  finalMess=messName + " delete "+defCard+" card  from list";
                  temp.push(boardNameInB_E); //kanw push to onoma tou board sto opoio egine to event
                  temp.push(finalMess);
                  temp.push(UserId)
                  messageMatToast=defCard+" cards was deleted just now";
                  collaborativeListCard.length = 0;
                  collaborativeListCard.pushAll(temp);
                  updateUI=true;
                 
             	 }
             }
         }
          if(updateUI){ //ean ginei kapoia allagh sto plh8os twn listwn h kartwn tote enhmeronei to UI 

         	  Trello.get('/boards/' + boardId + '/lists?cards=open&card_fields=all',loadedListOfCards, function() { console.log("failed to show listsofcards in front end")});
         	  if(boardNameInB_E == gloabalBoardName ) //ean o xrhsths vriskete sto board pou egine h allagh 8a eidopoih8ei me to analogo mhhnuma
         	    Materialize.toast(messageMatToast,"2500","card black","");
          }
         
               beforeLengthInList=listNameB_E.length;
               beforeLengthInCards=cardNameB_E.length;
               if(next==2){
               	//gia na allaksei to xrwma apo to eikonidio me ta notifications
               	$('#cloudState').removeClass('red-text text lighten 2');  
               	$('#cloudState').addClass('blue-text text lighten 2');
               
               }
               
            
       }//telos if gia ta board bef k current
       
         boardNameBef=boardNameInB_E;
         updateUI=false;
         myAppEvent=false;
      };
    
      var createCard = function() {
        var nameOfCard = document.getElementById("name_list_card").value;
        var listId = document.getElementById("myoptOfList").value;

        var x = document.getElementById("posCard");
        var i = x.selectedIndex;
        var finalopt = x.options[i].text;

        var x1 = document.getElementById("myoptOfList");
        var i1 = x1.selectedIndex;
        var finalopt1 = x1.options[i1].text;
        if (nameOfCard == "" || finalopt == "Τοποθεσία Κάρτας") {
          Materialize.toast("You have not completed all fields", "2500", "card grey", "");
        } else {
          //dhmiourgia object me ta pedia pou dia8etei mia karta
          var newCard = {
            name: nameOfCard, //to onoma ths kartas
            pos: finalopt, //ka8orizei pou 8a topo8eth8ei h karta , eite sthn arxh eite sto telos
            idList: listId //id listas
          };
          Trello.post('/cards/', newCard);
          //"ka8arizei" ta text area
          document.getElementById('name_list_card').value = '';
          document.getElementById('name_list_card').value = '';
          myAppEvent=true;
          
        }
      }
      function createBoard() {
        var textOffield = document.getElementById("name_of_board").value;

        if (textOffield == "") {
          Materialize.toast("You have not completed all fields", "1300", "card grey", "");
        } else {
          var board = {
            name: textOffield
          }
          Trello.post('/board/', board); //postarei to board 
          $('#modalCreateBoard').modal('close'); //kleinei to modal afou exoun ginei ta parapanw me epituxia
          
        }

      }

      function findNameOfCards() {
        var listId = " ";

        //edw me tin for loop vriskei oles tis kartes mesw tou id tis ka8e listas pou uparxei mesa
        for (var i = 1; i < listofId.length; i++) {
          listId = listofId[i];
          Trello.get('/lists/' + listId + '/cards', loadedcards, function() {;
          });
          listId = " ";
        }
        listofIdCards.length = 0;
        mylistofcards.length = 0;
      }
      var listName = [];

      function loadBoards() {

        Trello.get('/members/me/boards/', loadedNameofBoards, function() {;
        });

      }
      var idOfBoards = [];
      var urlListsofBoards = [];

      function loadedNameofBoards(boards) {
      	urlListsofBoards.length=0;
        $.each(boards, function(index, value) {
          urlListsofBoards.push(value.url);
          idOfBoards.push(value.id);
        });

        $.each(boards, function(index, value) {

          $("#idName")
              .append($("<option></option>")
              .attr("value", value.id)
              .text(value.name));
        });
        $('select').material_select();

        $.each(boards, function(index, value) {

          $("#idNameUp")
              .append($("<option></option>")
              .attr("value", value.id)
              .text(value.name));
        });
        $('select').material_select();

         $.each(boards, function(index, value) {

          $("#idNameUp1")
              .append($("<option></option>")
              .attr("value", value.id)
              .text(value.name));
        });
          $('select').material_select();
      }

      var objectOfList = {};
      var listsOfCards = [];
      var c=0;

      function loadedListOfCards(lists) {
       
        listsOfCards.length = 0;
        var array = [];
        var idArray = [];
        var urlArray = [];
        $.each(lists, function(index, value) {
          array.length = 0;
          idArray.length = 0;
          urlArray.length = 0;
          $.each(value.cards, function(ind, val) {
            array.push(val.name); //vazw ta onomata twn kartwn
            idArray.push(val.id); //vazw to id tis ka8e kartas se ena pinaka
            urlArray.push(val.url); //vazw to url tis ka8e kartas se ena pinaka
          });
          var tempNameOfCards = [];
          var tempIdOfCards = [];
          var tempUrlOfCards = [];
          for (var i = 0; i < array.length; i++) {

            tempNameOfCards.push(array[i]);
            tempIdOfCards.push(idArray[i]);
            tempUrlOfCards.push(urlArray[i]);
          
          }
          
          objectOfList[index] = {
            nameofList: value.name,
            idlist: value.id,
            cardName: tempNameOfCards,
            idcard: tempIdOfCards,
            url: tempUrlOfCards
          };
          
          listsOfCards.push(objectOfList[index]); //vazw se ena array to object pou exw dhmiourghsei pio panw
        
        });

        $(function() {
          
          $(".list-render-area").empty();

          for (var i = 0;i<listsOfCards.length;i++) {
	          var idList = listsOfCards[i].idlist;
	            
	         $('.list-render-area').append(
			                 "<div id='ListId_" + idList + "'  class='row list grey lighten-5'> " +
			                 "<div class='col l12 m12 s12'>" +
			                 "<div class='row titleContainer grey lighten-2 z-depth-1'><div class='col l12 m12 s12'><h4 class='blue-text'>" + listsOfCards[i].nameofList + "<a id="+idList+" class='btn-floating tooltipped transparent  right z-depth-0' data-possition='left' data-tooltip='delete list?'  onclick='OpenModalForList(this.id)' ><i class='material-icons grey-text'>close</i></a><a id=" + idList + "_" + listsOfCards[i].nameofList + " class='btn-floating tooltipped transparent right z-depth-0' data-tooltip='create card?' data-possition='right' onclick='OpenModalForCreateCard(this.id)' data-delay='0'><i class='material-icons grey-text'>add</i></a></h4></div></div>" +
			                 "<div class='row render-card-area' style='max-height:300px; overflow-y:auto;'></div></div><div>");
                    
                    $('.tooltipped').tooltip({})
	            
	            for (var j = 0; j < listsOfCards[i].cardName.length; j++) {
	             
	              var idCard = listsOfCards[i].idcard[j];
	              var link = listsOfCards[i].url[j];
	              var title = listsOfCards[i].cardName[j];

	                $('#ListId_' + idList + ' .render-card-area').append("<div class='col l2 m4 s12' >" +
			                     "<div id=cardId_" + idCard + " class='card'>" +
			                     "<div class='card-content white-text' style='padding:10px'>" +
			                     "<span class='card-title blue-text truncate'>" + title + "</span>" +
			                     "</div>" +
			                     "<div class='card-action" + i + "' style='padding: 5px;'>" +
			                     "<a id=" + link + " class='btn-floating   transparent z-depth-0'  onclick='redirInTrello(this.id)' ><i class='material-icons grey-text'>open_in_new</i></a>" +
			                     "<a id=" + idCard + " class='btn-floating transparent z-depth-0'  onclick='deleteCardOnClick(this.id)'><i class='material-icons grey-text'>delete</i></a>" +
			                     "</div> " +
			                     "</div>" +
			                     "</div>")
	              } 
	            
           }
           $('.tooltipped').tooltip({})
        });
      }
    
      var loadListsOfCards = function() {
        var boardId = document.getElementById("idName").value;
        Trello.get('/boards/' + boardId + '/lists?cards=open&card_fields=all', loadedListOfCards, function() {console.log("failed to render card")
        });
      };
      var bool;
      var beforeBoardId1;
      var beforeBoardId2;
  
      var beforeBoard;
      var beforeLengthInComment;
      var notificationsForComments=[];
       function loadForComment(comment){
           var listName=[];
           var cardName=[];
           var commentList=[];
           var nameOfMember=[];
           var cardId=[];
           var x = document.getElementById("idName");
           var i = x.selectedIndex;
           var boardName = x.options[i].text;
           var boardIdlocal=document.getElementById("idName").value;
           $.each(comment, function(index,value) {
            listName.push(value.data.list.name);
            cardName.push(value.data.card.name);
            cardId.push(value.data.card.id);
            commentList.push(value.data.text);
            nameOfMember.push(value.memberCreator.fullName);
            
          });
          if(beforeBoard != boardIdlocal)
           	stayThisBoard=0;
           
          if(beforeBoard == boardIdlocal){
               
             if(commentList.length > beforeLengthInComment && stayThisBoard > 1 ){   //ean paremeine sto board , kai pragmatopoih8hke ena sxolio tote enhmerwnei tous sunergates
                 
                  var tempArr=[];
                  var collaborTrelloComments = doc.getModel().getRoot().get('list_comments');
                 // console.log(boardName);
                  collaborTrelloComments.length = 0;
                  tempArr.push(nameOfMember[0]); //to onoma tou melous pou pragmatopoihse to comment
                  tempArr.push(commentList[0]);  //to comment ppou egine
                  tempArr.push(boardName);             //to onoma tou board sto opoio egine to event
                  tempArr.push(cardName[0]); //to onoma tis kartas stin opoia egine to event
                  tempArr.push(cardId[0]); //gia to id tis kartas pou egine to comment , wste otan oi sunergates metavoun sto board , na eidopoih8oun kai sto
                  Materialize.toast("added new comment in card "+cardName[0],"1200","","");
                  console.log(collaborTrelloComments);
                  collaborTrelloComments.pushAll(tempArr);  //sthn sunergatikh lista mpainei ta parapanw wste na enhmerw8oun oi sunergate
                  console.log(collaborTrelloComments);
              }
             stayThisBoard++;
             beforeLengthInComment=commentList.length;
           }
           
          // console.log("st "+stayThisBoard);
           beforeBoard=boardIdlocal;
          
      }
   
      
       var deleteCard=false;
      function deleteCardOnClick(idCard) {
      	 var r = confirm("Do you want delete this card?");
        
        if (r) {
          
          Trello.put('/cards/' + idCard + '/closed?value=true');
          myAppEvent=true //gia na enhmerwsei tous xrhstes gia to event auto
          
          if(next<2){  //ean o xrhsths epixeirhsei na diagrapsei karta prin ksekinhsoun oi automatopoihmenes klhseis tote 8a ginei klhsh gia 
          	
          	setTimeout(updateUIfun,500);
          
          }
        }
      }
     function updateUIfun(){  //sunarthsh pou kaleite gia na enhmerwsei to UI prin ksekinisoun oi aytomatopoihmenes klhseis 
     	
     	Trello.get('/boards/' + globalBoardId + '/lists?cards=open&card_fields=all',loadedListOfCards, function() { console.log("failed to show listsofcards in front end")})
     }
      function redirInTrello(id) {
         window.open(id);
      }
        function openBoardInTrello() {
          if(resultOfLink==""){
            Materialize.toast("You haven't choose board","1900","card black","");
          }
          else{
             window.open(resultOfLink);
          }
        
      }
    

        $(document).ready(function() {
          $('select').material_select();
          $('.modal').modal();
          
          $('.tooltipped').tooltip({});
          $('.collapsible').collapsible();
          $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
          });
        
          $('.button-collapse').sideNav({
            menuWidth: 420, // Default is 300
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
          });

       /* setInterval(function(){
              var collaborators = doc.getCollaborators();  //epistrefei olous tous energous sunergates 
              var collaboratorLength = collaborators.length;  //epistrefei sthn metavlhth to plh8os twn sunergatwn pou exoun anoixto to document 
               console.log("test");
                if(collaboratorLength==1)
                  document.getElementById("Num").innerHTML=0;
                else      
                collaboratorLength--;
                document.getElementById("Num").innerHTML=collaboratorLength;
              
        },3000) 
*/
      });   
     