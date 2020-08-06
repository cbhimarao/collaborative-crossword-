'use strict';

$(function() {

  // get the current tab
  chrome.tabs.query({
      active: true,
      currentWindow: true
    //TAKES THE CURRENT TAB AND WE DEFINE A FUNCTION OF THE TAB
    }, function(tabs) {
      // send a message to the content script
      var sendMessage = function(type, data, callback) {
        chrome.extension.getBackgroundPage().console.log(type);
        chrome.tabs.executeScript( tabs[0].id, {
        //code: 'document.body.style.backgroundColor="orange"'
         file: 'content_script.js'
        }, function() {
        chrome.extension.getBackgroundPage().console.log("fleefooflee");
            chrome.tabs.sendMessage(tabs[0].id, {
                type: type,
                data: data
            })
        });
      };
      // get the session if there is one

      $('#create-session').click(function() {
                sendMessage('createSession', {
                  controlLock: false,
                  videoId: 1
                });
              });

       $('#js').submit(function(e){
                e.preventDefault();
                chrome.extension.getBackgroundPage().console.log("foo");
                 sendMessage('joinSession', {
                           sessionId: $('#j').val(),
                           videoId: 1
                        }, function(response){});
         });



      });
    }
  );
