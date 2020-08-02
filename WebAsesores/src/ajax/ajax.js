import $ from 'jquery';

function ajaxRequest(Url,method,dataType = "",data,beforeSendCallback = null, async = true){
    let result = $.ajax({
        url:Url,
        method: method,
        contentType: "application/json; charset=utf-8",
       // dataType:dataType,
        data:data,
        cache:false,
        beforeSend: beforeSendCallback,
        async:async,
        success: function(data){
           if(data.message != ""){
            let color = null
            switch (String.fromCharCode(data.typeMessage))
            {
                case 's':
                    color = "#19c3aa";
                    break;
                case 'e':
                    color = "#DB2828";
                    //console.log(data.Message);
                    break;
                case 'w':
                    color = "#F2711C";
                    break;
            }
           
            window.$.uiAlert({
                textHead: 'Notificacion', // header
                text: data.message, // Text
                bgcolor: color, // background-color
                textcolor: '#fff', // color
                position: 'top-right',// position . top And bottom ||  left / center / right
                icon: 'checkmark box', // icon in semantic-UI
                time: 13, // time
                  })
           }
            return data;
        },
        error:function(err){
            return err;
        }
    });
    return result;
}

export default ajaxRequest;