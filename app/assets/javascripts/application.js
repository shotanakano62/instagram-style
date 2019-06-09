// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require turbolinks
//= require_tree .

$(function(){
    $('#open-login-modal').click(function(){
        $('#login-modal').fadeIn(500);
    });

    $('.signup').click(function(){
        $('#singup-modal').fadeIn(500);
    });

    $('.close-modal').click(function(){
        $('#login-modal').fadeOut(500);
        $('#singup-modal').fadeOut(500);
    });

    
    $('.fa-comments').click(function(){
        var getCommentIconNumber = $(this).attr('id');
        $('#comment-area-' + getCommentIconNumber).show();
    });

    function buildHTML(comment){
        var html = `<div class="comment-header">
                        <img src="${comment.user_image}">
                    </div>
                    <div class="comment-user">
                        <a href="/users/${comment.user_id}/detail}">${comment.user_name}</a>
                    </div>
                    <div class="actual-comment">
                    <p>${comment.content}</p>
                    </div>
                    <div class="comment-created-time">
                        ${comment.created_at}
                    </div>`
        return html;
      }

        var getPostNumber = $('.fa-comments').attr('id');

    $('#new_comment_for_' + getPostNumber).on('submit', function(e){
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action');
        $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(data){
        var html = buildHTML(data);
        
        $('.comments-' + getPostNumber).append(html).show("slow");
        $('.comment').val('');
      })
      .fail(function(){
        alert('error');
      })
    })

    $('.show_comments_button').click(function(){
        var getPostNumber = $(this).attr('id');
        $('#actual_' + getPostNumber + '.comment-container').show("slow");
        
    });


   $(document).on('turbolinks:load', function(){
    $(document).on('keyup', '#search-form', function(e){
    e.preventDefault();
    var input = $.trim($(this).val());
    $.ajax({
      url: '/users/search',
      type: 'GET',
      data: ('keyword=' + input),
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    
    //ここから追記
    .done(function(data){ //データを受け取ることに成功したら、dataを引数に取って以下のことする(dataには@usersが入っている状態ですね)
      var current_user = gon.current_user;
      $('.users-index-items').find('li').remove();  //idがresultの子要素のliを削除する
      
      $(data).each(function(i, user){ //dataをuserという変数に代入して、以下のことを繰り返し行う(単純なeach文ですね)
        var html = `<form class="new_relationship" id="new_relationship" action="/relationships" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="✓"><input type="hidden" name="authenticity_token" value="1VwiXMRnWtA7bOI671mHedzBDSto++knezJzwKDJwrmbfC+gyqagPHd6aWWXIpVpu8vHZ7xwG0InAedGJvE/+A==">
      <div class="follow"><input type="hidden" name="following_id" id="following_id" value="` + user.id + `"></div>
      <input type="submit" name="commit" value="Follow" class="btn-flat-border" data-disable-with="Follow">
      </form>`
      if (current_user.name != user.name){
        
        $('#users-index-items').append('<li class="users-index-item"><div class="user-left"><a href= "/users/' + user.id + '/detail">' + user.name + '</a></div>' + html + '</li>') //resultというidの要素に対して、<li>ユーザーの名前</li>を追加する。

      }
      });
    })
    .fail(function(){
      alert('error');
    })
  });
});

  });