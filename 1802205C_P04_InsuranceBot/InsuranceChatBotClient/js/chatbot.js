var accessToken = "ya29.c.KmOpBxNZoJcm58SvTvd-UGJ8QXvGbt_z387bMH-_XCpBtJGnvBlSe74XrEvOnAjEmJXR4KEcdBqyEJZcail_Cl_SOuZtXVCck7smaV9LRhVm_Tn12pzC56SWOXGgy_vlT2dZ97E";
var baseUrl ="https://dialogflow.googleapis.com/v2";

var URL = baseUrl + "/projects/travelagent-jmktnr/agent/sessions/somerandomthing:detectIntent";


(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return $message.addClass('appeared');
               
            };
        }(this);
        return this;
    };
    $(function () {

     
    });
    $(function () {
        var getMessageText, message_side, sendMessage, respText;
        message_side = 'left';


        //Welcome Text when page loads.
        var $messagesInput;
        $messagesInput = $('.messages');
        message_side = message_side ===  'right' ? 'left' : 'right';
        messageInput = new Message({
                                     text: "Hi!  I can help you with your questions on TP CET matters.",
                                     message_side: message_side
                                  });
                        
        messageInput.draw();
        $messagesInput.animate({ scrollTop: $messagesInput.prop('scrollHeight') }, 300);

        getMessageText = function () {
            var $message_input,$messagesInput, messageInput;
            $message_input = $('.message_input');

            //check for empty text
            if ($message_input.val().trim() === '') {
              return;
            }
            $("#response").scrollTop($("#response").height());
             $messagesInput = $('.messages'); 
             message_side = message_side ===  'right' ? 'left' : 'right';

             messageInput = new Message({
                                     text: $message_input.val(),
                                     message_side: message_side
                                  });
                        
              messageInput.draw();
              $messagesInput.animate({ scrollTop: $messagesInput.prop('scrollHeight') }, 300);

            return $message_input.val();
        };
        sendMessage = function (text) {
                var $messages, message;
                $.ajax({
                      type: "POST",
                      url: URL,
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      headers: {
                          "Authorization": "Bearer " + accessToken
                      },
					  data: JSON.stringify({ "queryInput":{
							"text":{
								"text":text,
								"languageCode":"en-US"
							}
						} }),
                      
                      success: function(data) {
                        respText = data.queryResult.fulfillmentText;                      
                        console.log("Res: " + respText);

                        $("#response").scrollTop($("#response").height());
                              $('.message_input').val('');
                                $messages = $('.messages'); 
                                message_side = message_side === 'left' ? 'right' : 'left';

                              message = new Message({
                                                           text: respText,
                                                           message_side: message_side
                                        });

                                message.draw();
                                return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
                              },
                     error: function() {
                    }
        });

        };  

        //Insert Button codes here

        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
           if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
        sendMessage();
        setTimeout(function () {
            return sendMessage();
        }, 1000);
        return setTimeout(function () {
            return sendMessage();
        }, 2000);
    });
    
}.call(this));
